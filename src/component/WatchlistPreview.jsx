import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

function WatchlistPreview  () {
    const coinsIds = useSelector((state)=>state.savedCoins.coinIds)
    const coins = useSelector((state)=>state.coins.coins)

    const navigate = useNavigate()
    

    const visibleCoinIds = coinsIds.slice(-5) // Take only the last five saved coin IDs for the dashboard preview.
    const watchlistPreview = visibleCoinIds.map((savedId)=>
        // Convert each saved ID into its matching full coin object.
        coins.find((coin)=>String(coin.id) === String(savedId)))
    // Convert each saved ID into its matching full coin object.
    .filter(Boolean)
    // Remove undefined values when a matching coin cannot be found.

     const formatPrice = (value) => {
        return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        }).format(value)
    }
    
    
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            My Watchlist
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your five most recently saved coins
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/watchlist")}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
        >
          View All
        </button>
      </div>

      {watchlistPreview.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your watchlist is empty.
          </p>

          <button
            type="button"
            onClick={() => navigate("/coins")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Browse Coins
          </button>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {watchlistPreview.map((coin) => {
            const change24h = Number(coin.percent_change_24h)
            const isPositive = change24h >= 0

            return (
              <button
                key={coin.id}
                type="button"
                onClick={() => navigate(`/coins/${coin.id}`)}
                className="grid w-full grid-cols-[60px_1fr_auto_auto] items-center gap-2 px-4 py-2 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
              > 
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  #{coin.rank}
                </span>

                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {coin.name}
                  </p>

                  <p className="text-xs uppercase text-slate-500">
                    {coin.symbol}
                  </p>
                </div>

                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {formatPrice(coin.price_usd)}
                </span>

                <span
                  className={`text-sm font-medium ${
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {change24h.toFixed(2)}%
                </span>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default WatchlistPreview
