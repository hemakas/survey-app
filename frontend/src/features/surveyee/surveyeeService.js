import axios from 'axios'

const API_URL = '/api/surveyees/'

// get all surveyees
const getSurveyees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// get surveyee by auth code
const getSurveyeeByAuthCode = async (authCode) => {
  const response = await axios.post(API_URL + authCode)
  if (response.data) {
    localStorage.setItem('surveyee', JSON.stringify(response.data))
  }
  return response.data
}

// create new surveyee
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
const updateSurveyee = async (surveyeeData) => {
  const updateData = {
    name: surveyeeData.name,
    email: surveyeeData.email,
    phone: surveyeeData.phone,
    answers: surveyeeData.answers,
    startedOn: surveyeeData.startedOn,
    timeRemaining : surveyeeData.timeRemaining, 
    isComplted: surveyeeData.isComplted,
  }
  const response = await axios.put(API_URL + surveyeeData.authCode, updateData)
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

// Logout user
const logoutSurveyee = () => {
  localStorage.removeItem('surveyee')
}

const surveyeeService = {
  getSurveyees,
  getSurveyeeByAuthCode,
  createSurveyee,
  updateSurveyee,
  deleteSurveyee,
  logoutSurveyee
}
  
export default surveyeeService