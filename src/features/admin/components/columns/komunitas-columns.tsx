import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminKomunitasRow } from '../../types';

interface ColumnActions {
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function komunitasColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminKomunitasRow>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'nama_komunitas', header: 'Nama Anggota' },
    { accessorKey: 'foto_komunitas', header: 'Foto'},
    { accessorKey: 'pencapaian', header: 'Pencapaian'},
    { accessorKey: 'foto_pencapaian', header: 'Foto Pencapaian'},
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
