'use client';

import { BaseModal } from '@/components/ui/base-modal';
import Image from 'next/image';
import { Pencil, Trash2, ImageIcon } from 'lucide-react';
import { TableActionButtons } from './TableActionButtons';
import { Spinner } from '@/components/ui/spinner';

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface DetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: number | undefined,

  title?: string;
  subtitle?: string;

  imageUrl?: string;

  meta?: MetaItem[];

  description?: string;

  isLoadingModal: boolean;

  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function DetailModal({
  open,
  onOpenChange,
  id,
  title,
  subtitle,
  imageUrl,
  meta = [],
  description,
  isLoadingModal,
  onEdit,
  onDelete,
}: DetailModalProps) {
  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={title} size="lg">
      {isLoadingModal ? (
        <div className='flex items-center justify-center'>
          <Spinner className='size-8' />
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-12">
          {/* LEFT */}
            <div className="w-1/2">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#D9D9D9] flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title ?? ''}
                    fill
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-10 w-10" />
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex w-1/2 flex-col gap-4">
              <div>
                <h2 className="text-lg font-semibold italic">{title}</h2>
                {subtitle && (
                  <p className="text-2xs">
                    ({subtitle})
                  </p>
                )}
              </div>

                <div className="space-y-2">
                  {meta.map((item, i) => (
                    <div key={i}>
                      <p className="text-2xs font-semibold uppercase">
                        {item.label}
                      </p>
                      <p className="text-2xs font-light">{item.value}</p>
                    </div>
                  ))}
                </div>

                {(onEdit || onDelete) && (
                  <div className="mt-2 flex gap-3">
                    <TableActionButtons 
                    onEdit={() => onEdit && id ? onEdit(id) : null}
                    onDelete={() => onDelete && id ? onDelete(id) : null}
                    />
                  </div>
                )}
              </div>
            </div>

            {description && (
              <div className="mt-6">
                <p className="text-2xs font-semibold uppercase mb-1">
                  Deskripsi
                </p>
                <p className="text-2xs leading-relaxed font-light block overflow-y-auto max-h-35">
                  {description}
                </p>
              </div>
            )}
          </>
      )}

    </BaseModal>
  );
}
