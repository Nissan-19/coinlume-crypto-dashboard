import { Bookmark, BookmarkCheck } from "lucide-react"
import { formatCurrency } from "../utils/formatCurrency"
import { useSelector } from "react-redux"

function CoinOverview ({logo, name, symbol, rank, price, hrChange, dayChange, weekChange, handleWatchlistToggle, isSaved}) {
  
    const selectedCurrency = useSelector((state) => state.currency.selectedCurrency)
    const currencyRates = useSelector((state) => state.currency.rates)

     function formatChange(value) {
        if (value === null || value === undefined || value === "") {
        return "Not available"
        }

        const number = Number(value)
        const positiveSign = number > 0 ? "+" : ""

        return `${positiveSign}${number.toFixed(2)}%`
    }

    function changeColor(value) {
        return Number(value) >= 0
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-red-600 dark:text-red-400"
    }


    return (
    <article className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-12 w-12 rounded-full object-contain"
          />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {name}
              </h1>

              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {symbol}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Rank #{rank}
            </p>
          </div>
        </div>

        

        <div className="flex flex-col gap-4 sm:items-end">
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-500 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-800"
                onClick = {handleWatchlistToggle}
            >
              {isSaved? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
               
            </button>

            <div className="sm:text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                Current price
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(price, selectedCurrency, currencyRates, true)}
                </p>
            </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            1 hour
          </p>

          <p className={`mt-1 font-semibold ${changeColor(hrChange)}`}>
            {formatChange(hrChange)}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            24 hours
          </p>

          <p className={`mt-1 font-semibold ${changeColor(dayChange)}`}>
            {formatChange(dayChange)}
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            7 days
          </p>

          <p className={`mt-1 font-semibold ${changeColor(weekChange)}`}>
            {formatChange(weekChange)}
          </p>
        </div>
      </div>
    </article>
  )
}

export default CoinOverview
