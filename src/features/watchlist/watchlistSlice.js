import { createSlice } from "@reduxjs/toolkit"

function loadSavedCoinsIds(){
    try{
        const savedIds = JSON.parse(localStorage.getItem("storedIds"))
        return savedIds ? (savedIds):[]
    } catch{
        return[]
    }
}

const initialState={
    coinIds : loadSavedCoinsIds(),
}

const savedCoinsSlice = createSlice({
    name: "SavedCoins",
    initialState,
    reducers:{
        
        saveCoin:(state,action)=>{ 

            if(!state.coinIds.includes(action.payload)){
                state.coinIds.push(action.payload)
            }
        },
        
        removeCoin:(state,action)=>{
           
            state.coinIds = state.coinIds.filter(
            (savedId) => savedId !== (action.payload))
        },
    },
})


export const {saveCoin, removeCoin} = savedCoinsSlice.actions
export default savedCoinsSlice.reducer