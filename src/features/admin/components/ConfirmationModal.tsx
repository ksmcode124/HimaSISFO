'use client';

import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { Info, Trash2 } from 'lucide-react';

const confirmationContent = {
  save: {
    title: 'Konfirmasi Penyimpanan Data?',
    description:
      'Pastikan tidak ada kesalahan pada data yang diinput. Periksa kembali data-data yang ada!',
    confirmText: 'Simpan',
    loadingText: 'Menyimpan...',
  },
  delete: {
    title: 'Hapus Item ini?',
    description:
      'Item ini akan dihapus secara permanen. Aksi ini tidak bisa dibatalkan',
    confirmText: 'Hapus',
    loadingText: 'Menghapus...',
  },
};

type ConfirmVariant = 'save' | 'delete';

interface ConfirmModalProps {
  open: boolean;
  variant: ConfirmVariant;
  loading?: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export function ConfirmationModal({
  open,
  variant,
  loading,
  handleConfirm,
  handleCancel,
}: ConfirmModalProps) {
  const content = confirmationContent[variant];

  return (
    <BaseModal
      open={open}
      onOpenChange={(v) => {
        if (!v) handleCancel(); // ESC / overlay → cancel
      }}
      title={content.title}
      footer={
        <>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant={variant === 'delete' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            disabled={loading}
            className='text-sm font-semibold'
          >
            {loading ? content.loadingText : content.confirmText}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div>
          {variant === 'delete' ? (
            <Trash2 className="size-10" />
          ) : (
            <Info className="size-10" />
          )}
        </div>

        <h2 className="text-sm font-bold">{content.title}</h2>
        <p className="text-xs max-w-sm">{content.description}</p>
      </div>
    </BaseModal>
  );
}
