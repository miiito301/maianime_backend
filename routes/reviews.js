// routes/reviews.js
import express from 'express'
import Review from '../models/Review.js'

const router = express.Router()

// POST: 新しいレビュー保存
router.post('/', async (req, res) => {
  try {
    const { id, title, image, review } = req.body
    const newReview = new Review({ id, title, image, review })
    const saved = await newReview.save()
    res.status(201).json(saved)
  } catch (err) {
    console.error("保存エラー:", err)
    res.status(500).json({ message: '保存に失敗しました' })
  }
})

// GET: 全レビュー取得
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    console.error("レビュー取得エラー:", err)
    res.status(500).json({ message: "レビューの取得に失敗しました" })
  }
})

// ✅ GET: 特定ユーザーのレビュー取得
router.get('/user', async (req, res) => {
  const username = req.query.username
  if (!username) return res.status(400).json({ message: "username is required" })

  try {
    const userReviews = await Review.find({ 'review.name': username })
    const animeList = userReviews.map(r => ({
      id: r._id,
      title: r.title,
      imageUrl: r.image,
      review: r.review
    }))
    res.json({ animeList })
  } catch (err) {
    console.error("ユーザーのアニメリスト取得エラー:", err)
    res.status(500).json({ message: "ユーザーのレビュー取得に失敗しました" })
  }
})

export default router // ← 必ず最後に書くこと！
