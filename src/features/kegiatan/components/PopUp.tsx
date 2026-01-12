"use client";

import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import { ModalLayer } from "@/components/layout/Layer";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <ModalLayer>
        {children}
      </ModalLayer>
    </div>,
    document.body
  );
}
