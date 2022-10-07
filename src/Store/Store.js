import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "../Slice/HomeSlice";
import MovieSlice from "../Slice/MovieSlice";
import SignInSlice from "../Slice/SignInSlice";


export const Store = configureStore({
    reducer: {
        signIn: SignInSlice,
        Home: HomeSlice,
        movie:MovieSlice
    }
})