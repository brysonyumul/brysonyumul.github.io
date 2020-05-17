let radius = 20;

export default{
    name:"Player",
    components:[
        {
            type:"PlayerModel",
            values:[
                {
                    key:"radius",
                    value: radius
                },
                {
                    key:"baseColor",
                    value:"White"
                },
                {
                    key:"stroke",
                    value:"Black"
                }
            ]
        },
        {
            type:"PlayerMovementBehavior"
        },
        {
            type:"PlayerShootingBehavior"
        },
        {
            type:"CircleCollider",
            values:[
                {
                    key:"radius",
                    value: radius
                },
                {
                    key:"layer",
                    value: 0
                }
            ]
        }
    ]
}