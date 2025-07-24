//server.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import reviewRoutes from './routes/reviews.js'

dotenv.config()

const app = express()
app.use(cors({
  origin: "https://maianime_frontend.vercel.app" // ←あなたのVercelの本番URLに変更
}));
app.use(express.json())

// ルーティング
app.use('/api/reviews', reviewRoutes)


// DB接続

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB connected")
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  )
})
.catch((err) => console.error("DB connection error:", err))
