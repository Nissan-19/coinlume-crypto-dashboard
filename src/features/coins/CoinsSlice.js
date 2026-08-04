import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    coins : [],
    status : "idle",
    error : null,
}

export const fetchCoins = createAsyncThunk(
    "coins/fetchCoins", 

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

    reducers :{}, 

    extraReducers:(builder)=>{ 
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