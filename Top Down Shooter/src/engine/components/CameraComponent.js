import Base from "../Base.js"
import SM from "../../game/SceneManager.js";

/**
 * A component that indicates the containing game object is a virtual camera.
 * This component also stores the default background color for the scene.
 * There should be exactly one game object with exactly one instance
 * of this class in each scene.
 */

class CameraComponent extends Base.Component {
    constructor() {
        super();
        this.backgroundColor = "gray";
    }
}

export default CameraComponent;