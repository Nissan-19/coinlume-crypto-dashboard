import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    coins : [],
    status : "idle",
    error : null,
}

export const fetchCoins = createAsyncThunk(
    "coins/fetchCoins", //this is for redux the name of feature and operation. it can be anything. we are not going to call it
    //It is simply an internal label Redux uses to identify this particular job. this is the syntax
    // name of feature/name of operation (we keep the name same for better understanding)

    async ()=>{
        const response = await fetch ("https://api.coinlore.net/api/tickers/?start=0&limit=50")

        if(!response.ok){
            throw new Error("Failed to load coins.")
        }
        
        const result = await response.json()

        return result.data
    }
)

const coinsSlice = createSlice({
    name:"coins",
    initialState,

    reducers :{}, //this is for the actions created inside this slice

    extraReducers:(builder)=>{ //extraReducers is for actions created somewhere else, such as fetchCoins
        builder
            .addCase(fetchCoins.pending,(state)=>{
                state.status = "loading"
                state.error = null
            })

            .addCase(fetchCoins.fulfilled,(state, action)=>{
                state.status = "succeeded"
                state.coins = action.payload
                state.error = null
            })

            .addCase(fetchCoins.rejected,(state, action) =>{
                state.status = "failed"
                state.error = action.error.message
            })
    },
})

export default coinsSlice.reducer