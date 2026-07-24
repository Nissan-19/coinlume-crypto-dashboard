import React from 'react'

const MarketStatCard = ({title, value, smallText, isPositive }) => {
    const hasTrend = typeof isPositive ==="boolean"

    const smallTextColor = hasTrend
        ? isPositive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
            : "text-slate-600 dark:text-slate-300"
    
  return (
    <article className='h-full rounded-xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900'>
        
            
                <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                    {title}
                </p>
                <p className='mt-3 text-2xl font-bold text-slate-900 dark:text-white'>
                    {value} 
                </p>
                
                <p className={`mt-2 text-sm font-medium ${smallTextColor}`}>
                    {smallText}
                </p>
                
            

        

    </article>
  )
}

export default MarketStatCard
