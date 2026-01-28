import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminKabinetRow } from '../../types';
import Link from 'next/link';

interface ColumnActions {
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function kabinetColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminKabinetRow>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'tahun_kerja', header: 'Tahun' },
    { accessorKey: 'nama_kabinet', header: 'Nama Kabinet' },
    { accessorKey: 'logo', header: 'Logo'},
    {
      accessorKey: 'departemen_count', 
      header: "Departemen",
      cell: ({ row }) => {
        const data = row.original

        return (
          <Link href={`/admin/kabinet/nama-kabinet`} className='text-accent underline'>
            {data.departemen_count}
          </Link>
        )
      }
    },
    {
      id: 'actions',
      header: 'Actions',
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
