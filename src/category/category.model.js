import { Schema, model } from "mongoose";

const categorySchema = Schema({
    nameCategory:{
        type: String,
        required: [true, "Name category is required"],
        unique: true
    },
    descriptionCategory:{
        type:String,
        required: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Category', categorySchema);