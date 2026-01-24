'use client';

import * as React from 'react';
import {
  SortingState,
  ColumnFiltersState,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table';

export function useTable<TData>(
  data: TData[],
  columns: ColumnDef<TData>[],
) {
  /* ================= STATE ================= */
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  /* ================= TABLE ================= */
  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      sorting,
      columnFilters,
    },

    enableColumnFilters: true,

    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  /* ================= PAGINATION ================= */
  const sortedRows = table.getSortedRowModel().rows;
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedRows = sortedRows.slice(start, end);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter, sorting, columnFilters, pageSize]);

  return {
    table,

    globalFilter,
    setGlobalFilter,

    sorting,
    setSorting,

    columnFilters,
    setColumnFilters,

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
