import { createSlice } from "@reduxjs/toolkit"

    const allowedCurrencies = ["USD", "EUR", "GBP", "INR"] //Because localStorage can contain values that did not come from the dropdown.

    const savedCurrency = localStorage.getItem("coinlume_currency")

    const startingCurrency = allowedCurrencies.includes(savedCurrency)? savedCurrency : "INR" //This is a shorter if/else.

    const initialState = {
    selectedCurrency: startingCurrency,
    }

    const currencySlice = createSlice({
        name: "currency",
        initialState,

        reducers:{
            changeCurrency(state, action){
                state.selectedCurrency = action.payload
            },
        },
    })

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer