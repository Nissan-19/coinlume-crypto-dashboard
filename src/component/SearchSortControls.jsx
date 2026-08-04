import { ArrowDown, ArrowUp, Search } from "lucide-react"

function SearchSortControls  ({searchTerm, sortKey, sortDirection, onSearchChange, onSortChange, onDirectionChange})  {
  return (
    
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
      
      <div className="relative w-full sm:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search ..."
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-coins"
          className="text-sm text-slate-500 dark:text-slate-400"
        >
          Sort by
        </label>

        <select
          id="sort-coins"
          value={sortKey}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="rank">Rank</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="change24h">24h Change</option>
          <option value="marketCap">Market Cap</option>
          <option value="volume">Volume</option>
        </select>

        <button
          type="button"
          onClick={onDirectionChange}
          aria-label={`Sort ${
            sortDirection === "asc" ? "descending" : "ascending"
          }`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {sortDirection === "asc" ? (
            <>
              <ArrowUp size={16} />
              Asc
            </>
          ) : (
            <>
              <ArrowDown size={16} />
              Desc
            </>
          )}
        </button>
      </div>
    </div>
  
  )
}

export default SearchSortControls
