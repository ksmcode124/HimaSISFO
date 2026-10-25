import { Pagination } from './Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  pageSize: number;
  currentPage: number;
  start: number;
  end: number;
  total: number;
  totalPages: number;
  setPageSize: (pageSize: number) => void;
  setCurrentPage: (currentPage: number) => void;
}

export function TablePagination({
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  start,
  end,
  total,
  totalPages,
}: PaginationProps) {
  const hasData = total > 0;

  return (
    <div className="flex items-center justify-between gap-4 p-4">
      {/* PAGE SIZE */}
      <div className="flex items-center gap-2 text-xs">
        Show
        <Select
          value={String(pageSize)}
          onValueChange={(v) => setPageSize(Number(v))}
        >
          <SelectTrigger className="h-8 w-17.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* RANGE + PAGINATION */}
      <div className="flex items-center gap-6">
        <span className="text-xs">
          {hasData ? `${start}-${end}` : '0'} of {total}
        </span>

        {hasData && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
