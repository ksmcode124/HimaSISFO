import React from "react";

type ConfirmVariant = 'save' | 'delete';

export function useConfirm() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<ConfirmVariant>('delete');
  const [onConfirm, setOnConfirm] = React.useState<(() => Promise<void> | void) | null>(null);

  const confirm = (
    variant: ConfirmVariant,
    action: () => Promise<void> | void
  ) => {
    setVariant(variant);
    setOnConfirm(() => action);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!onConfirm) return;
    await onConfirm();
    setOpen(false);
  };

  return {
    open,
    variant,
    confirm,
    handleConfirm,
    onOpenChange: setOpen,
  };
}
