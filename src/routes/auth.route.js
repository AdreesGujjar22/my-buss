// src/routes/auth.route.js

const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')

// POST /api/auth/login
router.post('/login', AuthController.login)

// POST /api/auth/register
router.post('/register', AuthController.register)

// GET /api/auth/profile
router.get('/profile', AuthController.profile)

module.exports = router
