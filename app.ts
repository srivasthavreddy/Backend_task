import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import jobRoutes from './routes/jobs'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/jobs', jobRoutes)

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

export default app
