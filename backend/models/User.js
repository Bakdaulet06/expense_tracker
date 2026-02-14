import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  resetCode: String,
  resetCodeExpiry: Date
}, { timestamps: true })

export default mongoose.model("User", userSchema)
