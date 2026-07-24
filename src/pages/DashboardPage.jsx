import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoins } from "../features/coins/coinsSlice"
import { fetchMarketData } from "../features/market/marketSlice"
import TopCryptocurrencies from "../component/TopCryptocurrencies"
import TopMarketCapShare from "../component/TopMarketCapShare"
import MarketStatCard from "../component/MarketStatCard"


function DashboardPage() {
  const dispatch = useDispatch()

  // coins data
  const apiStatus = useSelector((state) => state.coins.status)
  const apiCoins = useSelector((state) => state.coins.coins)

  const topCoins = apiCoins.slice(0, 5)

  useEffect(() => { //fetching coins data
    if (apiStatus === "idle") {
      dispatch(fetchCoins())
    }
  }, [apiStatus, dispatch])

  // global data
  const globalApiStatus = useSelector((state)=> state.marketData.status)
  const globalApiMarketData = useSelector((state)=>state.marketData.marketData)
  const globalApiError = useSelector((state)=>state.marketData.error)

  useEffect(()=>{
    if(globalApiStatus === "idle"){
      dispatch(fetchMarketData())
    }
  },[globalApiStatus, dispatch])


  const totalMcap = formatCompactCurrency(globalApiMarketData?.total_mcap) //?. optional chaining becasue in the beginning the global api returns null
  const mcapChange = formatPercentageChange(globalApiMarketData?.mcap_change) //because react runs the code before the api data exists
  const volume = formatCompactCurrency(globalApiMarketData?.total_volume) // so when it returns nullor undefined return undefined instead of crashing.
  const volumeChange =  formatPercentageChange(globalApiMarketData?.volume_change) //programme was crashing before
  const btcDominance = formatPercentage(globalApiMarketData?.btc_d)
  const ethDominance = formatPercentage(globalApiMarketData?.eth_d)
  const coinsCount = formatLargeNumber(globalApiMarketData?.coins_count)
  const activeMarkets = formatLargeNumber(globalApiMarketData?.active_markets)

  function formatCompactCurrency(value){
    return new Intl.NumberFormat("en-US",{
      style: "currency",
      currency: "USD",
      notation:"compact",
      maximumFractionDigits: 2,
    }).format(value)
  }

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

  const isMcapChangePositive = Number(globalApiMarketData?.mcap_change)>0 // for green and red sign on volume change
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
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

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

      
      

    </div>

  )
}

export default DashboardPage