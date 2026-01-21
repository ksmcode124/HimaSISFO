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

const iconVariants = cva(
  'flex h-14 w-14 items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        save: 'bg-blue-100 text-blue-600',
        delete: 'bg-red-100 text-red-600',
      },
    },
    defaultVariants: {
      variant: 'delete',
    },
  },
);

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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={confirmToButtonVariant[variant]}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? content.loadingText : content.confirmText}
          </Button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {/* ICON */}
        <div className={iconVariants({ variant })}>
          {variant === 'delete' ? (
            <Trash2 className="h-7 w-7" />
          ) : (
            <Info className="h-7 w-7" />
          )}
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold">{content.title}</h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground max-w-sm">
          {content.description}
        </p>
      </div>
    </BaseModal>
  );
}