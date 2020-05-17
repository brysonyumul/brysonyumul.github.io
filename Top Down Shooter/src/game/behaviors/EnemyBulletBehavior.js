import Base from "../../engine/Base.js";
import SceneManager from "../SceneManager.js";
import EnemyData from "../behaviors/EnemyData.js";
import Point from "../../engine/base/Point.js";

export default class EnemyBulletBehavior extends Base.Behavior{
    
    start(){
        let enemyData = new EnemyData();
        this.range = enemyData.shootingRange;
        this.speed = enemyData.bulletSpeed;

        this.origin;
        this.angle;

        let playerPoint = SceneManager.currentScene.children.filter(i => i.name === "Player")[0].location;
        this.origin = new Point(this.gameObject.x, this.gameObject.y);
        let directionPoint = playerPoint.diff(this.origin);
        this.angle = Math.atan2(directionPoint.y, directionPoint.x);
    }

    update(){
        let distance = this.gameObject.location.distanceSquared(this.origin);
        let sRange = this.range * this.range;
        
        if(sRange - distance < 0){
            SceneManager.currentScene.destroy(this.gameObject);
        }
        else{
            this.gameObject.x += this.speed * Math.cos(this.angle);
            this.gameObject.y += this.speed * Math.sin(this.angle);
        }
    }   

    onCollisionStay(collisionObject){
        SceneManager.currentScene.destroy(this.gameObject);
    }

}