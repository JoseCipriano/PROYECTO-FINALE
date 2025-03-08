import { Schema, model } from "mongoose";

const productSchema = new Schema({
    nameProduct:{
        type: String,
        required: [true, "Name product is required"],
        maxLength: [60, "Nampe product cannot exceed 60 characters"]
    },
    descriptionProduct:{
        type: String,
        required: [true, "Description product is required"],
        maxLength: [200, "Description product cannot exceed 200 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
    },
    stock:{
        type: Number
    },
    sales: {
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema)