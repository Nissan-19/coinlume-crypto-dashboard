import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

    const allowedCurrencies = ["USD", "EUR", "GBP", "INR"]

    const savedCurrency = localStorage.getItem("coinlume_currency")

    const startingCurrency = allowedCurrencies.includes(savedCurrency)? savedCurrency : "INR"

    export const fetchCurrencyRates = createAsyncThunk(
        "currency/fetchCurrencyRates",

        async()=>{
            const response = await fetch( "https://api.frankfurter.dev/v2/rates?base=USD&quotes=EUR,GBP,INR" )
        
            if(!response.ok){
                throw new Error("Failed to fetch currency rates")
        }

        const data = await response.json()
        
        return data
        }
    )

    const initialState = {
    selectedCurrency: startingCurrency,
    rates:{            
        USD: 1,        
        EUR: 0.9,       
        GBP: 0.8,     
        INR: 85,
        },
    
    status: "idle",
    error: null,
    }
    

    const currencySlice = createSlice({
        name: "currency",
        initialState,

        reducers:{
            changeCurrency(state, action){
                state.selectedCurrency = action.payload
            },
        },

        extraReducers: (builder) => {
            builder
                .addCase(fetchCurrencyRates.pending, (state) => {
                state.status = "loading"
                state.error = null
                })

                .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
                state.status = "succeeded"

                    action.payload.forEach((currency)=>{ 
                        state.rates[currency.quote] = currency.rate 
                    })  
                })
                
                .addCase(fetchCurrencyRates.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                })
        },
    })

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer