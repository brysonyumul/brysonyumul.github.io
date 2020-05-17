import Base from "../../engine/Base.js";
import SceneManager from "../SceneManager.js";

export default class UIBehavior extends Base.Behavior{
    start(){
        this.camAnchor = SceneManager.currentScene.children.filter(i => i.hasComponent("CameraComponent"))[0];
        this.playerHP = SceneManager.currentScene.children.filter(i => i.name === "Player")[0].getComponent("PlayerMovementBehavior").health;
    }
    
    update(){
        this.playerHP = SceneManager.currentScene.children.filter(i => i.name === "Player")[0].getComponent("PlayerMovementBehavior").health;
        this.gameObject.getComponent("TextComponent").text = "HP: " + this.playerHP;
        this.gameObject.x = this.camAnchor.x + 20;
        this.gameObject.y = this.camAnchor.y + 20;

        let enemyCount = SceneManager.currentScene.children.filter(i => i.name == "Enemy").length

        if(this.playerHP <= 0){
            SceneManager.currentScene = "EndScreen";
        }
        else if(enemyCount <= 0){
            SceneManager.currentScene = "EndScreen2";
        }
    }
}