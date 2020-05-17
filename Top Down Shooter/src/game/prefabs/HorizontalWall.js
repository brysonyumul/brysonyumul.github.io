let width = 300;
let height = 30;

export default {
    name:"HorizontalWall",
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