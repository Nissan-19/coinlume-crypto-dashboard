import { configureStore } from "@reduxjs/toolkit"
import currencyReducer from "../features/currency/currencySlice"
import coinsReducer from "../features/coins/coinsSlice"
import marketDataReducer from "../features/market/marketSlice"
import savedCoinReducer from "../features/watchlist/watchlistSlice"


export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    coins: coinsReducer,
    /*  state = {         when the reducer is registered redux create this structure
           coins: {
           coins: [],
           status: "idle",
           error: null
       */
    marketData: marketDataReducer,
    savedCoins: savedCoinReducer,
    
    
  },
})

store.subscribe(()=>{ //subscribe() is just the listener. means Whenever Redux state changes, run this function
  //subscribe() runs for every Redux update, not only watchlist updates. But each time, it still saves the current coinIds value.
  const currentState = store.getState() //read all the data currently in redux state (store) and save in currentstate
  const savedCoinsId = currentState.savedCoins.coinIds //now from all the data save on ly the coins id in savedcoin id

  localStorage.setItem("storedIds",JSON.stringify(savedCoinsId)) //store the savedcoinid in localstoarage
})