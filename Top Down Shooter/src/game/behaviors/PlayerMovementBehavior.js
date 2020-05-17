import Base from "../../engine/Base.js";
import Input from "../../engine/base/Input.js";
import PlayerData from "../behaviors/PlayerData.js";
import EnemyData from "../behaviors/EnemyData.js";

import SM from "../SceneManager.js";
import CircleCollider from "../../engine/components/CircleCollider.js";
import TriangleCollider from "../../engine/components/TriangleCollider.js";
import AABBCollider from "../../engine/components/AABBCollider.js";

export default class PlayerMovementBehavior extends Base.Behavior{
    canvas = document.getElementById('canv');
    playerData;

    start(){
        this.playerData = new PlayerData();
        this.speed = this.playerData.movementSpeed;
        this.health = this.playerData.health;

        this.enemyData = new EnemyData();
        this.eDamage = this.enemyData.bulletDamage; 

        this.anchor = SM.currentScene.children.filter(i => i.hasComponent("CameraComponent"))[0];

        this.gameObject.x = this.anchor.x + this.canvas.scrollWidth/2;
        this.gameObject.y = this.anchor.y + this.canvas.scrollHeight/2;

        this.radius = this.gameObject.getComponent("PlayerModel").radius;
        this.temp = new Base.Point(this.gameObject.x, this.gameObject.y);

        this.knockBack = 0;
    }

    update(){
        let shift = this.speed - this.knockBack;
        this.temp = this.gameObject.location;
        


        if(this.knockBack > 0){
            this.knockBack -= 5;
        }


        if(Input.keys['w']){
            this.gameObject.y -= shift;
        }
        else if(Input.keys['s']){
            this.gameObject.y += shift;
        }

        if(Input.keys['a']){
            this.gameObject.x -= shift;
        }
        else if(Input.keys['d']){
            this.gameObject.x += shift;
        }

        if(this.gameObject.x > (this.anchor.x + this.canvas.scrollWidth)){
            this.anchor.x += this.canvas.scrollWidth;
        }
        else if(this.gameObject.x < (this.anchor.x)){
            this.anchor.x -= this.canvas.scrollWidth;
        }

        
        if(this.gameObject.y > (this.anchor.y + this.canvas.scrollHeight)){
            this.anchor.y += this.canvas.scrollHeight;
        }
        else if(this.gameObject.y < (this.anchor.y)){
            this.anchor.y -= this.canvas.scrollHeight;
        }     
    }

    onCollisionStay(collisionObject){
        if(collisionObject.gameObject.name == "Enemy"){
            this.knockBack += 10;
            this.health -= this.eDamage;
        }

        if(collisionObject.gameObject.name == "EnemyBullet"){
            this.knockBack += 5;
            this.health -= this.eDamage;
        }

        let mod = this.knockBack;

        if(collisionObject.collider instanceof CircleCollider){
            let diff = this.gameObject.location.diff(collisionObject.gameObject.location);
            let angle = Math.atan2(diff.y, diff.x);
            let distance = this.radius + collisionObject.collider.radius + mod;
            this.gameObject.x = Math.cos(angle) * distance + collisionObject.gameObject.x;
            this.gameObject.y = Math.sin(angle) * distance + collisionObject.gameObject.y;
        }
        else if(collisionObject.collider instanceof AABBCollider){
            let ul = this.gameObject.location.diff(collisionObject.collider.ul);
            let lr = this.gameObject.location.diff(collisionObject.collider.lr);

            if(ul.y < 0){
                this.gameObject.y = collisionObject.collider.ul.y - this.radius - mod;
            }
            else if(lr.y > 0){
                this.gameObject.y = collisionObject.collider.lr.y + this.radius + mod;
            }

            if(ul.x < 0){
                this.gameObject.x = collisionObject.collider.ul.x - this.radius - mod;
            }
            else if(lr.x > 0){
                this.gameObject.x = collisionObject.collider.lr.x + this.radius + mod;
            }
        }
        else if(collisionObject.collider instanceof TriangleCollider){
            let radius = this.radius + 1;

            if(collisionObject.collider.isEdgeCollide){
                collisionObject.collider.isEdgeCollide = false;

                let diff = collisionObject.collider.collideIntPoint.diff(this.gameObject.location);
                let angle = Math.atan2(diff.y, diff.x);

                this.gameObject.x = collisionObject.collider.collideIntPoint.x - (radius * Math.cos(angle));
                this.gameObject.y = collisionObject.collider.collideIntPoint.y - (radius * Math.sin(angle));
            }
            else if(collisionObject.collider.isEndCollide){
                collisionObject.collider.isEndCollide = false;

                let diff = collisionObject.collider.collidePoint.diff(this.gameObject.location);
                let angle = Math.atan2(diff.y, diff.x);

                this.gameObject.x = collisionObject.collider.collidePoint.x - (radius * Math.cos(angle));
                this.gameObject.y = collisionObject.collider.collidePoint.y - (radius * Math.sin(angle));
            }
            else if(collisionObject.collider.isInsideCollide){
                this.gameObject.x = this.temp.x;
                this.gameObject.y = this.temp.y;
            }
        }
        else{
            this.gameObject.x = this.temp.x;
            this.gameObject.y = this.temp.y;
        }
    }
}