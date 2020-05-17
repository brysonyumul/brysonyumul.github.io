import Collider from "./Collider.js";
import Point from "../base/Point.js";

/**
Axis - Aligned Bounding Box 
*/

class AABBCollider extends Collider {
    width;
    height;

    ul;
    lr;

    constructor() {
        super();
    }

    update(){
        this.ul = new Point((this.gameObject.x - (this.width / 2)), (this.gameObject.y - (this.height /2)));
        this.lr = new Point((this.gameObject.x + (this.width / 2)), (this.gameObject.y + (this.height /2)));
    }

}

export default AABBCollider;