const MARKET_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b",
  "#22c55e",
]

function formatMarketCap(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)
}

function topMarketCapShare({ coins = [] }) {
  const topCoins = coins.slice(0, 5)

  const totalTopFiveMarketCap = topCoins.reduce((total, coin) => {
    return total + Number(coin.market_cap_usd || 0)
  }, 0)

  const marketShareData = topCoins.map((coin, index) => {
    const marketCap = Number(coin.market_cap_usd || 0)

    const percentage =
      totalTopFiveMarketCap > 0
        ? (marketCap / totalTopFiveMarketCap) * 100
        : 0

    return {
      id: coin.id,
      name: coin.name,
      percentage,
      color: MARKET_COLORS[index],
    }
  })

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Top 5 Market Cap Share
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Distribution among the five largest cryptocurrencies
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Combined market cap
          </p>

          <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
            {formatMarketCap(totalTopFiveMarketCap)}
          </p>
        </div>
      </div>

      {marketShareData.length === 0 ? (
        <p className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
          Loading market data...
        </p>
      ) : (
        <div className="px-6 py-6">
          <div className="flex h-6 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            {marketShareData.map((coin) => (
              <div
                key={coin.id}
                title={`${coin.name}: ${coin.percentage.toFixed(1)}%`}
                className="h-full transition-all duration-500"
                style={{
                  width: `${coin.percentage}%`,
                  backgroundColor: coin.color,
                }}
              />
            ))}
          </div>

          <div className="mt-6 overflow-x-auto">
  <div className="grid min-w-150 grid-cols-5 gap-3">
    {marketShareData.map((coin, index) => (
      <article
        key={coin.id}
        className="rounded-lg border border-slate-200 p-4 dark:border-slate-800"
      >
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{
              backgroundColor: coin.color,
            }}
          >
            {index + 1}
          </div>

          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            {coin.percentage.toFixed(1)}%
          </span>
        </div>

        <p className="mt-4 font-semibold text-slate-900 dark:text-white">
          {coin.name}
        </p>
      </article>
    ))}
  </div>
</div>
        </div>
      )}
    </section>
  )
}

export default topMarketCapShare