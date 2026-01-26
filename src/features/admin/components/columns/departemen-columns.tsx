import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminDepartemenRow, } from '../../types';
import Link from 'next/link';

interface ColumnActions {
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function departemenColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminDepartemenRow>[] {
  return [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'nama_departemen', header: 'Nama Departemen' },
    { accessorKey: 'logo', header: 'Logo'},
    {
      accessorKey: 'anggota_count', 
      header: "Anggota",
      cell: ({ row }) => {
        const data = row.original

        return (
          <Link href={`/admin/kabinet/nama-kabinet/nama-departemen`} className='text-accent underline'>
            {data.anggota_count}
          </Link>
        )
      }
    },
    { accessorKey: 'proker_count', header: 'Program Kerja' },
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
