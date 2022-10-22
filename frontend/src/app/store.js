import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import surveyeeReducer from '../features/surveyee/surveyeeSlice'
import timerReducer from '../features/timer/timerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveyee: surveyeeReducer,
    timer: timerReducer
  },
});
