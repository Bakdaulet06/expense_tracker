import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.routes.js"
import expenseRoutes from "./routes/expense.routes.js"
import cors from "cors"

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/expense", expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
