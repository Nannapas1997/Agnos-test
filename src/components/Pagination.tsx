import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-1 md:gap-2 mt-6 md:mt-8 mb-4 px-4">
            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors ${currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-white/50'
                    }`}
            >
                <span className="hidden sm:inline">Prev</span>
                <span className="sm:hidden">‹</span>
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`min-w-[32px] md:min-w-[40px] h-[32px] md:h-[40px] rounded-lg text-xs md:text-sm font-medium transition-all ${page === currentPage
                        ? 'bg-[#FF8C44] text-white shadow-md'
                        : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors ${currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-white/50'
                    }`}
            >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">›</span>
            </button>
        </div>
    );
};

export default Pagination;
