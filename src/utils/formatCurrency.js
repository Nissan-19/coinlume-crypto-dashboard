export function formatCurrency(value, selectedCurrency, rates, compact = false) {

  const numericValue = Number(value)
  const rate = rates[selectedCurrency] || 1 
  const convertedValue = numericValue * rate

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: selectedCurrency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(convertedValue)
}