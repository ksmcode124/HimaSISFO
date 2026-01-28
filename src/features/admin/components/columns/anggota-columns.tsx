import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import Link from 'next/link';
import { AdminAnggotaRow } from '../../types';

interface ColumnActions {
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function anggotaColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminAnggotaRow>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'nama_anggota', header: 'Nama Anggota' },
    { accessorKey: 'kabinet', header: 'Kabinet'},
    { accessorKey: 'jabatan', header: 'Jabatan'},
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
