import mongoose, { Schema } from "mongoose";

const branchSchema = new Schema({
    name: {
        type: string,
        required: true
    },
    description: {
        type:string,
    },
    branchCode: {
        type: string
    }
})

export const Branch = mongoose.model("Branch", branchSchema)