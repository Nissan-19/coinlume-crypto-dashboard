import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoins } from '../features/coins/coinsSlice'
import { useNavigate } from 'react-router-dom'
import { LucideBookmark } from 'lucide-react'


function CoinsPage  ()  {
  const apiCoins = useSelector((state)=>state.coins.coins)
  const apiStatus = useSelector((state)=>state.coins.status)
  const apiError = useSelector((state) => state.coins.error)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(apiStatus === "idle"){
      dispatch(fetchCoins())
    }
  },[apiStatus, dispatch])

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatLargeNumber = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatPercentage = (value) => {
    const number = Number(value)

    return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Top 50 Cryptocurrencies
        </h2>   
      </div>

      {apiStatus === "loading" && (
        <p className="px-6 py-8 text-center text-slate-500">
          Loading coins...
        </p>
      )}

      {apiStatus === "failed" && (
        <div className="flex flex-col items-center gap-3 px-6 py-8">
          <p className="text-red-600 dark:text-red-400">
            {apiError}
            
          </p>

          <button
            type="button"
            onClick={()=>dispatch(fetchCoins())}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {apiStatus === "succeeded" &&(
        <div className='overflow-x-auto'>
          <table className="w-full min-w-225 text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Coin</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">1h</th>
                <th className="px-6 py-3">24h</th>
                <th className="px-6 py-3">7d</th>
                <th className="px-6 py-3">Market Cap</th>
                <th className="px-6 py-3">Volume 24h</th>
                <th className="px-6 py-3">Watchlist</th>
              </tr>
            </thead>

            <tbody>

            {apiCoins.map((apiCoin)=>{
              const change1h = Number(apiCoin.percent_change_1h)
              const change24h = Number(apiCoin.percent_change_24h)
              const change7d = Number(apiCoin.percent_change_7d)

              return(
                <tr
                  key={apiCoin.id}
                  onClick={()=>navigate(`/coins/${apiCoin.id}`)}
                  className="cursor-pointer border-t border-slate-200 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50">
                  
                  <td className="px-6 py-4 font-medium">
                      #{apiCoin.rank}
                  </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold dark:bg-slate-800">
                          {apiCoin.symbol.slice(0, 2)}
                        </div>

                        <div>
                          <p  
                          className="font-medium text-slate-900 dark:text-white">
                            {apiCoin.name}
                          </p>

                          <p className="text-xs uppercase text-slate-500">
                            {apiCoin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {formatPrice(apiCoin.price_usd)}
                    </td>

                    <td
                      className={`px-6 py-4 font-medium ${
                        change1h >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatPercentage(apiCoin.percent_change_1h)}
                    </td>

                     <td
                      className={`px-6 py-4 font-medium ${
                        change24h >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatPercentage(apiCoin.percent_change_24h)}
                    </td>

                    <td
                      className={`px-6 py-4 font-medium ${
                        change7d >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatPercentage(apiCoin.percent_change_7d)}
                    </td>

                    <td className="px-6 py-4">
                      {formatLargeNumber(apiCoin.market_cap_usd)}
                    </td>

                    <td className="px-6 py-4">
                      {formatLargeNumber(apiCoin.volume24)}
                    </td>
                    <td className='px-12 py-4'
                      onClick={(event)=>{
                          event.stopPropagation()
                          console.log("bookmark clicked", apiCoin.id)
                        }}>
                      <button 
                        type='button'
                        
                        >
                        <LucideBookmark size={20}/>
                      </button>
                    </td>
                </tr>
              )
            })}

            </tbody>

          </table>

        </div>
      )}
      
      </section>
  )
}

export default CoinsPage
