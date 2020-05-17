let width = 30;
let height = 200;

export default {
    name:"VerticalWall",
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