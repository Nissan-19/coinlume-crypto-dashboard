import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoins } from '../features/coins/CoinsSlice'


function DashboardPage  ()  {
    const{displayName} = useAuth()
    const apiStatus = useSelector((state)=>state.coins.status)
    const apiCoins = useSelector((state)=>state.coins.coins)
    const dispatch = useDispatch()

  useEffect(()=>{
    if(apiStatus === "idle"){
      dispatch(fetchCoins())
    
    }
  },[apiStatus,dispatch]) //Any value taken from the component and used inside the effect should be listed as a dependency.
    
  return (
    <div>
      <h1>Dashboard page</h1>
      <h2>welcome {displayName}</h2>
      <div>
        {apiStatus === "loading" &&
          <p>Loading data</p>}
        {apiStatus === "failed" &&(
          <div>
            <p>Failed to load data</p>
              <button onClick={()=>dispatch(fetchCoins())}>
              Retry
              </button>
          </div>
        )}
        <ul>
          {apiCoins.map((apiCoin)=>(
          <li key={apiCoin.id}>{apiCoin.rank} {apiCoin.name}</li>
        ))}
        </ul>
      </div>

    </div>
  )
}

export default DashboardPage
