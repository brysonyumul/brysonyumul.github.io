import Base from "../../engine/Base.js";
import Point from "../../engine/base/Point.js";
import SceneManager from "../SceneManager.js";
import AABBCollider from "../../engine/components/AABBCollider.js";
import CircleCollider from "../../engine/components/CircleCollider.js";
import EnemyData from "../behaviors/EnemyData.js";
import PlayerData from "../behaviors/PlayerData.js";
import EnemyBullet from "../prefabs/EnemyBullet.js";
import TriangleComponent from "../../engine/components/TriangleComponent.js";

export default class EnemyBehavior extends Base.Behavior{
    isShooter;

    start(){
        //set random color for the enemy
        let color = "rgb(" + (Math.random() * 255) + ", " + (Math.random() * 255) + ", " + (Math.random() * 255) + ")"
        this.gameObject.getComponent("RectangleComponent").fill = color;

        //get data
        this.enemyData = new EnemyData();
        this.playerData = new PlayerData();

        this.range = this.enemyData.detectRange;
        this.range2 = this.enemyData.shootingRange;
        this.speed = this.enemyData.movementSpeed;
        this.hp = this.enemyData.health;
        this.pDamage = this.playerData.bulletDamage;

        //set other variable
        this.spawnedPoint = this.gameObject.location;
        this.temp;
        this.mod = 1;
        this.knockBack = 0;
        this.shoot = 0;

        if(this.isShooter){
            this.mod = -1;
        }
        else{
            this.hp *= 2;
        }
    }

    update(){
        this.temp = this.gameObject.location;
        let player = SceneManager.findChild("PlayerModel")[0];
        let playerRadius = player.getComponent("PlayerModel").radius;
        let d = this.gameObject.location.distanceSquared(player.location) - (playerRadius * playerRadius)

        //Shooting
        if(this.isShooter && ((this.range2 * this.range2) > d)){
            this.knockBack *= -1;

            if(this.shoot <= 0){
                this.shoot = 15;
            }
            else{
                this.shoot--;

                if((this.shoot % 15) == 0){
                    SceneManager.instantiate(EnemyBullet, new Point(this.gameObject.x, this.gameObject.y), 0);
                }                
            }
        }

        //Move towards/away the player
        if((this.range * this.range) > d){
            let diff = this.gameObject.location.diff(player.location);
            let angle = Math.atan2(diff.y, diff.x);

            let shiftX = Math.cos(angle) * (this.speed - this.knockBack) * this.mod;
            let shiftY = Math.sin(angle) * (this.speed - this.knockBack) * this.mod;

            if(this.knockBack > 0){
                this.knockBack -= 5;
            }

            this.gameObject.x -= shiftX;
            this.gameObject.y -= shiftY;
        }
        else{
            if(this.knockBack > 0){
                this.knockBack = 0;
            }

            let diff = this.gameObject.location.diff(this.spawnedPoint);

            if((diff.x + diff.y) != 0){
                if(this.gameObject.location.distanceSquared(this.spawnedPoint) < 25){
                    this.gameObject.x = this.spawnedPoint.x;
                    this.gameObject.y = this.spawnedPoint.y;
                }
                else{
                    let angle = Math.atan2(diff.y, diff.x);
                    this.gameObject.x -= Math.cos(angle) * this.speed;
                    this.gameObject.y -= Math.sin(angle) * this.speed;
                }
            }
        }

        if(this.isShooter){
            this.knockBack = 0;
        }
    }   

