'use client';

import * as React from 'react';
import {
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

export function useTable<TData>(
  data: TData[],
  columns: ColumnDef<TData>[],
) {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  /* ================= TABLE ================= */
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  /* ================= PAGINATION ================= */
  const sortedRows = table.getSortedRowModel().rows;
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedRows = sortedRows.slice(start, end);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter, sorting, pageSize]);

  return {
    table,

    globalFilter,
    setGlobalFilter,

    sorting,
    setSorting,

    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,

    paginatedRows,
    sortedRows,
    start,
    end,
    totalPages,
  };
}
