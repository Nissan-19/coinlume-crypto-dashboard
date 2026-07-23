import { configureStore } from "@reduxjs/toolkit"
import currencyReducer from "../features/currency/currencySlice"
import coinsReducer from "../features/coins/coinsSlice"
import marketDataReducer from "../features/market/marketSlice"


export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    coins: coinsReducer,
    marketData: marketDataReducer,
    /*  state = {         when the reducer is registered redux create this structure
           coins: {
           coins: [],
           status: "idle",
           error: null
       */
  },
})