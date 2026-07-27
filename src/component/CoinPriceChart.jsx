import React from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts"

const RANGE_DAYS = {
  "7D": 7,
  "30D": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
}

function CoinPriceChart({ coinName, priceHistory, historyLoading, historyError, selectedRange, onRangeChange, onRetry }) {
  // Select only the number of days required by the active range.
  const numberOfDays = RANGE_DAYS[selectedRange]

  // slice() with a negative number selects items from the end of the array.
  // For example, slice(-7) returns the latest seven days.
  const visibleHistory = priceHistory.slice(-numberOfDays)

  function formatPrice(value) {
    const number = Number(value)

    if (!Number.isFinite(number)) {
      return "Not available"
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: number < 1 ? 4 : 2,
      maximumFractionDigits: number < 1 ? 8 : 2,
    }).format(number)
  }

  function formatYAxisPrice(value) {
    const number = Number(value)

    if (number >= 1000) {
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(number)
    }

    if (number < 1) {
      return number.toFixed(4)
    }

    return number.toFixed(2)
  }

  function formatAxisDate(value) {
    const date = new Date(`${value}T00:00:00`)

    if (selectedRange === "1Y") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      })
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  function formatTooltipDate(value) {
    const date = new Date(`${value}T00:00:00`)

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {coinName} Price History
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Daily closing price in USD
            <p className="py-3">
               ⓘ Educational chart only. CoinLore’s historical price data may not match current or verified market prices.
            </p>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.keys(RANGE_DAYS).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => onRangeChange(range)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                selectedRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {historyLoading ? (
        <p className="py-24 text-center text-slate-500 dark:text-slate-400">
          Loading price history...
        </p>
      ) : historyError ? (
        <div className="py-20 text-center">
          <p className="text-red-600 dark:text-red-400">
            {historyError}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : visibleHistory.length === 0 ? (
        <p className="py-24 text-center text-slate-500 dark:text-slate-400">
          Price history is not available.
        </p>
      ) : (
        <div className="mt-6 h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visibleHistory}
              margin={{
                top: 10,
                right: 20,
                bottom: 10,
                left: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickFormatter={formatAxisDate}
                minTickGap={30}
              />

              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={formatYAxisPrice}
                width={70}
              />

              <Tooltip
                labelFormatter={formatTooltipDate}
                formatter={(value) => [
                  formatPrice(value),
                  "Close price",
                ]}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default CoinPriceChart