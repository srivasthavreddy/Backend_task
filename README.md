# Backend_task
This is a Node.js and Express.js based authentication system with JWT-based authentication and MongoDB as the database. It includes user registration, login, and profile retrieval.

# Features
GET /jobs/all → Fetch all jobs
POST /jobs/ → Create a new job
POST /auth/register → Register a new user
POST /auth/login → User login
GET /auth/profile → Fetch the authenticated user's profile
User registration with password hashing
User login with JWT authentication
Fetching user profile using authentication middleware
Secure API endpoints with JWT verification

# Tech Stack
Node.js + Express.js (Backend Framework)
MongoDB + Mongoose (Database and ODM)
TypeScript (Typed JavaScript for better maintainability)
bcryptjs (Password Hashing)
jsonwebtoken (JWT Authentication)
Postman (API Testing)
