import { EventDetailResponse } from '@/lib/types/interface';
import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';

interface ColumnActions {
  onView?: (row: EventDetailResponse) => void
  onEdit?: (row: EventDetailResponse) => void
  onDelete?: (row: EventDetailResponse) => void
}

export function kegiatanColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<EventDetailResponse>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Judul' },
    { accessorKey: 'description', header: 'Deskripsi' },
    { accessorKey: 'type', header: 'Kategori' },
    { 
      accessorKey: "date", 
      header: "Tanggal", 
      cell: ({ row }) => {
        const data = row.original;
        return (
          <p>
            <span>{data.start}</span> sampai <span>{data.end}</span>
          </p>
        )
      }
    },
    {
      id: 'actions',
      header: 'Aksi',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <TableActionButtons
            onView={onView ? () => onView(data) : undefined}
            onEdit={onEdit ? () => onEdit(data) : undefined}
            onDelete={onDelete ? () => onDelete(data) : undefined}
          />
        );
      },
    },
  ];
}
