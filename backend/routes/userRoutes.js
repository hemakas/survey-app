const express = require('express')
const router = express.Router()
const userController =  require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
  .post(userController.registerUser)

router.route('/login')
  .post(userController.loginUser)

router.route('/:id')
  .delete(protect, userController.deleteUser)

module.exports = router