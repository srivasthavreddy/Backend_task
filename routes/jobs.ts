import express, { Response } from 'express'
import Job from '../models/job'
import isLoggedIn, { AuthRequest } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/all', isLoggedIn, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find()
    res.status(200).json(jobs)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

router.post('/', isLoggedIn, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, company, location, description } = req.body
    if (!title || !company || !location || !description) {
      res.status(400).json({ message: 'All fields are required' })
      return
    }

    const job = new Job({ title, company, location, description })
    const newJob = await job.save()
    res.status(201).json(newJob)
  } catch (err) {
    res.status(400).json({ message: 'Error creating job' })
  }
})

export default router
