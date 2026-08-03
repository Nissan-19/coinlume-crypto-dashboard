export function formatCurrency(value, selectedCurrency, rates, compact = false) {
  /*
  value:  the USD number we want to convert
  selectedCurrency: "USD", "EUR", "GBP", or "INR"
  rates: the exchange-rate object from Redux
  compact: whether to show a shortened number like 2.4B 
  */
  const numericValue = Number(value)
    //value is the original USD value from CoinLore:
  const rate = rates[selectedCurrency] || 1 //That 1 is just a safe fallback so the calculation doesn’t break.
    //if the selected currency somehow has no rate use 1
  const convertedValue = numericValue * rate

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: selectedCurrency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(convertedValue)
}