var bullet = {
    name:"PlayerBullet",
    components:[
        {
            type:"TriangleComponent",
            values:[
                {
                    key:"fill",
                    value:"White"
                },
                {
                    key:"stroke",
                    value:"Black"
                },
                {
                    key:"base",
                    value:15
                },
                {
                    key:"height",
                    value:15
                },
            ]
        },
        {
            type:"PlayerBulletBehavior"
        },
        {
            type:"TriangleCollider",
            values:[
                {
                    key:"layer",
                    value: 0
                }
            ]
        }
    ]
};

export default bullet;