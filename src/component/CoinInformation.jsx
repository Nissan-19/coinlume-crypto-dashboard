import { formatCurrency } from "../utils/formatCurrency"
import { useSelector } from "react-redux"


function CoinInformation ({marketCap, volume24, priceBtc, circulatingSupply, totalSupply, maximumSupply, ath, athDate, launchDate, firstPrice, firstPriceDate, platform, website, explorer,}) {
 
  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency)
  const currencyRates = useSelector((state) => state.currency.rates)

  function hasValue(value) {
    return value !== null && value !== undefined && value !== ""
  }

  function formatNumber(value) {
    if (!hasValue(value)) {
      return "Not available"
    }

    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: Number(value) < 1 ? 6 : 2,
    }).format(Number(value))
  }

  function formatDate(value) {
    if (!hasValue(value)) {
      return "Not available"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) { 
      return value  
    } 
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  
  return (
  <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <article className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Market Statistics
      </h2>

      <div className="mt-5 space-y-4">
        <InformationRow 
          label="Market Cap"
          value={formatCurrency( marketCap, selectedCurrency, currencyRates, true)}
        />

        <InformationRow
          label="24h Trading Volume"
          value={formatCurrency(volume24,selectedCurrency, currencyRates, true)}
        />

        <InformationRow
          label="Price in Bitcoin"
          value={
            hasValue(priceBtc)
              ? `${formatNumber(priceBtc)} BTC`
              : "Not available"
          }
        />

        <InformationRow
          label="Circulating Supply"
          value={formatNumber(circulatingSupply)}
        />

        <InformationRow
          label="Total Supply"
          value={formatNumber(totalSupply)}
        />

        <InformationRow
          label="Maximum Supply"
          value={formatNumber(maximumSupply)}
        />
      </div>
    </article>

    <article className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Coin Profile
      </h2>

      <div className="mt-5 space-y-4">
        <InformationRow
          label="All-Time High"
          value={formatCurrency(ath,selectedCurrency, currencyRates, true)}
        />

        <InformationRow
          label="All-Time High Date"
          value={formatDate(athDate)}
        />

        <InformationRow
          label="Launch Date"
          value={formatDate(launchDate)}
        />

        <InformationRow
          label="First Recorded Price"
          value={formatCurrency(firstPrice, selectedCurrency, currencyRates, true)}
        />

        <InformationRow
          label="First Price Date"
          value={formatDate(firstPriceDate)}
        />

        <InformationRow
          label="Platform"
          value={hasValue(platform) ? platform : "Not available"}
        />

        <ExternalLinkRow
          label="Official Website"
          url={website}
        />

        <ExternalLinkRow
          label="Block Explorer"
          url={explorer}
        />
      </div>
    </article>
  </section>
)
}

function InformationRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="text-right text-sm font-medium text-slate-900 dark:text-slate-100">
        {value}
      </p>
    </div>
  )
}

function ExternalLinkRow({ label, url }) {
  function getLinkName(url) {
    try {
      return new URL(url).hostname.replace("www.", "")
    } catch {
      return "Open link"
    }
  }

  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 dark:border-slate-700">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </p>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-right text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {getLinkName(url)}
        </a>
      ) : (
        <p className="text-right text-sm font-medium text-slate-900 dark:text-slate-100">
          Not available
        </p>
      )}
    </div>
  )
}

export default CoinInformation