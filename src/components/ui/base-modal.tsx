import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  children,
  footer,
  size = 'md',
}: BaseModalProps) {
  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl'
  }[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle hidden>
        {title}
      </DialogTitle>
      <DialogContent className={cn('rounded-lg bg-white', sizeClass)}>
        {title && (
          <DialogHeader className='hidden'>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {footer && (
          <div className="mt-6 flex justify-center gap-3">{footer}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
