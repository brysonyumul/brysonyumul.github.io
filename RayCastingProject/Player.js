class Player {
    constructor(){
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 30;
        this.moveSpeed = 2;
        this.rotationSpeed = 3 * (Math.PI/180)
        this.faceDirection = (3 / 2) * Math.PI;
        this.lineLength = 30;
    }

    move(){
        let nx = this.x;
        let ny = this.y;

        if(keyIsDown(87)){
            ny += Math.sin(this.faceDirection) * this.moveSpeed
            nx += Math.cos(this.faceDirection) * this.moveSpeed
        }
        else if(keyIsDown(83)){
            ny -= Math.sin(this.faceDirection) * this.moveSpeed
            nx -= Math.cos(this.faceDirection) * this.moveSpeed
        }

        if(keyIsDown(65)){
            ny -= Math.cos(this.faceDirection) * this.moveSpeed
            nx += Math.sin(this.faceDirection) * this.moveSpeed
        }
        else if(keyIsDown(68)){
            ny += Math.cos(this.faceDirection) * this.moveSpeed
            nx -= Math.sin(this.faceDirection) * this.moveSpeed
        }

        if(!mapGrid.hasWallAt(nx, ny)){
            this.x = nx;
            this.y = ny;
        }
    }

    turn(){
        if(keyIsDown(LEFT_ARROW)){
            this.faceDirection -= this.rotationSpeed;
        }
        else if(keyIsDown(RIGHT_ARROW)){
            this.faceDirection += this.rotationSpeed;
        }
    }

    update(){
        this.move();
        this.turn();
    }

    render(){
        noStroke();
        fill("blue")
        circle(this.x * MINIMAP_SCALE, this.y * MINIMAP_SCALE, this.radius * MINIMAP_SCALE);
    }
}