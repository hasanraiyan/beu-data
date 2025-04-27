// Senior-level MongoDB connection using Mongoose
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/engineering_guru';

let isConnected = false;

async function connect() {
    if (!isConnected) {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
    }
    return mongoose;
}

// Example schema definitions (expand as needed)
const SemesterSchema = new mongoose.Schema({
    id: Number,
    name: String,
    subjectsCount: Number,
    credits: Number,
    subjects: [mongoose.Schema.Types.Mixed],
}, { _id: false });

const BranchSchema = new mongoose.Schema({
    name: String,
    id: String,
    icon: String,
    color: String,
    gradientColors: [String],
    description: String,
    semesters: [SemesterSchema],
});

const Branch = mongoose.models.Branch || mongoose.model('Branch', BranchSchema);

module.exports = { connect, Branch };
