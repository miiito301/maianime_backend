// models/Review.js
import mongoose from 'mongoose'

// ✅ review フィールドのネスト構造をサブスキーマで明示
const reviewDetailSchema = new mongoose.Schema({
  name: String,
  WhichList: Number,
}, { _id: false }) // ← _id を review に付けたくないなら false

const reviewSchema = new mongoose.Schema({
    id: String,
    title:String,
    image:String,
    review: reviewDetailSchema, // ✅ここを review: { ... } ではなく reviewDetailSchema にする
})

const Review = mongoose.model('Review', reviewSchema)
export default Review
