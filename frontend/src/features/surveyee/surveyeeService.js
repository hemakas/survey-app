import axios from 'axios'

const API_URL = '/api/surveyees/'

// Create new surveyee
const createSurveyee = async (surveyeeData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(API_URL, surveyeeData, config)
    return response.data
}

// update surveyee
const updateSurveyee = async (surveyeeData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const updateData = {
      name: surveyeeData.name,
      email: surveyeeData.email,
      phone: surveyeeData.phone,
      answers: surveyeeData.answers,
      isComplted: surveyeeData.isComplted,
    }
    const response = await axios.put(API_URL + surveyeeData.authCode, updateData, config)
    return response.data
}

// delete surveyee
const deleteSurveyee = async (surveyeeId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(API_URL + surveyeeId, config)
    return response.data
}

const surveyeeService = {
    createSurveyee,
    updateSurveyee,
    deleteSurveyee
  }
  
  export default surveyeeService