export default {
  name:"EmptyGameObject",
  components:[
    {
      type:"CanvasComponent",
    },
    {
      type:"CameraComponent",
    },
  ],
  children:[
    {
      name:"Tutorial",
      location:{x:100, y:100},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"TUTORIAL:"
                  }
              ]
          }
      ]
    },
    {
        name:"Tutorial",
        location:{x:100, y:120},
        type:"TutorialText",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"Movement:"
                    },
                    {
                        key:"font",
                        value:"15pt times"
                    }
                ]
            }
        ]
    },
    {
        name:"Tutorial",
        location:{x: 100,y: 135},
        type:"TutorialText",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"W: Up"
                    },
                    {
                        key:"font",
                        value:"10pt times"
                    }
                ]
            }
        ]
    },
    {
        name:"Tutorial",
        location:{x: 100,y: 150},
        type:"TutorialText",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"S: Down"
                    },
                    {
                        key:"font",
                        value:"10pt times"
                    }
                ]
            }
        ]
    },
    {
        name:"Tutorial",
        location:{x: 100,y: 165},
        type:"TutorialText",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"A: Left"
                    },
                    {
                        key:"font",
                        value:"10pt times"
                    }
                ]
            }
        ]
    },
    {
        name:"Tutorial",
        location:{x: 100,y: 180},
        type:"TutorialText",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"D: Right"
                    },
                    {
                        key:"font",
                        value:"10pt times"
                    }
                ]
            }
        ]
    },
    {
        name:"Tutorial",
        location:{x: 250,y: 120},
        type:"TutorialText",
        componentValues:[
            {
                type:"TextComponent",
                values:[
                    {
                        key:"text",
                        value:"Shooting:"
                    },
                    {
                        key:"font",
                        value:"15pt times"
                    }
                ]
            }
        ]
    },
    {
      name:"Tutorial",
      location:{x: 250,y: 135},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"Mouse: Aim"
                  },
                  {
                      key:"font",
                      value:"10pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 250,y: 150},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"Left Click: Shoot"
                  },
                  {
                      key:"font",
                      value:"10pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 400,y: 120},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"Power Modifier:"
                  },
                  {
                      key:"font",
                      value:"15pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 400,y: 135},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"1: Attack Up"
                  },
                  {
                      key:"font",
                      value:"10pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 400,y: 150},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"2: Speed Up"
                  },
                  {
                      key:"font",
                      value:"10pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 400,y: 165},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"3: Spread Shoot"
                  },
                  {
                      key:"font",
                      value:"10pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 400,y: 180},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"Space: Reset"
                  },
                  {
                      key:"font",
                      value:"10pt times"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x:100, y:250},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"GOAL:"
                  }
              ]
          }
      ]
    },
    {
      name:"Tutorial",
      location:{x: 100, y: 270},
      type:"TutorialText",
      componentValues:[
          {
              type:"TextComponent",
              values:[
                  {
                      key:"text",
                      value:"Destory All the Enemy Squares!!!"
                  },
                  {
                      key:"font",
                      value:"15pt times"
                  }
              ]
          }
      ]
    },
  ]
}