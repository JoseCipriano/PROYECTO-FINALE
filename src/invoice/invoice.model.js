import { Schema, model } from "mongoose";


const invoiceSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        product:{
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        nameProduct:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        totalProduct:{
            type: Number,
            required: true
        }
    }],
    total:{
        type: Number,
        required: true
    },
    purchaseDate:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true,
    versionKey: false
});

export default model("Invoice", invoiceSchema);