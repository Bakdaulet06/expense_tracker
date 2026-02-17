import express from "express"
import Expense from "../models/Expense.js"
import Category from "../models/Category.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()
router.use(authMiddleware)

router.post("/add-expense", authMiddleware, async (req, res) => {
  try {
    const { name, cost, categoryId, date, description} = req.body

    const userId = req.user.userId

    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newExpense = await Expense.create({
      userId: userId,
      name,
      cost,
      categoryId: categoryId,
      date,
      description
    })
    const expenseCount = await Expense.countDocuments({ categoryId, userId });
    category.count = expenseCount
    await category.save()
    res.json(newExpense)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get("/list", authMiddleware, async (req, res) => {
  try{
    const userId = req.user.userId
    const expenses = await Expense.find({ userId: userId });
    res.json(expenses)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})

router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const categories = await Category.find({ userId: userId });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/categories", authMiddleware, async (req, res) => {
  const { name, color, emoji } = req.body;
  const userId = req.user.userId

  if (!name || !name.trim())
    return res.status(400).json({ message: "Category name is required" });

  try {
    const existingCategory = await Category.findOne({
      name: name.trim(),
      userId
    });

    if (existingCategory)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = await Category.create({
      name: name.trim(),
      color,
      emoji,
      userId
    });

    res.status(201).json(newCategory);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router