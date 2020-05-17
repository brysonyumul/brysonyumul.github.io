import Base from "../Base.js"

class PlayerModel extends Base.Component{
    radius;
    baseColor;
    stroke;

    rotation = 0;
    powerColor = [];

    constructor(){
        super();
    }

    draw(ctx){
        ctx.save();

        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.strokeStyle = this.stroke;

        for(let i = 0; i < 3; i++)
        {
            let sAngle = (i*2)*Math.PI/3
            let eAngle = ((i+1)*2)*Math.PI/3
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.arc(0,0,this.radius,sAngle,eAngle);
            ctx.closePath();
            ctx.fillStyle = this.powerColor[i];
            ctx.fill()
            ctx.stroke();
        }

        this.rotation += 5;

        if(this.rotation == 360){
            this.rotation = 0;
        }

        ctx.restore();
    }
    update(){
    }
}

export default PlayerModel;