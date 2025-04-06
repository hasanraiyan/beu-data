import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME
const MONGO_URI = process.env.MONGO_URI


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME
        })
        console.log(`MongoDB connected! DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Database connection error: \n", error)
        process.exit(1)
    }
}

export default connectDB;