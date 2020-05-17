import Base from "../../engine/Base.js";
import SM from "../SceneManager.js";
import Point from "../../engine/base/Point.js";
import Input from "../../engine/base/Input.js";
import GameBehaviors from "../GameBehaviors.js";
import PlayerData from "../behaviors/PlayerData.js";

export default class PlayerBulletBehavior extends Base.Behavior{
    start(){
        this.color = [0,0,0];
        this.origin;
        this.angle;

        this.playerData = new PlayerData();
        this.range = this.playerData.shootingRange;
        this.speed = this.playerData.bulletSpeed;
        this.damage = this.playerData.bulletDamage;

        this.color = SM.currentScene.children.filter(i => i.name === "Player")[0].components.filter(i => i instanceof GameBehaviors.PlayerShootingBehavior)[0].colorValue;
        
        let tRGB = [255,255,255];

        for(let i = 0; i < 3; i++){
            //No Power up applied
            if((this.color[0] + this.color[1] + this.color[2]) == 0){
                break;
            }
            //All 3 sections have the same color
            else if(this.color[i] == 3){
                tRGB = [0,0,0];
                tRGB[i] = 255;
                break;
            }
            //Mix all color of the 3 section
            else{
                tRGB[0] -= 255 * this.color[i] / 3;
                tRGB[1] -= 255 * this.color[i] / 3;
                tRGB[2] -= 255 * this.color[i]/ 3;
                tRGB[i] += 255* this.color[i] / 3;
            }
        }
        
        //apply color of bullet
        this.gameObject.getComponent("TriangleComponent").fill = "rgb(" + tRGB + ")";

        //calculate the direction of the bullet when spawned
        let camPoint = SM.currentScene.children.filter(i => i.hasComponent("CameraComponent"))[0].location;
        this.origin = new Point(this.gameObject.x, this.gameObject.y);
        let directionPoint = new Point(Input.mouseX + camPoint.x, Input.mouseY + camPoint.y).diff(this.origin);
        this.angle = Math.atan2(directionPoint.y, directionPoint.x);

        //apply to collider
        this.gameObject.getComponent("TriangleComponent").angle = this.angle;

        //change size based on red power up
        this.gameObject.getComponent("TriangleComponent").base *= 1 + (0.2 * this.color[0]);
        this.gameObject.getComponent("TriangleComponent").height *= 1 + (0.2 * this.color[0]);

        if(this.color[0] == 3){
            this.damage *= 5;
        }
        else{
            this.damage *= (this.color[0] + 1)
        }

        //change speed based on green power up
        this.speed *= 1 + (0.5 * this.color[1]);
        this.range *= 1 + (0.2 * this.color[1]);
    }

    update(){
        //Despawned when out of range
        let distance = this.gameObject.location.distanceSquared(this.origin);
        let sRange = Math.pow(this.range, 2);
        
        if(sRange - distance < 0){
            SM.currentScene.destroy(this.gameObject);
        }
        else{
            this.gameObject.x += this.speed * Math.cos(this.angle);
            this.gameObject.y += this.speed * Math.sin(this.angle);
        }
    }

    onCollisionStay(collisionObject){
        //Despawned when bullet hit an object
        SM.currentScene.destroy(this.gameObject);
    }
}