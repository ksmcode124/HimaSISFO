'use client'
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { flexRender, Table as ReactTable, Row } from '@tanstack/react-table';

interface DataTableProps<TData> {
  table: ReactTable<TData>;
  rows: Row<TData>[];
  columnsLength: number;
}

export function DataTable<TData>({
  table,
  rows,
  columnsLength,
}: DataTableProps<TData>) {
  return (
    <div className="overflow-x-auto">
      <UiTable className="min-w-full">
        <TableHeader className="bg-[#EAEAEA]">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="[&>*:last-child]:text-center border-[#939393]">
              {hg.headers.map((header, i) => {
                const isLast = i === hg.headers.length - 1
                return (
                  <TableHead
                    key={header.id}
                    className={`px-5 py-4 text-sm font-regular uppercase text-black ${
                      isLast ? 'sticky right-0 bg-[#EAEAEA] z-20' : ''
                    }`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={row.id} className="border-[#939393]">
                {row.getVisibleCells().map((cell, i) => {
                  const isLast = i === row.getVisibleCells().length - 1
                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-5 py-4 ${isLast ? 'sticky right-0 bg-white z-10 text-center' : ''}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-[#939393]">
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UiTable>
    </div>
  )
}