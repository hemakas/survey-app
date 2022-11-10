import { createSlice } from '@reduxjs/toolkit'

// get modal info from localStorage
const confrimSubmit = localStorage.getItem('confrimSubmit')

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        confrimSubmit: confrimSubmit ? confrimSubmit : false
    },
    reducers: {
        setConfirm: (state) => {
            state.confrimSubmit = true
        },
        resetConfirm: (state) => {
            state.confrimSubmit = false
        },
    },
    extraReducers: (builder) => {
    },
  })

export const { setConfirm, resetConfirm } = modalSlice.actions
export default modalSlice.reducer