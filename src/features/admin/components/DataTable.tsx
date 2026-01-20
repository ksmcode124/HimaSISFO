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
    <div className="overflow-auto">
      <UiTable>
        <TableHeader className="bg-muted/60">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="[&>*:last-child]:text-center">
              {hg.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-5 py-4 text-lg font-bold uppercase"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length ? (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-5 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UiTable>
    </div>
  );
}
