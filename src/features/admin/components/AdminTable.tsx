'use client';

import { useTable } from '../hooks/useTable';
import { TableToolbar } from './TableToolbar';
import { DataTable } from './DataTable';
import { TablePagination } from './TablePagination';
import { ColumnDef } from '@tanstack/react-table';

interface AdminTable<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function AdminTable<TData>({
  columns,
  data,
}: AdminTable<TData>) {
  const state = useTable(data, columns);

  return (
    <div className="grid h-[80vh] grid-rows-[auto_1fr_auto] rounded-xl border border-[#939393]">
      <TableToolbar {...state} />
      <DataTable
        table={state.table}
        rows={state.paginatedRows}
        columnsLength={columns.length}
      />
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
