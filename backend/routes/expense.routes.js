import express from "express"
import Expense from "../models/Expense"
import User from "../models/User"
import Category from "../models/Category"

const router = express.Router()

router.post("/add-expense", async (req, res) => {
  try {
    const { name, cost, categoryId, date, description, email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const newExpense = await Expense.create({
      user: user._id,
      name,
      cost,
      category: categoryId,
      date,
      description
    })

    res.json(newExpense)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post("/create-category", async (req, res) => {
  const { name, color, emoji, email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const newCategory = await Category.create({
    user: user._id,
    name,
    color, 
    emoji
  })
  await Category.create(newCategory)
  res.json(newCategory)
})

