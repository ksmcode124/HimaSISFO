import { KabinetListItem } from '@/lib/types/interface';
import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';

interface ColumnActions {
  onView?: (row: KabinetListItem) => void
  onEdit?: (row: KabinetListItem) => void
  onDelete?: (row: KabinetListItem) => void
}

export function kabinetColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<KabinetListItem>[] {
  return [
    { accessorKey: 'id_kabinet', header: 'ID Kabinet' },
    { accessorKey: 'tahun_kerja', header: 'Tahun' },
    { accessorKey: 'nama_kabinet', header: 'Nama Kabinet' },
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
