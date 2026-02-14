import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import User from "../models/User.js"
import { sendEmail } from "../utils/sendEmail.js"

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await User.create({ email, passwordHash })

  res.status(201).json({ message: "User registered successfully" })
})

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({ email, token })
})

// FORGOT PASSWORD (SEND CODE)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.json({ message: "If user exists, code sent" })

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  const hashedCode = crypto.createHash("sha256").update(code).digest("hex")

  user.resetCode = hashedCode
  user.resetCodeExpiry = Date.now() + 10 * 60 * 1000 // 10 min
  await user.save()

  await sendEmail(
    email,
    "Password Reset Code",
    `Your password reset code is ${code}`
  )

  res.json({ message: "Reset code sent to email" })
})

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body

  const hashedCode = crypto.createHash("sha256").update(code).digest("hex")

  const user = await User.findOne({
    email,
    resetCode: hashedCode,
    resetCodeExpiry: { $gt: Date.now() }
  })

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired code" })
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10)
  user.resetCode = undefined
  user.resetCodeExpiry = undefined
  await user.save()

  res.json({ message: "Password reset successful" })
})

export default router
