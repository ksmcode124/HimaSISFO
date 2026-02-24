import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminProkerRow } from '../../types';

interface ColumnActions {
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function prokerColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminProkerRow>[] {
  return [
    { accessorKey: 'id_proker', header: 'ID' },
    { accessorKey: 'nama_proker', header: 'Nama Proker' },
    { accessorKey: 'deskripsi', header: 'Deskripsi'},
    { accessorKey: 'foto_proker', header: 'Foto'},
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
