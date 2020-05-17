import Base from "../Base.js";


class TriangleComponent extends Base.Component{
    stroke;
    fill;
    base;
    height;
    angle;
    
    points = [];
    pointTop;
    pointLeft;
    pointRight;

    constructor(){
        super();
    }

    draw(ctx){
        if(this.points.length == 0){
            return;
        }

        let a = this.gameObject.x;
        let b = this.gameObject.y;

        ctx.save();
        
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.fill;

        ctx.beginPath();
        ctx.moveTo(this.pointTop.x - a, this.pointTop.y - b);
        ctx.lineTo(this.pointRight.x - a, this.pointRight.y - b);
        ctx.lineTo(this.pointLeft.x - a, this.pointLeft.y - b);
        ctx.closePath();
        ctx.fill()
        ctx.stroke();    
        
        ctx.restore();
    }

    update(){
        this.angle2 = this.angle - (Math.PI / 2);
        this.angle3 = this.angle - Math.PI;
        this.angle4 = this.angle2 - Math.PI;
        
        this.pointTop = new Base.Point(
            this.gameObject.x + (Math.cos(this.angle).toFixed(1) * (this.height/2)), 
            this.gameObject.y + (Math.sin(this.angle).toFixed(1) * (this.height/2))
            );

        this.pointRight = new Base.Point(
            this.gameObject.x + (Math.cos(this.angle3).toFixed(1) * (this.height / 2)) + (Math.cos(this.angle4).toFixed(1) * (this.base / 2)), 
            this.gameObject.y + (Math.sin(this.angle3).toFixed(1) * (this.height / 2)) + (Math.sin(this.angle4).toFixed(1) * (this.base / 2))
            );

        this.pointLeft = new Base.Point(
            this.gameObject.x + (Math.cos(this.angle3).toFixed(1) * (this.height / 2)) + (Math.cos(this.angle2).toFixed(1) * (this.base / 2)),
            this.gameObject.y + (Math.sin(this.angle3).toFixed(1) * (this.height / 2)) + (Math.sin(this.angle2).toFixed(1) * (this.base / 2))
            );

        this.points = [this.pointTop, this.pointRight, this.pointLeft];
    }
}

export default TriangleComponent;