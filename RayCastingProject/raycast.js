const TILESIZE = 32;
const MAP_ROW = 18; //odd for a tile in the middle
const MAP_COL = 32; //odd for a tile in the middle
const WINDOW_WIDTH = MAP_COL * TILESIZE;
const WINDOW_HEIGHT = MAP_ROW * TILESIZE;

const FOV = 60 * (Math.PI / 180);

const RENDER_WIDTH = 1;
const NUM_RAYS = WINDOW_WIDTH / RENDER_WIDTH;

//const MINIMAP_SCALE = 1;
const MINIMAP_SCALE = .25;

var mapGrid = new Map();
var player = new Player();
var util = new Util();
var rays = [];

function castAllRays(){
    let rayAngle = player.faceDirection - (FOV / 2);
    rays = [];

    for(let i = 0; i < NUM_RAYS; i++){
        let ray = new Ray(rayAngle);
        ray.cast();
        rays.push(ray);
        rayAngle += FOV / NUM_RAYS;
    }
}

function render25D(){

    fill("black");
    noStroke();
    rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    let distanceToScreen = (WINDOW_WIDTH / 2) / Math.tan(FOV / 2);

    for (let i = 0; i < NUM_RAYS; i++){
        let ray = rays[i];

        //let correction = 1; 
        let correction = Math.cos(ray.angle - player.faceDirection);
        let distanceToWall = ray.distance * correction;
        let wallHeight = (TILESIZE / distanceToWall) * distanceToScreen; 

        let blockColor = new Color();
        blockColor.getColor(ray.blockType, Math.floor(distanceToWall));

        fill("rgba(" + blockColor.r + ", " + blockColor.g + ", " + blockColor.b + ", " + blockColor.a + ")");
        noStroke();
        rect(i * RENDER_WIDTH, (WINDOW_HEIGHT / 2) - (wallHeight / 2), RENDER_WIDTH, wallHeight);
    }

}

function setup(){
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update(){
    player.update();
    castAllRays();
}

function draw(){
    clear();
    this.update();

    render25D();

    mapGrid.render();
    
    for(ray of rays){
        ray.render();
    }

    player.render();
}