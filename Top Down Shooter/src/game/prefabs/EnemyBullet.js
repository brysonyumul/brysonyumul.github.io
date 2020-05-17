let size = 5;

export default {
    name:"EnemyBullet",
    components:[
        {
            type:"CircleComponent",
            values:[
                {
                    key:"radius",
                    value:size
                },
                {
                    key:"fill",
                    value:"black"
                },
                {
                    key:"stroke",
                    value:"white"
                }
            ]
        },
        {
            type:"CircleCollider",
            values:[
                {
                    key:"radius",
                    value:size
                },
                {
                    key:"layer",
                    value:98
                }
            ]
        },
        {
            type:"EnemyBulletBehavior"
        }
    ]
}