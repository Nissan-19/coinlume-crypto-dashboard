
function PaginationControls({ currentPage, totalPages, onPageChange,}) {
  return (
    
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
      
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
      >
        Previous
      </button>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Page {currentPage} of {totalPages}
      </p>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
      >
        Next
      </button>

    </div>
  )
}

export default PaginationControls