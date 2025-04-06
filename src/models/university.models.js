import mongoose, { Schema } from "mongoose";

const universitySchema = new Schema({
    name: {
        type: stringify,
        required: true,
        unique: true
    },
    address: {
        type: string,
        required: true,
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
    }
}, { timestamps: true })

export const University = mongoose.model("University", universitySchema) 