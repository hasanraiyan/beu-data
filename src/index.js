import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config()

const PORT =process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

