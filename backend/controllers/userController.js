const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// get all users ----------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()
  
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' })
  }
  
  res.json(users)
})

// create new user ----------------------------
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check if user exists
  const userExists = await User.findOne({ email }).lean().exec()

  if (userExists) {
    res.status(409).json({ message: 'User already exists' })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    "password": hashedPassword
  })

  if (user) {
    return res.status(201).json({ message: 'New user created' })
  } else {
    return res.status(400).json({ message: 'Invalid user data received' })
  }

})

// user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Generate JSON web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

// delete user ----------------------------
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const result = await user.deleteOne()

  res.json({ message: `User named ${result.name} deleted successfully` })
})

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  deleteUser
}
  
  