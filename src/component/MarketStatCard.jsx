import React from 'react'

const MarketStatCard = ({title, value, smallText }) => {
    
  return (
    <section className=' overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900'>
        <div className=' min-w-150 grid-cols-5 gap-3'>
            <article className='rounded-lg  border border-slate-200 p-4 dark:border-slate-800'>
                <p className='mt-4 text-xl font-semibold text-slate-900 dark:text-white'>
                    {title}
                </p>
                <p className='mt-4 text-xl font-semibold text-slate-900 dark:text-white'>
                    {value} {smallText}
                </p>
                
            </article>

        </div>

    </section>
  )
}

export default MarketStatCard
