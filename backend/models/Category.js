import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ""
  },
  count: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  emoji: {
    type: String,
    default: "💸"
  }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
