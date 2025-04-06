import mongoose, { Schema } from "mongoose";

const semesterSchema = new Schema({
    semesterNo: {
        type: number,
        required: true,
    },
    acdemicYear: {
        type: string,
        required: true
    },
    brachId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }],
})

export const Semester = mongoose.model("Semester", semesterSchema)