import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: any
}

const isLoggedIn = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1] // Get token from header

  if (!token) {
    res.status(401).json({ error: 'User must sign in' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) // Verify JWT
    req.user = decoded // Attach user to request
    next() // Call next middleware
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

export default isLoggedIn

