import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    loading: false,
    page: 1,
    apiData: [],
    movies: []
}


export const fetchMovies = createAsyncThunk('movie/getMovie', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=36f92e051d1f7b92dd147302b1b51f81&page=${initialState.page}`)
    return response.data.results
})

export const HomeSlice = createSlice({
    name: "Home",
    initialState,
    reducers: {
        pageAction: (state, action) => {
            state.page = action.payload
        },
        pagePlus: (state) => {
            state.page += 1
        },
        pageMinus: (state) => {
            state.page -= 1
        },
        homeloadingAction: (state, action) => {
            state.loading = action.payload
        },
        apiDataAction: (state, action) => {
            state.apiData = action.payload
        }
    },
    extraReducers: {
        [fetchMovies.pending]: (state) => {
            console.log("pending")
            console.log(state.loading)
            state.loading = true
        },
        [fetchMovies.fulfilled]: (state, { payload }) => {
            state.loading = false
            console.log("fulfilled")
            return { ...state, movies: payload }
        },
        [fetchMovies.rejected]: (state) => {
            console.log('rejected')
            state.loading = false
        }
    }
})

export const { pageAction, homeloadingAction, apiDataAction, pagePlus, pageMinus } = HomeSlice.actions

export default HomeSlice.reducer