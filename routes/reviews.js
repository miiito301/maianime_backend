// routes/reviews.js
import express from 'express'
import Review from '../models/Review.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { id, title, image, review } = req.body

    const newReview = new Review({
      id,
      title,
      image,
      review,
    })

    const saved = await newReview.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error("保存エラー:", err)
    res.status(500).json({ message: '保存に失敗しました' })
  }
})

export default router

//レビュー一覧取得用
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    console.error("レビュー取得エラー:", err)
    res.status(500).json({ message: "レビューの取得に失敗しました" })
  }
})