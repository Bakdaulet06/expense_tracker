import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    default: "Unnamed expense"
  },

  cost: {
    type: Number,
    default: 0
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },

  date: {
    type: Date,
    default: Date.now
  },

  description: {
    type: String,
    default: ""
  }

}, { timestamps: true })

export default mongoose.model("Expense", expenseSchema)
