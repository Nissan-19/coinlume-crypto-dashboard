
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoins } from '../features/coins/coinsSlice'
import { useNavigate } from 'react-router-dom'
import { BookmarkCheck } from 'lucide-react'
import {removeCoin} from '../features/watchlist/watchlistSlice'

function WatchlistPage () {
  const coinIds = useSelector((state)=>state.savedCoins.coinIds)
  const coins = useSelector((state)=>state.coins.coins)
  const coinsStatus = useSelector((state)=>state.coins.status)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
      if(coinsStatus === "idle"){
        dispatch(fetchCoins())
      }
    },[coinsStatus, dispatch])
    /*When the app refreshes, coins start with an empty array,
    So the page temporarily says the watchlist is empty, even though the saved IDs still exist.
    The page needs to fetch the full coins data again:
    */

  const filteredWatchlist = coins.filter((coin)=>coinIds.includes(String(coin.id)))
  /* For each coin
      convert its ID to a string
      check whether coinIds contains it
      keep that coin when true */

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

  function handleRemoveFromWatchlist(coinId){
  
      const currentCoinId = String(coinId)
          dispatch(removeCoin(currentCoinId))            
  }

  return (
    <div>
      {coinsStatus ==="loading" &&(
        <p className="px-6 py-8 text-center text-slate-500">
          Loading coins...
        </p>
      )}

      {coinsStatus === "failed" && (
              <div className="flex flex-col items-center gap-3 px-6 py-8">
                <p className="text-red-600 dark:text-red-400">
                  Failed to load coins
                  
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

      {coinsStatus ==="succeeded" && (
        filteredWatchlist.length === 0?(
        <h1>The Watchlist is empty</h1>
      ):(
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
                <th className="px-6 py-3">Remove</th>
              </tr>
            </thead>

            <tbody>
              {filteredWatchlist.map((coin)=>{
                 const change1h = Number(coin.percent_change_1h)
                const change24h = Number(coin.percent_change_24h)
                const change7d = Number(coin.percent_change_7d)

              return(
          
                <tr
                  key={coin.id}
                  onClick={()=>navigate(`/coins/${coin.id}`)}
                  className="cursor-pointer border-t border-slate-200 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50">
                  
                  <td className="px-6 py-4 font-medium">
                      #{coin.rank}
                  </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold dark:bg-slate-800">
                          {coin.symbol.slice(0, 2)}
                        </div>

                        <div>
                          <p  
                          className="font-medium text-slate-900 dark:text-white">
                            {coin.name}
                          </p>

                          <p className="text-xs uppercase text-slate-500">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {formatPrice(coin.price_usd)}
                    </td>

                    <td
                      className={`px-6 py-4 font-medium ${
                        change1h >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatPercentage(coin.percent_change_1h)}
                    </td>

                     <td
                      className={`px-6 py-4 font-medium ${
                        change24h >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatPercentage(coin.percent_change_24h)}
                    </td>

                    <td
                      className={`px-6 py-4 font-medium ${
                        change7d >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatPercentage(coin.percent_change_7d)}
                    </td>

                    <td className="px-6 py-4">
                      {formatLargeNumber(coin.market_cap_usd)}
                    </td>

                    <td className="px-6 py-4">
                      {formatLargeNumber(coin.volume24)}
                    </td>

                    <td className='px-12 py-4'
                      onClick={(event)=>{
                          event.stopPropagation()
                        }}>
                      <button 
                        type='button'
                        onClick = {()=>handleRemoveFromWatchlist(coin.id)} 
                        >
                         <BookmarkCheck size={18} />
                      </button>
                    </td>

                </tr>
              )
            })}
            </tbody>

            </table>
            </div>
        
      ))}
      
    </div>
  )
}

export default WatchlistPage
