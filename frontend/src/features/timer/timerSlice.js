import { createSlice } from '@reduxjs/toolkit'

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        surveyTimer: 0
    },
    reducers: {
        setTimer: (state, action) => {
            state.surveyTimer = action.payload  
        },

        countDownTimer: (state) => {
            state.surveyTimer -= 1
        },

        resetTimer: (state) => {
            state.surveyTimer = 0
        }

    },
    extraReducers: (builder) => {},
  })

export const { setTimer, countDownTimer, resetTimer } = timerSlice.actions
export default timerSlice.reducer