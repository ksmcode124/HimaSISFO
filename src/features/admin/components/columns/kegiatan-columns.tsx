import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminEventRow } from '../../types';

interface ColumnActions {
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function kegiatanColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminEventRow>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Judul' },
    { accessorKey: 'description', header: 'Deskripsi' },
    // {
    //   accessorKey: 'type',
    //   header: 'Kategori',
    //   meta: {
    //     filterable: true,
    //     label: 'Kategori',
    //     filterType: 'checkbox',
    //   },
    //   filterFn: (row, columnId, filterValue: string[]) => {
    //     if (!filterValue?.length) return true;
    //     return filterValue.includes(row.getValue(columnId));
    //   },
    // },
    { accessorKey: 'start', header: 'Tanggal Mulai' },
    { accessorKey: 'end', header: 'Tanggal Selesai' },
    {
      id: 'actions',
      header: 'Aksi',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <TableActionButtons
            onView={onView ? () => onView(data.id) : undefined}
            onEdit={onEdit ? () => onEdit(data.id) : undefined}
            onDelete={onDelete ? () => onDelete(data.id) : undefined}
          />
        );
      },
    },
  ];
}
