import { configureStore } from "@reduxjs/toolkit"
import currencyReducer from "../features/currency/currencySlice"
import coinsReducer from "../features/coins/CoinsSlice"
import marketDataReducer from "../features/market/marketSlice"
import savedCoinReducer from "../features/watchlist/watchlistSlice"


export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    coins: coinsReducer,
    marketData: marketDataReducer,
    savedCoins: savedCoinReducer,
    
    
  },
})

store.subscribe(()=>{ 
  
  const currentState = store.getState() 
  const savedCoinsId = currentState.savedCoins.coinIds 

  localStorage.setItem("storedIds",JSON.stringify(savedCoinsId)) 
})