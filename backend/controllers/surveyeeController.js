const Surveyee = require('../models/Surveyee')
const asyncHandler = require('express-async-handler')

// get all surveyees ----------------------------
const getAllSurveyees = asyncHandler(async (req, res) => {
    const surveyees = await Surveyee.find().lean()

    // if no Surveyees found
    if (!surveyees?.length) {
        return res.status(400).json({ message: 'No surveyees found' })
    }

    res.json(surveyees)
})

// create surveyee ----------------------------
const createSurveyee = asyncHandler(async (req, res) => {
    const { name, email, phone, authCode, answers, isCompleted } = req.body

    if (!authCode ) {
        return res.status(400).json({ message: 'Auth code is required' })
    }

    const authCodeMatch = await Surveyee.findOne({ authCode : authCode }).lean()

    if (authCodeMatch) {
        return res.status(400).json({ message: 'Auth code already taken' })
    }

    const surveyee = await Surveyee.create({ name, email, phone, authCode, answers, isCompleted })

    if (surveyee) {
        return res.status(201).json({ message: 'New surveyee created' })
    } else {
        return res.status(400).json({ message: 'Invalid surveyee data received' })
    }
})

// authorize surveyee ----------------------------
const authorizeSurveyee = asyncHandler(async (req, res) => {
    const { authCode } = req.body
    
    const surveyee = await Surveyee.findOne({ authCode })

    if (surveyee) {
        res.json({ 
            _id: surveyee.id,
            name: surveyee.name,
            email: surveyee.email,
            phone: surveyee.phone,
            authCode: surveyee.authCode,
            answers: surveyee.answers,
            startedOn: surveyee.startedOn,
            timeRemaining: surveyee.timeRemaining,
            isCompleted: surveyee.isCompleted
        })
    } else {
        return res.status(400).json({ message: 'Invalid auth code' })
    }
})

// update surveyee ----------------------------
const updateSurveyee = asyncHandler(async (req, res) => {

    const surveyee = await Surveyee.findOne({ authCode : req.params.authCode }).lean()

    if (!surveyee) {
        return res.status(400).json({ message: 'Surveyee not found' })
    }
    
    const { name, email, phone, answers, startedOn, timeRemaining, isCompleted } = req.body
    
    const updatedSurveyee = await Surveyee.updateOne(
        { authCode : req.params.authCode }, 
        { $set : {
            name : name, 
            email : email, 
            phone : phone,
            answers: answers,
            startedOn : startedOn,
            timeRemaining : timeRemaining, 
            isCompleted: isCompleted
        }})

    res.json(`Surveyee with auth code ${req.params.authCode} updated`)

})

// delete surveyee ----------------------------
const deletesurveyee = asyncHandler(async (req, res) => {
    const surveyee = await Surveyee.findById(req.params.id)

    if (!surveyee) {
        return res.status(400).json({ message: 'Surveyee not found' })
    }

    const result = await surveyee.remove()

    res.status(200).json({ id: req.params.id })

})

module.exports = {
    getAllSurveyees,
    createSurveyee,
    updateSurveyee,
    deletesurveyee,
    authorizeSurveyee
}