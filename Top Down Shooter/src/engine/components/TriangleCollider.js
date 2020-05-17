import Collider from "./Collider.js";
import Point from "../base/Point.js";

class TriangleCollider extends Collider {
    points;
    pointTop;
    pointLeft;
    pointRight;

    isEndCollide = false;
    isEdgeCollide = false;
    isInsideCollide = false;

    collidePoint;
    collideLine;
    collodeIntPoint;

    constructor(){
        super();
    }

    update() {
        let component = this.gameObject.getComponent("TriangleComponent");
        
        this.pointTop = component.pointTop;
        this.pointLeft = component.pointLeft;
        this.pointRight = component.pointRight;

        this.points = component.points;
    }

}

export default TriangleCollider;