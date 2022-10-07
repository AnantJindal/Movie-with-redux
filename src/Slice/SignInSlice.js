import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userNameError: false,
    passwordError: false,
    loading: false,
}


export const SignInSlice = createSlice({
    name: "signIn",
    initialState,
    reducers: {
        nameErrorAction: (state, action) => {
            state.userNameError = action.payload
        },
        passwordErrorAction: (state, action) => {
            state.passwordError = action.payload
        },

        loadingAction: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const { nameErrorAction, passwordErrorAction, loadingAction } = SignInSlice.actions

export default SignInSlice.reducer