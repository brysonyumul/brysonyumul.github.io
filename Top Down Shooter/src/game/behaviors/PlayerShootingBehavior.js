import Base from "../../engine/Base.js"
import Input from "../../engine/base/Input.js";
import SM from "../SceneManager.js";
import GameObject from "../GameObjects.js";
import Point from "../../engine/base/Point.js";
import PlayerData from "../behaviors/PlayerData.js";

export default class PlayerShootingBehavior extends Base.Behavior{
    color = ["", "Red", "Green", "Blue"];
    colorValue = [0, 0, 0];
    pCount = 0;
    tColor = [];

    start(){
        //start with white color
        this.backToBaseColor();

        this.playerData = new PlayerData();
        this.damage = this.playerData.bulletDamage;
        this.shoot = 0;
        this.multiShoot = this.playerData.multiShot;
    }

    update(){
        //SPACE resets power up;
        if(Input.up[' '] && this.pCount > 0){
            this.backToBaseColor();
            this.pCount = 0;
        }
        //1 = red: size and attack power
        //2 = green: Speed and range
        //3 = blue: Number of bullet and spread
        else if(this.pCount < 3)
        {
            if(Input.up['1']){
                this.gameObject.getComponent("PlayerModel").powerColor[this.pCount] = this.color[1]
                this.pCount++;
            }
            else if(Input.up['2']){
                this.gameObject.getComponent("PlayerModel").powerColor[this.pCount] = this.color[2]
                this.pCount++;
            }
            else if(Input.up['3']){
                this.gameObject.getComponent("PlayerModel").powerColor[this.pCount] = this.color[3]
                this.pCount++;
            }
        }
        
        if(this.shoot % 2 == 0 && this.shoot > 0){
            this.shoot--;
            this.colorValue = this.getColorValue(this.gameObject.getComponent("PlayerModel").powerColor);

            //Spawn more bullet based on blue power up
            //1 = 2 bullets
            //2 = 3 bullets
            //3 = 5 bullets
            if(this.colorValue[2] > 0){
                let more = 0;
                
                if(this.colorValue[2] == 3){
                    more++;
                }

                for(let i = 0; i < this.colorValue[2] + 1 + more; i++){
                    SM.instantiate(GameObject.PlayerBullet, new Base.Point(this.gameObject.x, this.gameObject.y), 0);
                }
 
                let bullet = SM.currentScene.children.filter(i => i.name === "PlayerBullet").filter(i => i.x === this.gameObject.x);

                this.shift(this.colorValue[2], bullet);
            }
            else{
                SM.instantiate(GameObject.PlayerBullet, new Base.Point(this.gameObject.x, this.gameObject.y), 0);
            }
        }
        else if (this.shoot > 0){
            this.shoot--;
        }
        
        if(Input.mouseButtonsUp[0]){
            this.shoot = 2 * this.multiShoot;
        } 
    }

    backToBaseColor(){
        this.color[0] = this.gameObject.getComponent("PlayerModel").baseColor;
        this.gameObject.getComponent("PlayerModel").powerColor[0] = this.color[0];
        this.gameObject.getComponent("PlayerModel").powerColor[1] = this.color[0];
        this.gameObject.getComponent("PlayerModel").powerColor[2] = this.color[0];
    }

    getColorValue(array){ 
        let temp = [0, 0, 0];

        for(let i = 0; i < 3; i++){
            if(array[i] == "Red"){
                temp[0]++;
            }
            else if(array[i] == "Green"){
                temp[1]++;
            }
            else if(array[i] == "Blue"){
                temp[2]++;
            }
            else{
                break;
            }
        }

        return temp;
    }

    //make the bullet spread
    shift(level, bullets){
        if(level == 1){
            bullets[0].getComponent("PlayerBulletBehavior").angle -= (5 * Math.PI / 180);
            bullets[1].getComponent("PlayerBulletBehavior").angle += (5 * Math.PI / 180);
        }
        else{
            bullets[0].getComponent("PlayerBulletBehavior").angle -= (7 * Math.PI / 180);
            bullets[2].getComponent("PlayerBulletBehavior").angle += (7 * Math.PI / 180);
        }

        if(level == 3){
            bullets[3].getComponent("PlayerBulletBehavior").angle -= (14 * Math.PI / 180);
            bullets[4].getComponent("PlayerBulletBehavior").angle += (14 * Math.PI / 180);
        }
    }
} 