import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoins } from '../features/coins/CoinsSlice'
import CoinOverview from '../component/CoinOverview'
import CoinInformation from "../component/CoinInformation"
import CoinPriceChart from "../component/CoinPriceChart"
import CoinMarkets from '../component/CoinMarkets'
import { saveCoin, removeCoin } from '../features/watchlist/watchlistSlice'


function CoinDetailsPage  ()  {
  const {id} = useParams()
  const dispatch = useDispatch()

  const coins = useSelector((state) => state.coins.coins)
  const status = useSelector((state) => state.coins.status)

  const coinIds = useSelector((state)=>state.savedCoins.coinIds)
  const currentCoinId = String(id) 
  const isSaved = coinIds.includes(currentCoinId)

  const [coinProfile, setCoinProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [priceHistory, setPriceHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [historyError, setHistoryError] = useState(null)
  const [selectedRange, setSelectedRange] = useState("7D")

  const [coinMarkets, setCoinMarkets] = useState([])
  const [marketsLoading, setMarketsLoading] = useState(true)
  const [marketsError, setMarketsError] = useState(null)



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

      } catch (requestError){
        console.error(requestError)
        setError("something went wrong")
      } finally{
        setIsLoading (false)
      }
      
    }

    async function fetchPriceHistory() {
      setHistoryLoading(true)
      setHistoryError(null)
      setPriceHistory([])

      try {
        const response = await fetch(
          `https://api.coinlore.net/api/coin/ohlcv/?coin=${id}`
        )
        
        if (!response.ok) {
          throw new Error("Failed to fetch price history")
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
      throw new Error("Invalid price history data")
        }

      const formattedHistory = data
        .map((candle) => {            
          const timestamp = candle[0] 
          const closePrice = candle[4]

          return {
            date: new Date(timestamp * 1000) 
              .toISOString()   
              .split("T")[0], 
            price: Number(closePrice),
            timestamp,
          }
        })
        .filter((item) => Number.isFinite(item.price)) 
        .sort((firstItem, secondItem) => { 
          return firstItem.timestamp - secondItem.timestamp
        })

      setPriceHistory(formattedHistory)
      } catch (requestError) {
        console.error(requestError)
        setHistoryError("Could not load price history.")
      } finally {
        setHistoryLoading(false)
      }
    }

    async function fetchMarkets() {
      setMarketsLoading(true)
      setMarketsError(null)

      try{
        const response = await fetch(`https://api.coinlore.net/api/coin/markets/?id=${id}`)

        if(!response.ok){
          throw new Error("Failed to fetch markets data")
        }
        
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error("Invalid markets data")
        }

        setCoinMarkets(data.slice(0, 5))

      } catch (requestError){
        console.error(requestError)
        setMarketsError("something went wrong")
      } finally{
        setMarketsLoading (false)
      }
      
    }

    useEffect(() => {
      fetchPriceHistory()
    }, [id])

      useEffect(()=>{
        fetchCoinProfile()
      }, [id])
        

  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchCoins())
    }
  },[status, dispatch])

    useEffect(() => {
    fetchMarkets()
  }, [id])

  const selectedCoin = coins.find((coin)=> coin.id === id)

  function handleRetry() {
      fetchCoinProfile()
      dispatch(fetchCoins())
   }

   function handleWatchlistToggle(){
    if(isSaved){
      dispatch(removeCoin(currentCoinId))
    } else {
      dispatch(saveCoin(currentCoinId))
    }

   }
 
  return (
  <div>
    {isLoading || status === "idle" || status === "loading" ? (
      <h1 className="px-6 py-8 text-center text-slate-500">
        Loading coin data.
      </h1>

    ) : error !== null || status === "failed" ? (
      <div className="px-6 py-8 text-center">
        <h1 className="text-slate-500">
          {error || "Failed to fetch coin data"}
        </h1>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>

    ) : coinProfile && selectedCoin ? (
      
      <div className="w-full space-y-4">
        <CoinOverview
          logo={coinProfile.logo}
          name={coinProfile.name}
          symbol={selectedCoin.symbol}
          rank={selectedCoin.rank}
          price={selectedCoin.price_usd}
          hrChange={selectedCoin.percent_change_1h}
          dayChange={selectedCoin.percent_change_24h}
          weekChange={selectedCoin.percent_change_7d}
          handleWatchlistToggle = {handleWatchlistToggle}
          isSaved={isSaved}
        />

        <CoinInformation
          marketCap={selectedCoin.market_cap_usd}
          volume24={selectedCoin.volume24}
          priceBtc={selectedCoin.price_btc}
          circulatingSupply={selectedCoin.csupply}
          totalSupply={selectedCoin.tsupply}
          maximumSupply={selectedCoin.msupply}

          ath={coinProfile.ath}
          athDate={coinProfile.ath_date}
          launchDate={coinProfile.startdate}
          firstPrice={coinProfile.first_price}
          firstPriceDate={coinProfile.first_price_date}
          platform={coinProfile.platform}
          website={coinProfile.website}
          explorer={coinProfile.explorer}
        />

        <CoinPriceChart
          coinName={coinProfile.name}
          priceHistory={priceHistory}
          historyLoading={historyLoading}
          historyError={historyError}
          selectedRange={selectedRange}
          onRangeChange={setSelectedRange}
          onRetry={fetchPriceHistory}
        />

        <CoinMarkets
          CoinMarkets markets={coinMarkets} 
          marketsLoading={marketsLoading}
          marketsError={marketsError}
          onRetry = {fetchMarkets}
          
        />

      </div>
    ) : (
      <p className="px-6 py-8 text-center text-slate-500">
        Coin not found.
      </p>
    )}
  </div>
)
}

export default CoinDetailsPage
