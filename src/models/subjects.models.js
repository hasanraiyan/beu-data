import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    name: {
        type: string,
        required: true
    },
    subjectCode: {
        type: string,
        required: true
    },
    credits: {
        type: number,
        required: true
    },
    type: {
        type: String,
        enum: ['Theory', 'Practical'],
        required: true
    },
    courseContent: {
        type: string,
        required: true
    },
    courseObjectives: {
        type: string,
        required: true
    },
    learningOutcome: [{
        type: string
    }],
    referenceBooks: [{
        type: string
    }],
    prerequisites: [{
        type: string,
        ref: "Subject"
    }],
}, { timestamps: true })

export const Subject = mongoose.model("Subject", subjectSchema)