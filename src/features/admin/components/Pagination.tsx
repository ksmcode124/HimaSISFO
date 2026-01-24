import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useMemo } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pages = useMemo(
    () => getPaginationRange(totalPages, currentPage),
    [totalPages, currentPage],
  );

  // if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-1 text-sm">
      {/* First */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 text-neutral-200 hover:text-[#3385FF] disabled:opacity-50"
      >
        <ChevronsLeft className="h-8 w-8" />
      </button>

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-neutral-200 hover:text-[#3385FF] disabled:opacity-50"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span key={`e-${idx}`} className="px-2 text-[#BFBFBF]">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-md px-6 py-2 transition ${
              page === currentPage
                ? 'border-[#3385FF] border-2 text-[#3385FF] shadow'
                : 'hover:bg-[#3385FF] text-white'
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-neutral-400 hover:text-[#3385FF] disabled:opacity-50"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 text-neutral-400 hover:text-[#3385FF] disabled:opacity-50"
      >
        <ChevronsRight className="h-8 w-8" />
      </button>
    </div>
  );
};

function getPaginationRange(
  totalPages: number,
  currentPage: number,
  delta = 1,
): (number | 'ellipsis')[] {
  const range: (number | 'ellipsis')[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);

  if (left > 2) {
    range.push('ellipsis');
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push('ellipsis');
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}
