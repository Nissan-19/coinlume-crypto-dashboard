import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoins } from '../features/coins/coinsSlice'
import { useNavigate } from 'react-router-dom'
import { Bookmark, BookmarkCheck} from 'lucide-react'
import { saveCoin, removeCoin } from '../features/watchlist/watchlistSlice'
import SearchSortControls from "../component/SearchSortControls"
import { formatCurrency } from "../utils/formatCurrency"
import PaginationControls from "../component/PaginationControls"


function CoinsPage  ()  {
  const apiCoins = useSelector((state)=>state.coins.coins)
  const apiStatus = useSelector((state)=>state.coins.status)
  const apiError = useSelector((state) => state.coins.error)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const coinIds = useSelector((state)=>state.savedCoins.coinIds)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortKey, setSortKey] = useState("rank")
  const [sortDirection, setSortDirection] = useState("asc")

  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency)
  const currencyRates = useSelector((state) => state.currency.rates)

  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

 
  useEffect(()=>{
    if(apiStatus === "idle"){
      dispatch(fetchCoins())
    }
  },[apiStatus, dispatch])

  const formatPercentage = (value) => {
    const number = Number(value)

    return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`
  }

  function handleWatchlistToggle(coinId){

    const currentCoinId = String(coinId)
    const isSaved = coinIds.includes(currentCoinId)

      if(isSaved){
        dispatch(removeCoin(currentCoinId))
      } else {
        dispatch(saveCoin(currentCoinId))
      }
  
     }

     const filteredCoins = apiCoins.filter((coin) => {
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

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      
      

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Top 50 Cryptocurrencies
        </h2>
        <p className='text-sm text-slate-900 dark:text-white'>
          ⓘ Showing the top 50 cryptocurrencies from CoinLore’s free market-data API.
        </p>   
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
                <th className="w-[12%] pl-4 py-4">Watchlist</th>
              </tr>
            </thead>

            <tbody>
              {filteredCoins.length > 0 ? (
                currentPageCoins.map((apiCoin) => {
                  const change1h = Number(apiCoin.percent_change_1h)
                  const change24h = Number(apiCoin.percent_change_24h)
                  const change7d = Number(apiCoin.percent_change_7d)
                  const isSaved = coinIds.includes(String(apiCoin.id))

                  return (
                    <tr
                      key={apiCoin.id}
                      onClick={() => navigate(`/coins/${apiCoin.id}`)}
                      className="cursor-pointer border-t border-slate-200 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4 font-medium">
                        #{apiCoin.rank}
                      </td>

                      <td className=" pl-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold dark:bg-slate-800">
                            {apiCoin.symbol.slice(0, 2)}
                          </div>

                          <div className='min-w-0'>
                            <p className="font-medium truncate text-slate-900 dark:text-white">
                              {apiCoin.name}
                            </p>

                            <p className="text-xs truncate uppercase text-slate-500">
                              {apiCoin.symbol}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        {formatCurrency(
                          apiCoin.price_usd,
                          selectedCurrency,
                          currencyRates,
                          true
                        )}
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
                        {formatCurrency(
                          apiCoin.market_cap_usd,
                          selectedCurrency,
                          currencyRates,
                          true
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {formatCurrency(
                          apiCoin.volume24,
                          selectedCurrency,
                          currencyRates,
                          true
                        )}
                      </td>

                      <td
                        className="px-12 py-4"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleWatchlistToggle(apiCoin.id)}
                        >
                          {isSaved ? (
                            <BookmarkCheck size={18} />
                          ) : (
                            <Bookmark size={18} />
                          )}
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
                    No coins found for “{searchTerm}”
                  </td>
                </tr>
              )}
            </tbody>
          </table>       
        </div>
      )}
        { sortedCoins.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />      
        )}
      </section>
      
  )
}

export default CoinsPage
