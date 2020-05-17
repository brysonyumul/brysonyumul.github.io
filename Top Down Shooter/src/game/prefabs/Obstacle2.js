let radius = 40;

export default {
    name:"Obstacle2",
    components:[
        {
            type:"CircleComponent",
            values:[
                {
                    key:"radius",
                    value:radius
                },
                {
                    key:"fill",
                    value:"white"
                },
                {
                    key:"stroke",
                    value:"black"
                }
            ]
        },
        {
            type:"CircleCollider",
            values:[
                {
                    key:"radius",
                    value:radius
                },
                {
                    key:"layer",
                    value:1
                }
            ]
        }
    ]
}