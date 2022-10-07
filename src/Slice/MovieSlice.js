import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieDetail: [],
    play: false,
    modalVideodata: []
}

export const MovieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        movieDetailAction: (state, action) => {
            state.movieDetail = action.payload
        },
        playAction: (state, action) => {
            state.play = action.payload
        },
        modalAction: (state, action) => {
            state.modalVideodata = action.payload
        }

    }
})

export const { movieDetailAction, playAction, modalAction } = MovieSlice.actions

export default MovieSlice.reducer