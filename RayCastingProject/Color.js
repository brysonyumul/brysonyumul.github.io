class Color{
    constructor(){
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;
    }

    setColor(r, g, b){
        this.r = r;
        this.g = g;
        this.b = b;
    }

    setLightness(distance){
        if(distance > 255){
            distance = 255;
        }

        this.r -= distance;
        this.g -= distance;
        this.b -= distance;

        if(this.r < 0){
            this.r = 0;
        }
        if(this.g < 0){
            this.g = 0;
        }
        if(this.b < 0){
            this.b = 0;
        }
    }

    getColor(blockType, distance){
        //set base color
        if(blockType == 1){
            this.setColor(255, 255, 255);
        }
        else if(blockType == 2){
            this.setColor(255, 0, 0);
        }
        else if(blockType == 3){
            this.setColor(0, 255, 0);
        }
        else if(blockType == 4){
            this.setColor(0, 0, 255);
        }

        //adjust color based on distance from the player
        this.setLightness(distance);
    }
}