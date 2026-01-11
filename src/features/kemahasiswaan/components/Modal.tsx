// components/ui/Modal.tsx
'use client'
import { useEffect } from "react";
import ContentRenderer from "./ContentRenderer";
import { ContentBlock, ProsesAkademik } from "..";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  id: string | null
};

export default function Modal({ open, onClose, id }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  const itemCollection = ProsesAkademik.sections.find((item) => item.type == "item-collection" )?.items;
  const data = itemCollection?.find((item) => item.id == id)
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 -[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-5xl rounded-lg bg-white p-6 max-h-[90vh] overflow-auto shadow-lg animate-in fade-in zoom-in">
        <ContentRenderer content={data?.content as ContentBlock[]} />
      </div>
    </div>
  );
}
