import PointCollider from "./PointCollider.js";
import CircleCollider from "./CircleCollider.js";
import AABBCollider from "./AABBCollider.js";
import TriangleCollider from "./TriangleCollider.js";
import ConvexCollider from "./ConvexCollider.js";
import ConcaveCollider from "./ConcaveCollider.js";

import SceneManager from "../../game/SceneManager.js";
import Point from "../base/Point.js";
import Line from "./Line.js";

class CollisionHelper {

    static inCollision(one, two) {
        //
        if (one.collider instanceof PointCollider && two.collider instanceof PointCollider){
            //Check if point coordinates are the same
            let distance = one.gameObject.location.diff(two.gameObject.location)
            if((distance.x + distance.y) == 0){
                return true;
            }
            else{
                return false;
            }
        }
        else if (one.collider instanceof PointCollider && two.collider instanceof CircleCollider){
            //check id point is inside the circle
            let distance = one.gameObject.location.distanceSquared(two.gameObject.location);
            let rad2 = two.collider.radius * two.collider.radius;
            if((distance - rad2) < 0){
                return true;
            }
            else{
                return false;
            }
        }
        else if(one.collider instanceof PointCollider && two.collider instanceof AABBCollider){
            //Check if point is inside a Axis-Aligned Bounding-Box
            let diff = one.gameObject.location.diff(two.gameObject.location);
            if(Math.abs(diff.x) < two.collider.width / 2 && Math.abs(diff.y) < two.collider.height / 2){
                return true;
            }
            else{
                return false;
            }
        }
        else if(one.collider instanceof PointCollider && two.collider instanceof TriangleCollider){
            //Check if point is inside the Triangle
            let collide = false;

            let lineA = new Line(two.collider.points[0], two.collider.points[1]);
            let lineB = new Line(two.collider.points[1], two.collider.points[2]);
            let lineC = new Line(two.collider.points[2], two.collider.points[0]);
            let point = one.gameObject.location;

            //Check is point is on the perpendicular side of each line
            if(
                lineA.isOnPerSide(point) && 
                lineB.isOnPerSide(point) && 
                lineC.isOnPerSide(point)){
                    collide = true;
            }

            return collide;
        }
        else if(one.collider instanceof CircleCollider && two.collider instanceof PointCollider){
            //swap to "Point to Circle Collision"
            return this.inCollision(two, one);
        }
        else if(one.collider instanceof CircleCollider && two.collider instanceof CircleCollider){
            //Check if origin point circle 1 is inside a circle with combined radius of the two circles on circle 2's origin point
            let distance = one.gameObject.location.distanceSquared(two.gameObject.location);
            let rad = parseInt(one.collider.radius) + parseInt(two.collider.radius);
            rad *= rad;

            if((distance - rad) < 0){
                return true;
            }
            else{
                return false;
            }
        }
        else if(one.collider instanceof CircleCollider && two.collider instanceof AABBCollider){
            //check circumference of the circle is inside the Axis-Aliged Bounding-Box
            let diff = one.gameObject.location.diff(two.gameObject.location);
            diff.x = Math.abs(diff.x) - one.collider.radius;
            diff.y = Math.abs(diff.y) - one.collider.radius;

            if(diff.x < two.collider.width / 2 && diff.y < two.collider.height / 2){
                return true;
            }
            else{
                return false;
            }
        }
        else if(one.collider instanceof CircleCollider && two.collider instanceof TriangleCollider){
            let collide = false; 

            let pointC = one.gameObject.location;
            let radius = one.collider.radius;

            let points = two.collider.points;
            
            if(points != null){

                let lines = [
                    new Line (points[0], points[1]),
                    new Line (points[1], points[2]),
                    new Line (points[2], points[0]),
                ];
                
                //Circle intersect edge Test
                if(!collide){
                    lines.forEach(edge => {
                        let i = edge.getIntersectionPoint(pointC);

                        if(edge.inBetweenPoints(i)){
                            let d = i.distanceSquared(pointC);
                            let r = radius * radius;

                            if(d < r){
                                collide = true;
                                two.collider.isEdgeCollide = true;
                                two.collider.collideLine = edge;
                                two.collider.collideIntPoint = i;
                            }
                        }
                    });
                }

                //Circle inside Triangle Test
                if(!collide){
                    if( lines[0].isOnPerSide(pointC) && 
                        lines[1].isOnPerSide(pointC) &&
                        lines[2].isOnPerSide(pointC)){
                            collide = true;
                            two.collider.isInsideCollide = true;
                    }
                }

                //Circle colliding to Triangle Test
                //Triangle EndPoint Test
                if(!collide){
                    points.forEach(element =>{
                        let i = pointC.distanceSquared(element);
                        if(i < (radius * radius)){
                            collide = true;
                            two.collider.isEndCollide = true;
                            two.collider.collidePoint = element;
                        }
                    });
                }
            }

            return collide;
        }
        else if(one.collider instanceof AABBCollider && two.collider instanceof PointCollider){
            //swap to "Point to Axis-Aligned Bounding-Box" Collision
            return this.inCollision(two, one);
        }
        else if(one.collider instanceof AABBCollider && two.collider instanceof CircleCollider){
            ////swap to "Circle to Axis-Aligned Bounding-Box" Collision
            return this.inCollision(two, one);
        }
        else if(one.collider instanceof AABBCollider && two.collider instanceof AABBCollider){
            //check if the distance between the origin point of both boxes is less than either the combined height or width
            let diff = one.gameObject.location.diff(two.gameObject.location);
            diff.x = Math.abs(diff.x) - (one.collider.width + two.collider.width) / 2;
            diff.y = Math.abs(diff.y) - (one.collider.height + two.collider.height) / 2;
            if(diff.x < 0 && diff.y < 0){
                return true;
            }
            else{
                return false;
            }
        }
        else if(one.collider instanceof AABBCollider && two.collider instanceof TriangleCollider){
            //for each point of the triangle, to a point to axis-aligned bounding-box collision
            let collide = false;
            let points = two.collider.points;
            let ul = one.collider.ul;
            let lr = one.collider.lr;
            
            if (points != null){
                
                points.forEach(point =>{
                    if(ul.x < point.x && point.x < lr.x && ul.y < point.y && point.y < lr.y){
                        collide = true;
                    }
                });

                if(!collide){
                    let lines = [
                        new Line (points[0], points[1]),
                        new Line (points[1], points[2]),
                        new Line (points[2], points[0]),
                    ];
    
                    let rPoints = [
                        ul,
                        new Point(lr.x, ul.y),
                        lr,
                        new Point(ul.x, lr.y)
                    ]; 
    
                    for(let i = 0; i < rPoints.length; i++){
                        if(lines[0].isOnPerSide(rPoints[i]) && lines[1].isOnPerSide(rPoints[i]) && lines[2].isOnPerSide(rPoints[i])){
                            collide = true;
                            break;
                        }
                    }
                }
            }
            
            return collide;
        }
        else if(one.collider instanceof TriangleCollider && two.collider instanceof PointCollider){
            //swap to "Point to Triangle" Collision
            return this.inCollision(two, one);
        }
        else if(one.collider instanceof TriangleCollider && two.collider instanceof CircleCollider){
            //swap to "Circle to Triangle" Collision
            return this.inCollision(two, one);
        }
        else if(one.collider instanceof TriangleCollider && two.collider instanceof AABBCollider){
            //swap to "Axis-Aligned Bounding-Box to Triangle" Collision
            return this.inCollision(two, one);
        }
        else if(one.collider instanceof TriangleCollider && two.collider instanceof TriangleCollider){
            //for each point of triangle one, to a point to triangle collison with triangle two
            let collide = false; 
            
            let pointsA = one.collider.points;
            let pointsB = two.collider.points;

            if(pointsA != null && pointsB != null){
                let linesA = [
                    new Line(pointsA[0], pointsA[1]),
                    new Line(pointsA[1], pointsA[2]),
                    new Line(pointsA[2], pointsA[0])
                ];
    
                pointsB.forEach(point =>{
                    if(linesA[0].isOnPerSide(point) && linesA[1].isOnPerSide(point) && linesA[2].isOnPerSide(point)){
                        collide = true;
                    }
                });
                
                //if triangle one's  end points did not collide with triangle two,
                //then check triangle two's end point collide with triangle one.
                if(!collide){
                    let linesB = [
                        new Line(pointsB[0], pointsB[1]),
                        new Line(pointsB[1], pointsB[2]),
                        new Line(pointsB[2], pointsB[0])
                    ];
    
                    pointsA.forEach(point =>{
                        if(linesB[0].isOnPerSide(point) && linesB[1].isOnPerSide(point) && linesB[2].isOnPerSide(point)){
                            collide = true;
                        }
                    });
                }
            }

            return collide;
        }
    }
}

export default CollisionHelper;