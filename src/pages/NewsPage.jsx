import newsData from "../data/newsData"

function NewsPage() {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date))
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Crypto News
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          These are static educational sample articles created for CoinLume. They are not fetched from a live news API and may not reflect current market events. 
          Verify important information using reliable, up-to-date sources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {newsData.map((article) => {
          return (
            <article
              key={article.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                className="h-52 w-full object-cover"
              />

              <div className="space-y-4 p-6">
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

                <p className="border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  Source: {article.source}
                </p>
              </div>
            </article>
          )
        })}
      </div>

    </section>
  )
}

export default NewsPage