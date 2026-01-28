'use client';

import { BaseModal } from '@/components/ui/base-modal';
import { Button } from '@/components/ui/button';
import { Info, Trash2 } from 'lucide-react';
import { cva } from 'class-variance-authority';

const confirmationContent = {
  save: {
    title: 'Konfirmasi Penyimpanan Data?',
    description: 'Pastikan tidak ada kesalahan pada data yang diinput. Periksa kembali data-data yang ada!',
    confirmText: 'Simpan',
    loadingText: 'Menyimpan...',
  },
  delete: {
    title: 'Hapus Item ini?',
    description: 'Item ini akan dihapus secara permanen. Aksi ini tidak bisa dibatalkan',
    confirmText: 'Hapus',
    loadingText: 'Menghapus...',
  },
};

type ConfirmVariant = 'save' | 'delete'

const confirmToButtonVariant: Record<ConfirmVariant, 
  React.ComponentProps<typeof Button>["variant"]
> = {
  save: "default",
  delete: "destructive",
};

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleConfirm: () => void;
  loading?: boolean;
  variant?: 'save' | 'delete';
}

export function ConfirmationModal({
  open,
  onOpenChange,
  handleConfirm,
  loading,
  variant = 'delete',
}: ConfirmModalProps) {
  const content = confirmationContent[variant];

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={content.title}
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)} className='text-sm font-semibold'>
            Cancel
          </Button>
          <Button
            variant={confirmToButtonVariant[variant]}
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
        {/* ICON */}
        <div className="text-black">
          {variant === 'delete' ? (
            <Trash2 className="size-10" />
          ) : (
            <Info className="size-10" />
          )}
        </div>

        {/* TITLE */}
        <h2 className="text-sm font-bold">{content.title}</h2>

        {/* DESCRIPTION */}
        <p className="text-xs max-w-sm">
          {content.description}
        </p>
      </div>
    </BaseModal>
  );
}