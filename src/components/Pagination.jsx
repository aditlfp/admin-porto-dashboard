
import React from "react";

export default function Pagination({ page, lastPage, onChange }) {
  if (!lastPage || lastPage <= 1) return null;

  const goTo = (p) => {
    if (p >= 1 && p <= lastPage && p !== page) onChange(p);
  };

  // Build page number display with ellipsis
  const generatePages = () => {
    let pages = [];
    
    // Always include first page
    if (page > 3) {
      pages.push(1);
      if (page > 4) pages.push("ellipsis-start");
    }
    
    // Pages around current page
    for (let p = page - 1; p <= page + 1; p++) {
      if (p >= 1 && p <= lastPage) {
        pages.push(p);
      }
    }
    
    // Always include last page
    if (page < lastPage - 2) {
      if (page < lastPage - 3) pages.push("ellipsis-end");
      pages.push(lastPage);
    }
    
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Prev Button */}
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-white font-medium transition-colors ${
          page === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        Prev
      </button>

      {/* Page Buttons */}
      {pages.map((p, index) =>
        p === "ellipsis-start" || p === "ellipsis-end" ? (
          <span key={index} className="px-3 py-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={index}
            onClick={() => goTo(p)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              page === p
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => goTo(page + 1)}
        disabled={page === lastPage}
        className={`px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-white font-medium transition-colors ${
          page === lastPage
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-50 hover:border-gray-400"
        }`}
      >
        Next
      </button>
    </div>
  );
}
