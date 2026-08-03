import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

    const allowedCurrencies = ["USD", "EUR", "GBP", "INR"] //Because localStorage can contain values that did not come from the dropdown.

    const savedCurrency = localStorage.getItem("coinlume_currency")

    const startingCurrency = allowedCurrencies.includes(savedCurrency)? savedCurrency : "INR" //This is a shorter if/else.

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
    rates:{             //Fallback rates, When the app first loads, the API hasn’t responded yet, so 
        USD: 1,         //Redux temporarily uses those values. Then once the request succeeds, they get replaced by the live rates:
        EUR: 0.9,       //And if the API fails, your rejected reducer changes the status to "failed", but it does not overwrite rates
        GBP: 0.8,       //So the app can still convert currencies using the fallback values instead of breaking.
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

                    action.payload.forEach((currency)=>{ //Go through each object in that array, one at a time.
                        state.rates[currency.quote] = currency.rate //state.rates["EUR"] = 0.86834
                    })  //We use square brackets because currency.quote is a variable.
                })
                /*
                rates: {
                        USD: 1,
                        EUR: 0.86834,
                        GBP: 0.74385,
                        INR: 95.39
                        } */

                .addCase(fetchCurrencyRates.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                })
        },
    })

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer