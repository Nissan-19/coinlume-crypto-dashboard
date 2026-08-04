
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoins } from '../features/coins/coinsSlice'
import { useNavigate } from 'react-router-dom'
import { BookmarkCheck } from 'lucide-react'
import {removeCoin} from '../features/watchlist/watchlistSlice'
import SearchSortControls from "../component/SearchSortControls"
import { formatCurrency } from "../utils/formatCurrency"
import PaginationControls from "../component/PaginationControls"

function WatchlistPage () {
  const coinIds = useSelector((state)=>state.savedCoins.coinIds)
  const coins = useSelector((state)=>state.coins.coins)
  const coinsStatus = useSelector((state)=>state.coins.status)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState("rank")
  const [sortDirection, setSortDirection] = useState("asc")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency)
  const currencyRates = useSelector((state) => state.currency.rates)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=>{
      if(coinsStatus === "idle"){
        dispatch(fetchCoins())
      }
    },[coinsStatus, dispatch])

  const filteredWatchlist = coins.filter((coin)=>coinIds.includes(String(coin.id)))

  const formatPercentage = (value) => {
    const number = Number(value)

    return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`
  }

  function handleRemoveFromWatchlist(coinId){
  
      const currentCoinId = String(coinId)
          dispatch(removeCoin(currentCoinId))            
  }

  const filteredCoins = filteredWatchlist.filter((coin) => {
      const searchValue = searchTerm.toLowerCase().trim()

      const coinName = coin.name.toLowerCase()

      return (
        coinName.includes(searchValue) 
      )
  })

  const sortedCoins = [...filteredCoins].sort((a,b)=>{ 
      if(sortKey === "rank"){
        if(sortDirection === "asc"){
          return Number(a.rank) - Number(b.rank) 
        } else {
          return Number(b.rank) - Number(a.rank)
        }
      }

      if(sortKey === "price"){
        if(sortDirection === "asc"){
          return Number(a.price_usd) - Number(b.price_usd)
        } else {
          return Number(b.price_usd) - Number(a.price_usd)
        }
      }

      if(sortKey === "change24h"){
        if(sortDirection === "asc"){
          return Number(a.percent_change_24h) - Number(b.percent_change_24h)
        } else {
          return Number(b.percent_change_24h) - Number(a.percent_change_24h)
        }
      }

      if(sortKey === "marketCap"){
        if(sortDirection === "asc"){
          return Number(a.market_cap_usd) - Number(b.market_cap_usd)
        } else {
          return Number(b.market_cap_usd) - Number(a.market_cap_usd)
        }
      }

      if(sortKey === "volume"){
        if(sortDirection === "asc"){
          return Number(a.volume24) - Number(b.volume24)
        } else {
          return Number(b.volume24) - Number(a.volume24)
        }
      }

      if (sortKey === "name") {
        if (sortDirection === "asc") {
          return a.name.localeCompare(b.name) 
        } else {
          return b.name.localeCompare(a.name)
        }
      }


      return 0
    })

    const itemsPerPage = 10
    const totalPages = Math.ceil(sortedCoins.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageCoins = sortedCoins.slice(startIndex,endIndex)

    function handleSearchChange(event) {
      setSearchTerm(event.target.value)
      setCurrentPage(1)
    }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900" >
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
          <SearchSortControls
            searchTerm={searchTerm}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSearchChange={setSearchTerm}
            onSortChange={setSortKey}
            onDirectionChange={() =>setSortDirection((currentDirection) =>
                currentDirection === "asc" ? "desc" : "asc")
          }/>

          <table className="w-full table-fixed min-w-225 text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="w-[6%] pl-5 py-4">Rank</th>
                <th className="w-[20%] pl-20 py-4">Coin</th>
                <th className="w-[11%] pl-8 py-4">Price</th>
                <th className="w-[10%] pl-8 py-4">1h</th>
                <th className="w-[10%] pl-8 py-4">24h</th>
                <th className="w-[10%] pl-8 py-4">7d</th>
                <th className="w-[12%] pl-5 py-4">Market Cap</th>
                <th className="w-[12%] pl-3 py-4">Volume 24h</th>
                <th className="w-[12%] px-6 py-4">Remove</th>
              </tr>
            </thead>

            <tbody>
              {filteredCoins.length > 0 ? (
                currentPageCoins.map((coin) => {
                  const change1h = Number(coin.percent_change_1h)
                  const change24h = Number(coin.percent_change_24h)
                  const change7d = Number(coin.percent_change_7d)

                  return (
                    <tr
                      key={coin.id}
                      onClick={() => navigate(`/coins/${coin.id}`)}
                      className="cursor-pointer border-t border-slate-200 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4 font-medium">
                        #{coin.rank}
                      </td>

                      <td className="pl-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold dark:bg-slate-800">
                            {coin.symbol.slice(0, 2)}
                          </div>

                          <div>
                            <p className="font-medium truncate text-slate-900 dark:text-white">
                              {coin.name}
                            </p>

                            <p className="text-xs truncate uppercase text-slate-500">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {formatCurrency(
                          coin.price_usd,
                          selectedCurrency,
                          currencyRates
                        )}                        
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
                        {formatCurrency(
                          coin.market_cap_usd,
                          selectedCurrency,
                          currencyRates,
                          true
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {formatCurrency(
                          coin.volume24,
                          selectedCurrency,
                          currencyRates,
                          true
                        )}
                      </td>

                      <td
                        className="px-12 py-4"
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveFromWatchlist(coin.id)}
                        >
                          <BookmarkCheck size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    No watchlist coins found for “{searchTerm}”
                  </td>
                </tr>
              )}
            </tbody>
            </table>                   
            </div>
      ))}
          { sortedCoins.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handleSearchChange}
        />      
        )}
    </div>
  )
}

export default WatchlistPage
