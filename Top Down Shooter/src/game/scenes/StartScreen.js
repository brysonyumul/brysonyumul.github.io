let myCanvas = document.getElementById('canv');

let screenWidth = myCanvas.scrollWidth;
let screenHeight = myCanvas.scrollHeight;

let x = 0;
let y = 0;

let col = 3;
let row = 3;

let camAndPlayer = [
    {
        name:"EMPTY",
        location: {x:0, y:0},
        type:"EmptyGameObject"
    },
    {
        name:"Player",
        location: {x:100, y:100},
        type:"Player"
    },
]

let ui = [
    {
        name:"UI",
        location:{x: 20, y: 20},
        type:"UIComponent",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"HP: "
                    },
                    {
                      key:"font",
                      value:"15pt times"
                  }
                ]
            },
        ]
    }
]

let map = [];

for(let i = 0; i < col; i++){
    for(let j = 0; j < row; j++){
        map = map.concat(getWalls(x, y));
        
        if(j == 0){
            map = map.concat(blockDoor(x, y, true, true, false));
        }
        else if(j == 2){
            map = map.concat(blockDoor(x, y, true, false, false));
        }

        if(i == 0){
            map = map.concat(blockDoor(x, y, false, false, true));
        }
        else if(i == 2){
            map = map.concat(blockDoor(x, y, false, false, false));
        }

        y += screenHeight;
    }

    y = 0;
    x += screenWidth;
}

x = 0;
y = 0;

for(let i = 0; i < col; i++){
    for(let j = 0; j < row; j++){
        let num = Math.random() * 10;

        if(num > 5){
            num = num / 2
        }

        num = Math.ceil(num);

        if(!((i == 0) && (j == 0))){
            map = map.concat(getStyle(x, y, num));
        }

        y += screenHeight;
    }

    y = 0;
    x += screenWidth;
}

map = map.concat(ui);
let object = camAndPlayer.concat(map);


export default {
    name: "StartScreen",
    objects: object
}

function getWalls(sX, sY){
    return [
        {
            name:"VerticalWall",
            location: {x: sX + 15, y: sY + 100},
            type:"VerticalWall"
        },
        {
            name:"VerticalWall",
            location: {x: sX + 15, y: sY + 500},
            type:"VerticalWall"
        },
        {
            name:"VerticalWall",
            location: {x: sX + 785, y: sY + 100},
            type:"VerticalWall"
        },
        {
            name:"VerticalWall",
            location: {x: sX + 785, y: sY + 500},
            type:"VerticalWall"
        },
        {
            name:"HorizontalWall",
            location: {x: sX + 150, y: sY + 15},
            type:"HorizontalWall"
        },
        {
            name:"HorizontalWall",
            location: {x: sX + 650, y: sY + 15},
            type:"HorizontalWall"
        },
        {
            name:"HorizontalWall",
            location: {x: sX + 150, y: sY + 585},
            type:"HorizontalWall"
        },
        {
            name:"HorizontalWall",
            location: {x: sX + 650, y: sY + 585},
            type:"HorizontalWall"
        },
    ];
}

function blockDoor(sX, sY, isHor, isTop, isLeft){
    if(isHor){
        if(isTop){
            return [
                {
                    name:"HorizontalWall",
                    location: {x: sX + 400, y: sY + 15},
                    type:"HorizontalWall"
                }
            ];
        }
        else{
            return [
                {
                    name:"HorizontalWall",
                    location: {x: sX + 400, y: sY + 585},
                    type:"HorizontalWall"
                }
            ];
        }
    }
    else{
        if(isLeft){
            return [
                {
                name:"VerticalWall",
                location: {x: sX + 15, y: sY + 300},
                type:"VerticalWall"}
            ];
        }
        else {
            return [
                {
                name:"VerticalWall",
                location: {x: sX + 785, y: sY + 300},
                type:"VerticalWall"}
            ];
        }
    }
}

function getStyle(sX, sY, styleNum){
    if(styleNum == 1){
        return [
            {
                name:"Obstacle",
                location:{x: (sX + 250), y: (sY + 200)},
                type:"Obstacle1"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 550), y: (sY + 200)},
                type:"Obstacle1"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 250), y: (sY + 400)},
                type:"Obstacle1"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 550), y: (sY + 400)},
                type:"Obstacle1"
            },
            {
                name:"Enemy",
                location: {x: (sX + 400), y: (sY + 250)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 400), y: (sY + 350)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 350), y: (sY + 300)},
                type:"Enemy2"
            },            
            {
                name:"Enemy",
                location: {x: (sX + 450), y: (sY + 300)},
                type:"Enemy2"
            },
        ];
    }
    else if(styleNum == 2){
        return [
            {
                name:"Obstacle",
                location:{x: (sX + 250), y: (sY + 150)},
                type:"Obstacle2"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 250), y: (sY + 300)},
                type:"Obstacle2"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 250), y: (sY + 450)},
                type:"Obstacle2"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 550), y: (sY + 150)},
                type:"Obstacle2"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 550), y: (sY + 300)},
                type:"Obstacle2"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 550), y: (sY + 450)},
                type:"Obstacle2"
            },
            {
                name:"Enemy",
                location: {x: (sX + 400), y: (sY + 250)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 400), y: (sY + 350)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 350), y: (sY + 300)},
                type:"Enemy2"
            },            
            {
                name:"Enemy",
                location: {x: (sX + 450), y: (sY + 300)},
                type:"Enemy2"
            },
        ];
    }
    else if(styleNum == 3){
        return [
            {
                name:"Obstacle",
                location:{x: (sX + 400), y: (sY + 150)},
                type:"HorizontalWall"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 400), y: (sY + 450)},
                type:"HorizontalWall"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 150), y: (sY + 300)},
                type:"VerticalWall"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 650), y: (sY + 300)},
                type:"VerticalWall"
            },
            {
                name:"Enemy",
                location: {x: (sX + 400), y: (sY + 250)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 400), y: (sY + 350)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 350), y: (sY + 300)},
                type:"Enemy2"
            },            
            {
                name:"Enemy",
                location: {x: (sX + 450), y: (sY + 300)},
                type:"Enemy2"
            },
        ];
    }
    else if(styleNum == 4){
        return [
            {
                name:"Obstacle",
                location:{x: (sX + 200), y: (sY + 300)},
                type:"HorizontalWall"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 600), y: (sY + 300)},
                type:"HorizontalWall"
            },
            {
                name:"Enemy",
                location: {x: (sX + 300), y: (sY + 150)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 500), y: (sY + 450)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 300), y: (sY + 450)},
                type:"Enemy2"
            },            
            {
                name:"Enemy",
                location: {x: (sX + 500), y: (sY + 150)},
                type:"Enemy2"
            },
        ];
    }
    else if(styleNum == 5){
        return [
            {
                name:"Obstacle",
                location:{x: (sX + 200), y: (sY + 300)},
                type:"VerticalWall"
            },
            {
                name:"Obstacle",
                location:{x: (sX + 600), y: (sY + 300)},
                type:"VerticalWall"
            },
            {
                name:"Enemy",
                location: {x: (sX + 300), y: (sY + 200)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 500), y: (sY + 400)},
                type:"Enemy"
            },
            {
                name:"Enemy",
                location: {x: (sX + 300), y: (sY + 400)},
                type:"Enemy2"
            },            
            {
                name:"Enemy",
                location: {x: (sX + 500), y: (sY + 200)},
                type:"Enemy2"
            },
        ];
    }
}