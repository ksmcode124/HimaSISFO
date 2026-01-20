import { Button } from '@/components/ui/button';
import { KabinetListItem } from '@/lib/types/interface';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Trash2 } from 'lucide-react';

// interface ColumnActions {
//   onEdit?: (row: KabinetResponse) => void;
//   onDelete?: (row: KabinetResponse) => void;
// }

export function kabinetColumns(): ColumnDef<KabinetListItem>[] {
  return [
    {
      accessorKey: 'id_kabinet',
      header: 'ID Kabinet',
    },
    {
      accessorKey: 'tahun_kerja',
      header: 'Tahun',
    },
    {
      accessorKey: 'nama_kabinet',
      header: 'Nama Kabinet',
    },
    {
      id: 'actions',
      header: 'Aksi',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              className="h-10 w-10 p-0"
              // onClick={() => onEdit(data)}
            >
              <Eye className="h-5 w-5 text-blue-600" />
            </Button>
            <Button

              variant="ghost"
              className="h-10 w-10 p-0"
              // onClick={() => onEdit(data)}
            >
              <Edit className="h-5 w-5 text-blue-600" />
            </Button>

            <Button
              variant="ghost"
              className="h-10 w-10 p-0"
              // onClick={() => onDelete(data)}
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];
}