    onCollisionStay(collisionObject){

        if(collisionObject.gameObject.name == "PlayerBullet"){
            this.hp -= collisionObject.gameObject.getComponent("PlayerBulletBehavior").damage
            this.knockBack += 10;

            if(this.hp <= 0){
                SceneManager.destroy(this.gameObject);
            }
        }
        else if(collisionObject.gameObject.name == "Player"){
            this.hp -= this.pDamage;
            this.knockBack += 25; //multiples of 5

            if(this.hp <= 0){
                SceneManager.destroy(this.gameObject);
            }
        }
        else if(collisionObject.collider instanceof CircleCollider){
            let component = this.gameObject.getComponent("RectangleComponent");
            let h = component.height;
            let w = component.width;
            let radius = collisionObject.collider.radius;
            let pointC = collisionObject.gameObject.location;
            let pointR = this.gameObject.location;

            if(((pointC.x - (w / 2)) <= pointR.x) && (pointR.x <= (pointC.x + (w / 2)))){
                if(pointR.y < pointC.y){
                    this.gameObject.y = pointC.y - radius - (h / 2) - 1;
                }
                else{
                    this.gameObject.y = pointC.y + radius + (h / 2) + 1;
                }
            }
            else if(((pointC.y - (h / 2)) <= pointR.y) && (pointR.y <= (pointC.y + (h / 2)))){
                if(pointR.x < pointC.x){
                    this.gameObject.x = pointC.x - radius - (w / 2) - 1;
                }
                else{
                    this.gameObject.x = pointC.x + radius + (w / 2) + 1;
                }
            }
            else{
                let diff = pointC.diff(pointR);
                let angle = Math.atan2(diff.y, diff.x);
                let angleD = angle * (180 / Math.PI);

                if(90 < angleD){
                    let pointR2 = new Point(pointR.x - (w / 2), pointR.y + (h / 2));
                    diff = pointC.diff(pointR2);
                    angle = Math.atan2(diff.y, diff.x);

                    this.gameObject.x = pointC.x - (Math.cos(angle) * radius) + (w / 2) + 2;
                    this.gameObject.y = pointC.y - (Math.sin(angle) * radius) - (h / 2) - 2;
                }
                else if(0 < angleD && angleD < 90){
                    let pointR2 = new Point(pointR.x + (w / 2), pointR.y + (h / 2));
                    diff = pointC.diff(pointR2);
                    angle = Math.atan2(diff.y, diff.x);
                    
                    this.gameObject.x = pointC.x - (Math.cos(angle) * radius) - (w / 2) - 2;
                    this.gameObject.y = pointC.y - (Math.sin(angle) * radius) - (h / 2) - 2;
                }
                else if(0 > angleD && angleD > -90){
                    let pointR2 = new Point(pointR.x + (w / 2), pointR.y - (h / 2));
                    diff = pointC.diff(pointR2);
                    angle = Math.atan2(diff.y, diff.x);
                    
                    this.gameObject.x = pointC.x - (Math.cos(angle) * radius) - (w / 2) - 2;
                    this.gameObject.y = pointC.y - (Math.sin(angle) * radius) + (h / 2) + 2;
                }
                else if(-90 > angleD && angleD > -180){
                    let pointR2 = new Point(pointR.x - (w / 2), pointR.y - (h / 2));
                    diff = pointC.diff(pointR2);
                    angle = Math.atan2(diff.y, diff.x);
                    
                    this.gameObject.x = pointC.x - (Math.cos(angle) * radius) + (w / 2) + 2;
                    this.gameObject.y = pointC.y - (Math.sin(angle) * radius) + (h / 2) + 2;
                }
                else{
                    this.gameObject.x = this.temp.x;
                    this.gameObject.y = this.temp.y;
                }
            }
        }
        else if(collisionObject.collider instanceof AABBCollider){
            let ul = this.gameObject.location.diff(collisionObject.collider.ul);
            let lr = this.gameObject.location.diff(collisionObject.collider.lr);
            let component = this.gameObject.getComponent("RectangleComponent");
            
            if(ul.y < 0){
                this.gameObject.y = collisionObject.collider.ul.y - (component.height / 2);
            }
            else if(lr.y > 0){
                this.gameObject.y = collisionObject.collider.lr.y + (component.height / 2);
            }

            if(ul.x < 0){
                this.gameObject.x = collisionObject.collider.ul.x - (component.width / 2);
            }
            else if(lr.x > 0){
                this.gameObject.x = collisionObject.collider.lr.x + (component.width / 2);
            }
        }
        else{
            this.gameObject.x = this.temp.x;
            this.gameObject.y = this.temp.y;
        }
    }
}