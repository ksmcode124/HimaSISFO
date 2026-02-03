'use client';

import { BaseModal } from '@/components/ui/base-modal';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { TableActionButtons } from './TableActionButtons';
import { Spinner } from '@/components/ui/spinner';
import * as React from 'react';

interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface DetailModalProps<TDetail> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: number | null;

  fetchDetail: (id: number) => Promise<TDetail>;
  mapDetailToUI: (detail: TDetail) => {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    meta?: MetaItem[];
    deskripsi?: string;
  };

  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function DetailModal<TDetail>({
  open,
  onOpenChange,
  id,
  fetchDetail,
  mapDetailToUI,
  onEdit,
  onDelete,
}: DetailModalProps<TDetail>) {
  const [detail, setDetail] = React.useState<TDetail | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch data when modal opens and id is available
  React.useEffect(() => {
    if (open && id != null) {
      setLoading(true);
      setError(null);
      fetchDetail(id)
        .then(setDetail)
        .catch(err => setError(err instanceof Error ? err.message : 'Terjadi kesalahan'))
        .finally(() => setLoading(false));
    } else {
      setDetail(null);
    }
  }, [open, id, fetchDetail]);

  const ui = detail ? mapDetailToUI(detail) : {};

  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={ui.title} size="lg">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Spinner className="size-8" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : detail ? (
        <>
          <div className="flex justify-center gap-12">
            {/* LEFT */}
            <div className="w-1/2">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#D9D9D9] flex items-center justify-center">
                {ui.imageUrl ? (
                  <Image
                    src={ui.imageUrl}
                    alt={ui.title ?? ''}
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
                <h2 className="text-lg font-semibold italic">{ui.title}</h2>
                {ui.subtitle && (
                  <p className="text-2xs">({ui.subtitle})</p>
                )}
              </div>

              <div className="space-y-2">
                {ui.meta?.map((item, i) => (
                  <div key={i}>
                    <p className="text-2xs font-semibold uppercase">{item.label}</p>
                    <p className="text-2xs font-light">{item.value}</p>
                  </div>
                ))}
              </div>

              {(onEdit || onDelete) && (
                <div className="mt-2 flex gap-3">
                  <TableActionButtons
                    onEdit={() => id && onEdit?.(id)}
                    onDelete={() => id && onDelete?.(id)}
                  />
                </div>
              )}
            </div>
          </div>

          {ui.deskripsi && (
            <div className="mt-6">
              <p className="text-2xs font-semibold uppercase mb-1">Deskripsi</p>
              <p className="text-2xs leading-relaxed font-light block overflow-y-auto max-h-35">
                {ui.deskripsi}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">Tidak ada data</div>
      )}
    </BaseModal>
  );
}
