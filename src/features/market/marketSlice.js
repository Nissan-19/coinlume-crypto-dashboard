import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit"

const initialState = {

    marketData:null,
    status:"idle",
    error:null
}

export const fetchMarketData = createAsyncThunk(
    "market/fetchmarketData",

    async()=>{
        const response = await fetch("https://api.coinlore.net/api/global/")

        if(!response.ok){
            throw new Error("Failed to load Data.")
        }

        const result = await response.json()

        return result[0]
    }
)

const marketDataSlice = createSlice({

    name:"marketData",
    initialState,

    reducers:{},

    extraReducers:(builder)=>{
        builder
            .addCase(fetchMarketData.pending,(state)=>{
                state.status = "loading"
                state.error = null
            })

            .addCase(fetchMarketData.fulfilled,(state, action)=>{
                state.status = "succeeded"
                state.marketData = action.payload
            })
            
            .addCase(fetchMarketData.rejected,(state, action) =>{
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export default marketDataSlice.reducer