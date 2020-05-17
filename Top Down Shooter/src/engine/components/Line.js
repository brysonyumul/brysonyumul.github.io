import Point from "../base/Point.js";

class Line{
    constructor(pointA, pointB){
        this.pointA = pointA;
        this.pointB = pointB;

        //Standard Form
        //Ax + By = C
        this.a = pointA.y - pointB.y;
        this.b = pointB.x - pointA.x;
        this.c = (pointA.x * pointB.y) - (pointB.x * pointA.y);
    }
    
    isOnPerSide(point){
        return ((this.a * point.x) + (this.b * point.y) + this.c) > 0;
    }

    //return point of Intersection a line and a point
    getIntersectionPoint(point){
        let x;
        let y; 

        //a == 0 : horizontal
        //b == 0 : vertical
        if(this.a == 0){
            x = point.x;
            y = this.pointA.y;
        }
        else if(this.b == 0){
            x = this.pointA.x;
            y = point.y;
        }
        else{
            let m = this.b / this.a;
            let z = point.y - (m * point.x);

            x = (-((this.b * z) + this.c)) / (this.a + (this.b * m));
            y = (-((this.a * x) + this.c)) / this.b;
        }

        return new Point(x, y);
    }

    inBetweenPoints(point){
        let a, b, c;

        b = point.x;

        if(this.pointA.x <= this.pointB.x){
            a = this.pointA.x;
            c = this.pointB.x;
        }
        else{
            a = this.pointB.x;
            c = this.pointA.x;
        }

        if(a <= b && b <= c){
            b = point.y;

            if(this.pointA.y <= this.pointB.y){
                a = this.pointA.y;
                c = this.pointB.y;
            }
            else{
                a = this.pointB.y;
                c = this.pointA.y;
            }
            
            if(a <= b && b <= c){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}

export default Line;