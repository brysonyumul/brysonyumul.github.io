export default {
    name:"EndScreen2",
    objects:[
        {
            name:"OTHERS",
            location:{x: 0, y: 0},
            type:"EmptyGameObject2"
        },
        {
            name:"OtherText",
            location:{x: 220, y: 250},
            type:"TutorialText",
            componentValues:[
                {
                    type:"TextComponent",
                    values:[
                        {
                            key:"text",
                            value:"YOU WIN!"
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
            location:{x: 260, y: 300},
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