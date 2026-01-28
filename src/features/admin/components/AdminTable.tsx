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
  const state = useTable(data, columns);
  const getErrorMessage = (err: unknown) => err instanceof Error ? err.message : 'Terjadi kesalahan'


  return (
    <div className="grid h-[80vh] grid-rows-[auto_1fr_auto] rounded-xl border border-[#939393]">
      <TableToolbar {...state} />

      {/* CONTENT */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <Spinner className='size-12' />
          </div>
        )}

        {!loading && !(!error) && (
          <div className="flex h-full items-center justify-center text-red-500 text-sm">
            {getErrorMessage(error)}
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            {emptyMessage}
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <DataTable
            table={state.table}
            rows={state.paginatedRows}
            columnsLength={columns.length}
          />
        )}
      </div>

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
  );
}
