const mongoose = require('mongoose')
 
const Schema = mongoose.Schema
 
const surveyeeSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    authCode: { type: String },
    answers: [{ 
        type: String,
        default: ''
    }],
    startedOn: { type: Date },
    timeRemaining: {
        type: Number,
        default: 1800
    },
    isCompleted: { 
        type: Boolean,
        default: false
    }
    
}, { timestamps: true })
 
module.exports = mongoose.model('Surveyee', surveyeeSchema)