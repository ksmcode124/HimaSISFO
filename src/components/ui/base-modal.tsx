import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils/cn';
import { DialogDescription } from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function BaseModal({
  open,
  onOpenChange,
  title = '',
  children,
  footer,
  size = 'md',
  className,
}: BaseModalProps) {
  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  }[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('bg-white rounded-lg shadow-lg w-full mx-2 sm:mx-auto', sizeClass, className)}>
          <DialogHeader hidden>
            <DialogTitle className="text-lg font-semibold" hidden>{title}</DialogTitle>
            <DialogDescription>
              Base Modal for Admin
            </DialogDescription>
          </DialogHeader>

        <div className={cn('py-4', footer ? 'mb-4' : '')}>{children}</div>

        {footer && (
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
