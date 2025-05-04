const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Auth } = require('../models')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
const TOKEN_EXPIRES_IN = '1h'

exports.register = async (req, res, next) => {
  try {
    const { name , email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    
    const user = await Auth.create({ name , email, password: hash });
    
    res.status(201).json(user)
  } catch (err) {

    console.error('❌ Sequelize error:', err); 
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Auth.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN })
    res.json({ token })
  } catch (err) {
    next(err)
  }
}

exports.profile = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' })
    }
    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await Auth.findByPk(payload.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
}
