const express = require('express')
const router = express.Router()
const userController =  require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser)

router.route('/login')
  .post(userController.loginUser)

router.route('/:id')
  .delete(protect, userController.deleteUser)

module.exports = router