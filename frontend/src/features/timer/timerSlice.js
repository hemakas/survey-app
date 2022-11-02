import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import timerService from './timerService'

// get timer from localStorage
const surveyTimer = localStorage.getItem('surveyTimer')

const initialState = {
    surveyTimer: surveyTimer ? surveyTimer : 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// set time
export const setTimer = createAsyncThunk('timer/set', async (time) => {
    timerService.setTimer(time)
})

// end timer on end survey
export const endTimer = createAsyncThunk('timer/end', async () => {
    timerService.endTimer()
})

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        resetTimer: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {

        builder

        // set timer case
        .addCase(setTimer.fulfilled, (state, action) => {
            state.surveyTimer = action.payload
        })

        // end timer case
        .addCase(endTimer.fulfilled, (state) => {
            state.surveyTimer = 0
        })
    },
  })

export const { resetTimer } = timerSlice.actions
export default timerSlice.reducer