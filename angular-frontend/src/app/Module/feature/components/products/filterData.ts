export const filters=[
    {
        id:"color",
        name:"Color",
        options:[
            { value: "green", label: "Green" },
            { value: "yellow", label: "Yellow" },
            { value: "blue", label: "Blue" },
            { value: "white", label: "White" },
            { value: "grey", label: "Grey" },
            { value: "pink", label: "Pink" },
            { value: "black", label: "Black" },
            { value: "light_blue", label: "Light Blue" },
            { value: "dark_blue", label: "Dark Blue" },
            { value: "orange", label: "Orange" },
            { value: "beige", label: "Beige" },
            { value: "purple", label: "Purple" },
            { value: "light_green", label: "Light Green" },
            { value: "maroon", label: "Maroon" },
            { value: "gold", label: "Gold" },
            { value: "multicolor", label: "Multicolor" },

        ],
    },
    {
        id:"size",
        name:"Size",
        options:[
            {value:"S",label:"S"},
            {value:"M",label:"M"},
            {value:"L",label:"L"},
        ]
    }
]

export const singleFilter=[
    {
        id:"price",
        name:"Price",
        options:[
            {value:"159-399", label:"₹159 to ₹399"},
            {value:"399-999", label:"₹399 to ₹999"},
            {value:"999-1999", label:"₹999 to ₹1999"},
            {value:"1999-2999", label:"₹1999 to ₹2999"},
            {value:"3999-4999", label:"₹3999 to ₹4999"}
        ],
    },
    {
        id: "discount",
        name: "DISCOUNT RANGE",
        options:[
            {value:"10",label:"10% and Above"},
            {value:"20",label:"20% and Above"},
            {value:"30",label:"30% and Above"},
            {value:"40",label:"40% and Above"},
            {value:"50",label:"50% and Above"},
            {value:"60",label:"60% and Above"},
            {value:"70",label:"70% and Above"},
            {value:"80",label:"80% and Above"},
        ],
    },
    {
        id:"stock",
        name:"Availability",
        options:[
            {value:"inStock",label:"In Stock"},
            {value:"outOfStock",label:"Out of Stock"},
        ],
    }
]

export const sortOptions=[
    {name:"Price: Low to High", query:"price_low", current:false},
    {name:"Price: high to Low", query:"price_high", current:false},
]