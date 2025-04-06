import mongoose, { Schema } from "mongoose";
import { University } from "./university.models";

const collegeSchema = new Schema({
    name: {
        type: stringify,
        required: true,
        unique: true
    },
    address: {
        type: string,
        required: true,
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University"
    },
    website: {
        type: string
    },
    establishedYear: {
        type: number
    },
    contactEmail: {
        type: string
    },
    contactPhone: {
        type: string
    },
    collegeCode: {
        type: string
    }
},
    { timestamps: true })

export const College = mongoose.model("College", collegeSchema) 