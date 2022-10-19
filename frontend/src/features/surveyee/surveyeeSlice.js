import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import surveyeeService from './surveyeeService'

// Get user from localStorage
const surveyee = JSON.parse(localStorage.getItem('surveyee'))

const initialState = {
  surveyee: surveyee ? surveyee : null,
  surveyees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// get all surveyees
export const getSurveyees = createAsyncThunk('surveyees/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await surveyeeService.getSurveyees(token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get surveyee by auth code
export const getSurveyeeByAuthCode = createAsyncThunk('surveyees/getSurveyeeByAuthCode', async (authCode, thunkAPI) => {
  try {
    return await surveyeeService.getSurveyeeByAuthCode(authCode)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// create new surveyee
export const createSurveyee = createAsyncThunk('surveyees/create', async (surveyeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await surveyeeService.createSurveyee(surveyeeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

// update surveyee
export const updateSurveyee = createAsyncThunk('surveyees/updateSurveyee', async (surveyeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await surveyeeService.updateSurveyee(surveyeeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

// Delete surveyee
export const deleteSurveyee = createAsyncThunk('surveyees/delete', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await surveyeeService.deleteSurveyee(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logoutSurveyee = createAsyncThunk('surveyees/logout', async () => {
  await surveyeeService.logoutSurveyee()
})
  

// builder methods
export const surveyeeSlice = createSlice({
    name: 'surveyee',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder

        // get surveyees cases
        .addCase(getSurveyees.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getSurveyees.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.surveyees = action.payload
        })
        .addCase(getSurveyees.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        // get surveyees by auth code cases
        .addCase(getSurveyeeByAuthCode.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getSurveyeeByAuthCode.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.surveyee = action.payload
        })
        .addCase(getSurveyeeByAuthCode.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        // create surveyee cases
        .addCase(createSurveyee.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createSurveyee.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.surveyees.push(action.payload)
        })
        .addCase(createSurveyee.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
  
        // update surveyee cases
        .addCase(updateSurveyee.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateSurveyee.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.surveyees = state.surveyees.map((item) => item._id === action.payload._id ? action.payload : item)
        })
        .addCase(updateSurveyee.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })

        // delete surveyee cases
        .addCase(deleteSurveyee.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteSurveyee.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.surveyees = state.surveyees.filter(
            (surveyee) => surveyee._id !== action.payload.id
          )
        })
        .addCase(deleteSurveyee.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        // clear surveyee from local storage when surveyee logs out
        .addCase(logoutSurveyee.fulfilled, (state) => {
          state.surveyee = null
        })
    },
  })
  
  export const { reset } = surveyeeSlice.actions
  export default surveyeeSlice.reducer
  