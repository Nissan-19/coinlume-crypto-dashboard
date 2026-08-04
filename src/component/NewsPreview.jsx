import newsData from '../data/newsData'
import { useNavigate } from 'react-router-dom'

function NewsPreview  ()  {

    const navigate= useNavigate()
    const newsPreview = newsData.slice(0,3)

    
    const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date))
  }
  return (
    <section className='h-full mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900'>
        <div className='mx-3 flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-slate-900 dark:text-white'>
                Crypto Insights</h1>

            <button
            type="button"
            onClick={() => navigate("/news")}
            className=" text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
            >
            View All
            </button>
        </div >
        

        <div className='flex flex-row m-4 gap-6' >
            
            {newsPreview.map((article)=>{
                return(
                    
                    <article
                        key = {article.id}
                        className='overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'>
                    
                        <img src={article.image} 
                             alt={article.imageAlt}
                             className='h-45 w-full object-cover' />

                        <div className='space-y-4 p-6'>
            <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    {article.category}
                  </span>

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {article.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {article.summary}
                  </p>
                </div>
        </div>
                    </article>
                )
            })}
        

        
        </div>
    </section>
  )
}

export default NewsPreview
