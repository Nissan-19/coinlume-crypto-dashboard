import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoins } from '../features/coins/coinsSlice'
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
  const currentCoinId = String(id) //It converts id into a string. We do this because your saved IDs in Redux may be strings, and includes() compares values strictly.
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
        //the api provides data on the object 0th index

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

      /*
        CoinLore returns an array of daily records.

        Each record contains:

        [
          timestamp,
          open,
          high,
          low,
          close,
          volume
        ]

        We use:
        - index 0 for the date
        - index 4 for the closing price
      */
      const formattedHistory = data
        .map((candle) => {            //API gives data as an arrys of too many records but recharts works conviently on objects having date and price
          const timestamp = candle[0] //goes through every candle and creates a new object. So this code changes the API data into the shape our graph needs.
          const closePrice = candle[4] //map() goes through every candle and creates a new object. with time stap and closeprice

          return {
            date: new Date(timestamp * 1000) //CoinLore gives timestamps in seconds. JavaScript expects timestamps in milliseconds.
              .toISOString()    //This creates something like: 2026-07-20T00:00:00.000Z
              .split("T")[0], 
                /* This splits the string into:
                [
                  "2026-07-20",                 Then [0] selects only:2026-07-20
                  "00:00:00.000Z"
                ]
                */
            price: Number(closePrice),
            timestamp,
          }
        })
        .filter((item) => Number.isFinite(item.price)) //This removes any item whose price is not a valid number. this check Is this price a real JavaScript number that the graph can safely use?
        .sort((firstItem, secondItem) => { //This sorts the dates from oldest to newest.
          return firstItem.timestamp - secondItem.timestamp//sort the negative value first and the increasing
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

  // Fetch new historical data whenever the coin ID changes.
    useEffect(() => {
      fetchPriceHistory()
    }, [id])

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

  useEffect(()=>{
    if(status === "idle"){
      dispatch(fetchCoins())
    }
  },[status, dispatch])

    useEffect(() => {
    fetchMarkets()
  }, [id])

  const selectedCoin = coins.find((coin)=> coin.id === id)

  // Retry both API requests:
// 1. Fetch the page-specific coin profile again.
// 2. Fetch the shared list of coins again through Redux.
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
      /* Show the error state when either API request fails. */
      <div className="px-6 py-8 text-center">
        <h1 className="text-slate-500">
          {error || "Failed to fetch coin data"}
        </h1>

        {/* Retry both the profile request and the Redux coins request. */}
        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>

    ) : coinProfile && selectedCoin ? (
      /*
        Render the page only after both objects contain data.

        coinProfile contains the extra profile information
        fetched specifically for this page.

        selectedCoin contains the market information
        found inside the shared Redux coins array.
      */
      <div className="w-full space-y-4">
        <CoinOverview
          // These values are passed directly into CoinOverview as props.
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
          // Market values come from the selected coin in Redux.
          marketCap={selectedCoin.market_cap_usd}
          volume24={selectedCoin.volume24}
          priceBtc={selectedCoin.price_btc}
          circulatingSupply={selectedCoin.csupply}
          totalSupply={selectedCoin.tsupply}
          maximumSupply={selectedCoin.msupply}

          // Profile values come from the page-specific profile API request.
          ath={coinProfile.ath}
          athDate={coinProfile.ath_date}
          launchDate={coinProfile.startdate}
          firstPrice={coinProfile.first_price}
          firstPriceDate={coinProfile.first_price_date}
          platform={coinProfile.platform}
          website={coinProfile.website}
          explorer={coinProfile.explorer}
        />

        {/* Pass the historical data and chart controls into CoinPriceChart. */}
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
          
        /*
          Why pass only markets={coinMarkets}. Because coinMarkets is already an array containing all five market objects.
          {
            name: "Binance",
            base: "BTC",
            quote: "USDT",
            price_usd: 118000
          },
          So, Instead of passing each field separately. we pass the complete array once. Then CoinMarkets loops over it:
          */
        />

      </div>
    ) : (
      /* This runs when loading is finished but the requested coin does not exist. */
      <p className="px-6 py-8 text-center text-slate-500">
        Coin not found.
      </p>
    )}
  </div>
)
}

export default CoinDetailsPage
