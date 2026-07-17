import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency } from '../features/currency/currencySlice'

function Header  ()  {
    const currentLocation = useLocation() //React Router hook. It gives us information about the current URL.
    const {displayName} = useAuth()

    let pageTitle = "Dashboard"

    const selectedCurrency = useSelector(
        (state)=>state.currency.selectedCurrency
    )

    const dispatch = useDispatch()

    function handleCurrencyChange(event){
        const newCurrency = event.target.value

        dispatch(changeCurrency(newCurrency))
        localStorage.setItem("coinlume_currency", newCurrency)
    }
   
    if (currentLocation.pathname === "/coins") {
        pageTitle = "Coins"
    } else if (currentLocation.pathname === "/watchlist") {
        pageTitle = "Watchlist"
    } else if (currentLocation.pathname === "/news") {
        pageTitle = "News"
    } else if (currentLocation.pathname.startsWith("/coins/")) {
        pageTitle = "Coin Details"
    }

  return (
    <header className="flex items-center justify-between border-b px-6 py-4 dark:border-slate-800">
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>

         
        <div className="flex items-center gap-4">
        <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
           className="rounded-lg border px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        >        
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
        </select>

        <p>
            Welcome, <span className="font-medium">{displayName}</span>
        </p>
        </div>
    </header>
  )
}

export default Header
