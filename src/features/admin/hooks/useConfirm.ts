import * as React from "react";

type ConfirmVariant = "save" | "delete";

export function useConfirm() {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<ConfirmVariant>("delete");

  const resolverRef = React.useRef<((value: boolean) => void) | null>(null);

  const cleanup = () => {
    resolverRef.current = null;
    setOpen(false);
  };

  const confirm = (variant: ConfirmVariant): Promise<boolean> => {
    setVariant(variant);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    if (!resolverRef.current) return;
    resolverRef.current(true);
    cleanup();
  };

  const handleCancel = () => {
    if (!resolverRef.current) return;
    resolverRef.current(false);
    cleanup();
  };

  return {
    open,
    variant,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
