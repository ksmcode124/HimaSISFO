import { ColumnDef } from '@tanstack/react-table';
import { TableActionButtons } from '../TableActionButtons';
import { AdminKabinetRow, ColumnActions } from '../../types';
import Link from 'next/link';
import { translateToSlug } from '@/lib/utils/translate-slug';

export function kabinetColumns({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<AdminKabinetRow>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      meta: { sortable: true },
    },
    {
      accessorKey: 'tahun_kerja',
      header: 'Tahun',
      meta: { sortable: true },
    },
    {
      accessorKey: 'nama_kabinet',
      header: 'Nama Kabinet',
      meta: { sortable: true },
    },
    {
      accessorKey: 'logo',
      header: 'Logo',
      meta: { sortable: false },
    },
    {
      accessorKey: 'departemen_count',
      header: 'Departemen',
      cell: ({ row }) => {
        const data = row.original;
        return (
          <Link
            href={`/admin/kabinet/${data.id}-${translateToSlug(data.nama_kabinet)}`}
            className="text-accent underline"
          >
            {data.departemen_count ?? 0}
          </Link>
        );
      },
      meta: { sortable: true },
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
      meta: { sortable: false },
    },
  ];
}
