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

router.post("/list", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const { categoryName, month } = req.body
    let query = { userId }
    if (categoryName && categoryName !== "All Categories") {
      const category = await Category.findOne({
        userId,
        name: categoryName
      })
      if (!category) {
        return res.json([]) 
      }
      query.categoryId = category._id
    }
    if (month !== undefined && month !== null && month !== "") {
      const monthIndex = parseInt(month)
      if (!isNaN(monthIndex)) {
        const now = new Date()
        const year = now.getFullYear()

        const startDate = new Date(year, monthIndex, 1)
        const endDate = new Date(year, monthIndex + 1, 1)

        query.date = {
          $gte: startDate,
          $lt: endDate
        }
      }
    }
    const expenses = await Expense.find(query).sort({ date: -1 })
    return res.json(expenses || [])
  } catch (err) {
    console.error(err)
    return res.json([]) 
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

router.post("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const { timeFilter } = req.body
    let dateFilter = {}
    const now = new Date()

    if (timeFilter === "Daily") {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      dateFilter = { date: { $gte: startOfDay } }
    } else if (timeFilter === "Weekly") {
      const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
      dateFilter = { date: { $gte: startOfWeek } }
    } else if (timeFilter === "Monthly") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      dateFilter = { date: { $gte: startOfMonth } }
    }

    const categories = await Category.find({ userId })
    const stats = await Promise.all(categories.map(async (category) => {
      const expenseCount = await Expense.countDocuments({ categoryId: category._id, userId, ...dateFilter })
      const totalAmount = await Expense.aggregate([
        { $match: { categoryId: category._id, userId, ...dateFilter } },
        { $group: { _id: null, total: { $sum: "$cost" } } }
      ])
      console.log("Total amount for category", category.name, totalAmount)
      return {
        name: category.name,
        transactions: expenseCount,
        amount: totalAmount[0] ? totalAmount[0].total : 0,
        color: category.color,
        emoji: category.emoji
      }
    }))
    res.json(stats)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

export default router