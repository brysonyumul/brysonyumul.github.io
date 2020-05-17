let width = 100;
let height = 100;

export default {
    name:"Obstacle1",
    components:[
        {
            type:"RectangleComponent",
            values:[
                {
                    key:"width",
                    value:width
                },
                {
                    key:"height",
                    value:height
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
            type:"AABBCollider",
            values:[
                {
                    key:"width",
                    value:width
                },
                {
                    key:"height",
                    value:height
                },
                {
                    key:"layer",
                    value:1
                }
            ]
        }
    ]
}