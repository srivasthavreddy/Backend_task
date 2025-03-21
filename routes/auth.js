import express, { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import isLoggedIn, { AuthRequest } from '../middleware/authMiddleware'

const router = Router()

router.get('/profile', isLoggedIn, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('Fetching user profile for userId:', req.user.userId) 

    const user = await User.findById(req.user.userId).select('-password')
    if (!user) {
      console.log('User not found') 
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json(user)
  } catch (err) {
    console.error('Error fetching user profile:', err) 
    res.status(500).json({ message: 'Error fetching user profile' })
  }
})

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Register request received:', req.body) 

    const { username, password } = req.body
    if (!username || !password) {
      console.log('Missing fields in registration request') 
      res.status(400).json({ message: 'Username and password are required' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()

    console.log('User registered successfully:', username) 
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Error registering user:', err) 
    res.status(400).json({ message: err instanceof Error ? err.message : 'Error registering user' })
  }
})

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Login request received:', req.body) 

    const { username, password } = req.body
    if (!username || !password) {
      console.log('Missing username or password') 
      res.status(400).json({ message: 'Username and password are required' })
      return
    }

    const user = await User.findOne({ username })
    if (!user) {
      console.log('User not found:', username) 
      res.status(400).json({ message: 'User not found' })
      return
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.log('Invalid credentials') 
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
    console.log('Login successful for:', username) 

    res.json({ token })
  } catch (err) {
    console.error('Error logging in:', err) 
    res.status(500).json({ message: err instanceof Error ? err.message : 'Error logging in' })
  }
})

export default router
