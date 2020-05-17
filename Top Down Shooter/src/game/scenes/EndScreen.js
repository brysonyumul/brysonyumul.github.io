export default {
    name:"EndScreen",
    objects:[
        {
            name:"OTHERS",
            location:{x: 0, y: 0},
            type:"EmptyGameObject2"
        },
        {
            name:"OtherText",
            location:{x: 165, y: 250},
            type:"TutorialText",
            componentValues:[
                {
                    type:"TextComponent",
                    values:[
                        {
                            key:"text",
                            value:"GAME OVER"
                        },
                        {
                          key:"font",
                          value:"60pt times"
                      }
                    ]
                },
            ]
        },
        {
            name:"OtherText",
            location:{x: 255, y: 300},
            type:"TutorialText",
            componentValues:[
                {
                    type:"TextComponent",
                    values:[
                        {
                            key:"text",
                            value:"Refresh the page to restart!"
                        },
                        {
                          key:"font",
                          value:"20pt times"
                      }
                    ]
                },
            ]
        }
    ]
}