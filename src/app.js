import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// import the routes
import  healthCheckRouter  from "./routes/healthcheck.routes.js"
app.use("/api/v1/healthcheck", healthCheckRouter)

export { app }