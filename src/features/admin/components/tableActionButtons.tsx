import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";

interface Props {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function TableActionButtons({ onView, onEdit, onDelete }: Props) {
  return (
    <div className="flex justify-center gap-2">
      {onView && (
        <Button variant="ghost" className="h-10 w-10 p-0" onClick={onView}>
          <Eye className="h-5 w-5 text-blue-600" />
        </Button>
      )}

      {onEdit && (
        <Button variant="ghost" className="h-10 w-10 p-0" onClick={onEdit}>
          <Edit className="h-5 w-5 text-blue-600" />
        </Button>
      )}

      {onDelete && (
        <Button variant="ghost" className="h-10 w-10 p-0" onClick={onDelete}>
          <Trash2 className="h-5 w-5 text-red-600" />
        </Button>
      )}
    </div>
  );
}
