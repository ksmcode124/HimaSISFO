'use client';

import { BaseModal } from '@/components/ui/base-modal';
import Image from 'next/image';
import { Pencil, Trash2, ImageIcon } from 'lucide-react';
import { TableActionButtons } from './TableActionButtons';

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  subtitle?: string;

  imageUrl?: string;

  meta?: MetaItem[];

  description?: string;

  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function DetailModal({
  open,
  onOpenChange,
  title,
  subtitle,
  imageUrl,
  meta = [],
  description,
  onEdit,
  onDelete,
}: DetailModalProps) {
  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={title} size="lg">
      <div className="flex gap-6">
        {/* LEFT */}
        <div className="w-1/3">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title ?? ''}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex w-2/3 flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold italic">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-2">
            {meta.map((item, i) => (
              <div key={i}>
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {(onEdit || onDelete) && (
            <div className="mt-2 flex gap-3">
              <TableActionButtons 
               onEdit={onEdit}
               onDelete={onDelete}
              />
            </div>
          )}
        </div>
      </div>

      {description && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">
            Deskripsi
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      )}
    </BaseModal>
  );
}
