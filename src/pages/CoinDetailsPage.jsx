import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function CoinDetailsPage  ()  {
  const {id} = useParams()

  const [coinProfile, setCoinProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCoinProfile() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://api.coinlore.net/api/coin/info/?id=${id}`)

        if(!response.ok){
        throw new Error("Failed to fetch coin profile")
        }
        
        const data = await response.json()
        setCoinProfile(data[0])
        //the api provides data on the object 0th index

      } catch (requestError){
        console.error(requestError)
        setError("something went wrong")
      } finally{
        setIsLoading (false)
      }
      
    }

  useEffect(()=>{
    fetchCoinProfile()
  }, [id])
  // The component can render many times,
// but useEffect prevents this API request from running on every render.
// We wrote the async function outside useEffect
// so both useEffect and the Retry button can access it.
// useEffect calls the function automatically
// when the page first opens or when the id changes.
// The Retry button when the page first opens or when the id changes.
// can call the same function manually.
  return (
    <div>
        <div>
          {isLoading && (
            <h1 className='px-6 py-8 text-center text-slate-500'>
                Loading coin data.
            </h1>
          )  }
        </div>
        <div>
          {error!== null &&(
            <div>
            <h1 className='px-6 py-8 text-center text-slate-500'>
              {error}
            </h1>
            <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            type='button'
            onClick={fetchCoinProfile}
            >
              Retry
            </button>
            </div>
          )}
        </div>
      

    </div>
  )
}

export default CoinDetailsPage
