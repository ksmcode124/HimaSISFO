import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminDepartemenRow, } from '../../types';
import Link from 'next/link';
import { translateToSlug } from '@/lib/utils/translate-slug';

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
    { accessorKey: 'id_departemen', header: 'ID' },
    { accessorKey: 'nama_departemen', header: 'Nama Departemen' },
    { accessorKey: 'logo_departemen', header: 'Logo'},
    { accessorKey: 'foto_departemen', header: 'Foto'},
    {
      accessorKey: 'anggota_count', 
      header: "Anggota",
      cell: ({ row }) => {
        const data = row.original

        return (
          <Link href={`/admin/kabinet/${data.slug_kabinet}/${data.id_departemen}-${translateToSlug(data.nama_departemen)}`} className='text-accent underline'>
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
            onView={onView ? () => onView(data.id_departemen) : undefined}
            onEdit={onEdit ? () => onEdit(data.id_departemen) : undefined}
            onDelete={onDelete ? () => onDelete(data.id_departemen) : undefined}
          />
        );
      },
    },
  ];
}
