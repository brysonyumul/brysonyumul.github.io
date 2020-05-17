class Util{
    normalizeAngle(angle){
        angle = angle % (2 * Math.PI);

        if(angle < 0){
            angle += (2 * Math.PI);
        }

        return angle;
    }

    distanceAB(x1, y1, x2, y2){
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    distanceAB2(x1, y1, x2, y2){
        return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    }
}