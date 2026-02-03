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
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
      initialState: {
      sorting: [{ id: columns[0].id ?? '', desc: false }],
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

  /* Sort Update */
  const processedRows = table.getRowModel().rows;

  const totalPages = Math.max(1, Math.ceil(processedRows.length / pageSize));

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = processedRows.slice(
    startIndex,
    startIndex + pageSize,
  );

  // Untuk UI ("1–10 of 42")
  const start =
    processedRows.length === 0 ? 0 : startIndex + 1;
  const end = Math.min(startIndex + pageSize, processedRows.length);

  // Reset page kalau state table berubah
  React.useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter, sorting, columnFilters, pageSize]);

  // Guard: jangan sampai page overflow
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);


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
    sortedRows: processedRows, 
    start,
    end,
    totalPages,
  };
}
