const express = require('express')
const router = express.Router()
const surveyeeController =  require('../controllers/surveyeeController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
  .get(surveyeeController.getAllSurveyees)
  .post(surveyeeController.createSurveyee)
  
router.route('/:authCode')
  .post(surveyeeController.authorizeSurveyee)
  .put(surveyeeController.updateSurveyee)

router.route('/:id')
  .delete(surveyeeController.deletesurveyee)

module.exports = router