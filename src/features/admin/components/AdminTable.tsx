'use client';

import { useTable } from '../hooks/useTable';
import { TableToolbar } from './TableToolbar';
import { DataTable } from './DataTable';
import { TablePagination } from './TablePagination';
import { ColumnDef } from '@tanstack/react-table';
import { Spinner } from '@/components/ui/spinner';

interface AdminTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  loading?: boolean;
  error?: unknown;
  emptyMessage?: string;
}

export function AdminTable<TData>({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = 'Data tidak tersedia',
}: AdminTableProps<TData>) {
  const state = useTable(data, columns)
  const getErrorMessage = (err: unknown) => (err instanceof Error ? err.message : 'Terjadi kesalahan')

  return (
    <div className="flex flex-col rounded-xl border border-[#939393] h-full max-h-[80vh] overflow-hidden">
      {/* Toolbar */}
      <TableToolbar {...state} />

      {/* Table content */}
      <div className="relative flex-1 overflow-auto">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <Spinner className="h-12 w-12" />
          </div>
        )}

        {(!loading && !!error) && (
          <div className="flex h-full items-center justify-center text-red-500 text-sm p-4">
            {getErrorMessage(error)}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="flex h-full items-center justify-center text-gray-500 text-sm p-4">
            {emptyMessage}
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="min-w-full overflow-x-auto">
            <DataTable table={state.table} rows={state.paginatedRows} columnsLength={columns.length} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="shrink-0 overflow-x-auto p-2">
        <TablePagination
          pageSize={state.pageSize}
          setPageSize={state.setPageSize}
          currentPage={state.currentPage}
          setCurrentPage={state.setCurrentPage}
          start={state.start}
          end={state.end}
          total={state.sortedRows.length}
          totalPages={state.totalPages}
        />
      </div>
    </div>
  )
}
