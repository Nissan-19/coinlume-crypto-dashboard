import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoins } from "../features/coins/CoinsSlice"
import { fetchMarketData } from "../features/market/marketSlice"
import TopCryptocurrencies from "../component/TopCryptoCurrencies"
import TopMarketCapShare from "../component/TopMarketCapShare"
import MarketStatCard from "../component/MarketStatCard"
import WatchlistPreview from "../component/WatchlistPreview"
import NewsPreview from "../component/NewsPreview"
import { formatCurrency } from "../utils/formatCurrency"


function DashboardPage() {
  const dispatch = useDispatch()

  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency)
  const currencyRates = useSelector((state) => state.currency.rates)

  const apiStatus = useSelector((state) => state.coins.status)
  const apiCoins = useSelector((state) => state.coins.coins)

  const topCoins = apiCoins.slice(0, 5)

  useEffect(() => {
    if (apiStatus === "idle") {
      dispatch(fetchCoins())
    }
  }, [apiStatus, dispatch])

  const globalApiStatus = useSelector((state)=> state.marketData.status)
  const globalApiMarketData = useSelector((state)=>state.marketData.marketData)
  const globalApiError = useSelector((state)=>state.marketData.error)

  useEffect(()=>{
    if(globalApiStatus === "idle"){
      dispatch(fetchMarketData())
    }
  },[globalApiStatus, dispatch])


  const totalMcap = formatCurrency(globalApiMarketData?.total_mcap,selectedCurrency,currencyRates,true) 
  const mcapChange = formatPercentageChange(globalApiMarketData?.mcap_change) 
  const volume = formatCurrency(globalApiMarketData?.total_volume, selectedCurrency, currencyRates,true) 
  const volumeChange =  formatPercentageChange(globalApiMarketData?.volume_change) 
  const btcDominance = formatPercentage(globalApiMarketData?.btc_d)
  const ethDominance = formatPercentage(globalApiMarketData?.eth_d)
  const coinsCount = formatLargeNumber(globalApiMarketData?.coins_count)
  const activeMarkets = formatLargeNumber(globalApiMarketData?.active_markets)


  function formatLargeNumber(value) {
  if (value == null) return "--"

  return new Intl.NumberFormat("en-US").format(value)
  }

  function formatPercentageChange(value){
    const number = Number(value)
    return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`
  }

  function formatPercentage(value) {
    const number = Number(value)
    return `${number.toFixed(2)}%`
  }

  const isMcapChangePositive = Number(globalApiMarketData?.mcap_change)>0 
  const isVolumeChangePositive = Number(globalApiMarketData?.volume_change)>0
  

  return (
    <div className="space-y-6">

      {globalApiStatus === "idle" || globalApiStatus=== "loading" ?(
        <h1>Loading the Market Data</h1>
        ):globalApiStatus === "failed" ?(
         <div> 
            <h2>Failed to load data {globalApiError}</h2>
            <button
              onClick={()=>dispatch(fetchMarketData())}></button>
          </div>
        ):(
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

              <MarketStatCard
                title = "Total Market Cap"
                value={totalMcap}
                smallText={`${mcapChange} in 24h`}
                isPositive={isMcapChangePositive}
                />

                <MarketStatCard
                  title ="24h Trading Volume"
                  value = {volume}
                  smallText={`${volumeChange} in 24h`}
                  isPositive={isVolumeChangePositive}/>

                <MarketStatCard
                  title ="Bitcoin Dominance"
                  value = {btcDominance}
                  smallText={`ETH Dominance ${ethDominance}`}/>

                <MarketStatCard
                  title ="Tracked Cryptocurrencies"
                  value = {coinsCount}
                  smallText={`${activeMarkets} active markets`}/>
            </div>

            <WatchlistPreview />

          </div>
        ) 
        }

        
        
      <TopMarketCapShare
        topCoins={topCoins}
        apiStatus={apiStatus}
      />

      <TopCryptocurrencies
        apiStatus={apiStatus}
        topCoins={topCoins}
        onRetry={() => dispatch(fetchCoins())}
      />

      <NewsPreview/>
      
      

    </div>

  )
}

export default DashboardPage