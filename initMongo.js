// Senior-level MongoDB initialization for Engineering Guru using Mongoose
// Loads data.json into MongoDB and creates necessary collections
const fs = require('fs');
const path = require('path');
const { connect, Branch } = require('./db');

const DATA_FILE = path.join(__dirname, 'data.json');

async function main() {
    await connect();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    // Clean slate: remove all branches
    await Branch.deleteMany({});
    // Bulk insert branches
    if (Array.isArray(data.branches)) {
        await Branch.insertMany(data.branches);
        console.log('Branches imported successfully.');
    } else {
        throw new Error('Invalid data format: branches missing');
    }
    // Close connection
    await require('mongoose').disconnect();
}

main().catch(err => {
    console.error('MongoDB init error:', err);
    process.exit(1);
});
