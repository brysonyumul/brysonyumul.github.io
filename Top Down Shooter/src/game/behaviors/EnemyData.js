export default class EnemyData{
    constructor(){
        this.health = 10;
        this.movementSpeed = 5;
        this.shootingRange = 350;
        this.bulletSpeed = 10; 
        this.bulletDamage = 1;

        this.hpTolerance = this.health / 2;
        this.detectRange = 250;
    }
}