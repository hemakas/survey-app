import { createSlice } from '@reduxjs/toolkit'

// get timer from localStorage
const surveyTimer = localStorage.getItem('surveyTimer')

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        surveyTimer: surveyTimer ? surveyTimer : 0
    },
    reducers: {      
        setTimer: (state, action) => {
            state.surveyTimer = action.payload
            localStorage.setItem('surveyTimer', state.surveyTimer)
        },
        resetTimer: (state) => {
            localStorage.removeItem('surveyTimer')
            state.surveyTimer = 0
        },
    }
  })

export const { setTimer, resetTimer } = timerSlice.actions
export default timerSlice.reducer