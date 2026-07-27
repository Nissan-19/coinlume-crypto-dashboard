import React from "react"

function CoinMarkets({ markets }) {
  function formatCurrency(value) {
    const number = Number(value)

    if (!Number.isFinite(number)) {
      return "Not available"
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: number < 1 ? 6 : 2,
    }).format(number)
  }

  function formatDate(timestamp) {
    const number = Number(timestamp)

    if (!Number.isFinite(number)) {
      return "Not available"
    }

    /*
      CoinLore provides time in seconds.
      JavaScript requires milliseconds, so we multiply by 1000.
    */
    const date = new Date(number * 1000)

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <section>
      <article className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Markets
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Top five markets where this coin is traded
        </p>

        {markets.length === 0 ? (
          <p className="py-10 text-center text-slate-500 dark:text-slate-400">
            Market data is not available.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Exchange</th>
                  <th className="px-6 py-3">Pair</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">24h Volume</th>
                  <th className="px-6 py-3">Updated</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {markets.slice(0, 5).map((market, index) => (
                  <tr
                    key={`${market.name}-${market.base}-${market.quote}-${index}`}
                    className="text-sm text-slate-700 dark:text-slate-300"
                  >
                    <td className="px-6 py-4 font-medium">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {market.name || "Not available"}
                    </td>

                    <td className="px-6 py-4">
                      {market.base && market.quote
                        ? `${market.base}/${market.quote}`
                        : "Not available"}
                    </td>

                    <td className="px-6 py-4">
                      {formatCurrency(market.price_usd)}
                    </td>

                    <td className="px-6 py-4">
                      {formatCurrency(market.volume_usd)}
                    </td>

                    <td className="px-6 py-4">
                      {formatDate(market.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  )
}

export default CoinMarkets