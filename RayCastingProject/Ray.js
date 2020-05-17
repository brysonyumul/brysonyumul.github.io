class Ray{

    constructor(angle){
        this.angle = util.normalizeAngle(angle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distance = 0;

        this.isRayUp = (this.angle > Math.PI);
        this.isRayDown = !this.isRayUp;
        this.isRayLeft = (this.angle > (Math.PI / 2) && this.angle < ((3 /2) * Math.PI));
        this.isRayRight = !this.isRayLeft;

        this.blockType;
    }

    cast(){
        let horizontalIntersect = this.HorizontalIntersect();
        let verticalIntersect = this.VerticalIntersect();
        let distance1, distance2;
        
        if(horizontalIntersect[2]){
            distance1 = util.distanceAB2(player.x, player.y, horizontalIntersect[0], horizontalIntersect[1]);
        }
        else{
            distance1 = Number.MAX_SAFE_INTEGER;
        }

        if(verticalIntersect[2]){
            distance2 = util.distanceAB2(player.x, player.y, verticalIntersect[0], verticalIntersect[1]);
        }
        else{
            distance2 = Number.MAX_SAFE_INTEGER;
        }

        if(distance1 <= distance2){
            this.wallHitX = horizontalIntersect[0];
            this.wallHitY = horizontalIntersect[1];
            this.blockType = horizontalIntersect[3];
            this.distance = Math.sqrt(distance1);
        }
        else{
            this.wallHitX = verticalIntersect[0];
            this.wallHitY = verticalIntersect[1];
            this.blockType = verticalIntersect[3];
            this.distance = Math.sqrt(distance2);
        }
    }

    HorizontalIntersect(){
        let deltaX, deltaY, xIntercept, yIntercept, block;
        let hitX = 0;
        let hitY = 0;
        let found = false;

        yIntercept = Math.floor(player.y / TILESIZE) * TILESIZE;

        if(this.isRayDown){
            yIntercept += TILESIZE;
        }

        xIntercept = player.x + (yIntercept - player.y) / Math.tan(this.angle);

        deltaY = TILESIZE;
        deltaX = TILESIZE / Math.tan(this.angle);

        if(this.isRayUp){
            deltaY *= -1;
        }
        
        if(this.isRayLeft && deltaX > 0 || this.isRayRight && deltaX < 0){
            deltaX *= -1;
        }
    
        let nextXInt = xIntercept;
        let nextYInt = yIntercept;

        if(this.isRayUp){
            nextYInt--;
        }

        while(nextYInt >= 0 && nextYInt <= WINDOW_HEIGHT && nextXInt >= 0 && nextXInt <= WINDOW_WIDTH){
            if(mapGrid.hasWallAt(nextXInt, nextYInt)){
                block = mapGrid.getBlockValue(nextXInt, nextYInt);
                 
                if(this.isRayUp){
                    nextYInt++;
                }
                
                hitX = nextXInt;
                hitY = nextYInt;
                found = true;
                break;
            }
            else{
                nextXInt += deltaX;
                nextYInt += deltaY;
            }
        }

        return [hitX, hitY, found, block];
    }

    VerticalIntersect(){
        let deltaX, deltaY, xIntercept, yIntercept, block;
        let hitX = 0;
        let hitY = 0;
        let found = false;

        xIntercept = Math.floor(player.x / TILESIZE) * TILESIZE;

        if(this.isRayRight){
            xIntercept += TILESIZE;  
        }

        yIntercept = player.y + (xIntercept - player.x) * Math.tan(this.angle);

        deltaX = TILESIZE;
        deltaY = TILESIZE * Math.tan(this.angle);

        if(this.isRayLeft){
            deltaX *= -1;
        }
        
        if(this.isRayUp && deltaY > 0 || this.isRayDown && deltaY < 0){
            deltaY *= -1;
        }
    
        let nextXInt = xIntercept;
        let nextYInt = yIntercept;

        if(this.isRayLeft){
            nextXInt--;
        }

        while(nextYInt >= 0 && nextYInt <= WINDOW_HEIGHT && nextXInt >= 0 && nextXInt <= WINDOW_WIDTH){
            if(mapGrid.hasWallAt(nextXInt, nextYInt)){
                block = mapGrid.getBlockValue(nextXInt, nextYInt);

                if(this.isRayLeft){
                    nextXInt++;
                }
                
                hitX = nextXInt;
                hitY = nextYInt;
                found = true;
                break;
            }
            else{
                nextXInt += deltaX;
                nextYInt += deltaY;
            }
        }

        return [hitX, hitY, found, block];
    }

    render(){
        stroke("Gray");
        line(player.x * MINIMAP_SCALE, player.y * MINIMAP_SCALE, this.wallHitX * MINIMAP_SCALE, this.wallHitY * MINIMAP_SCALE);
    }
}