import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoins } from "../features/coins/CoinsSlice"
import TopCryptocurrencies from "../component/TopCryptocurrencies"
import MarketDistributionChart from "../component/TopMarketCapShare"


function DashboardPage() {
  const dispatch = useDispatch()

  const apiStatus = useSelector((state) => state.coins.status)
  const apiCoins = useSelector((state) => state.coins.coins)

  const topCoins = apiCoins.slice(0, 5)

  useEffect(() => {
    if (apiStatus === "idle") {
      dispatch(fetchCoins())
    }
  }, [apiStatus, dispatch])

  return (
    <div className="space-y-6">

      <MarketDistributionChart
        coins={apiCoins}
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