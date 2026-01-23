// components/ui/Modal.tsx
'use client'
import { useEffect } from "react";
import { ContentRenderer } from "./ContentRenderer";
import { ContentBlock, ItemDataJSON, KemahasiswaanDataFile, ProsesAkademik } from "..";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  selectedId: string | null
  items?: ItemDataJSON[]
};

export function Modal({ open, onClose, selectedId, items }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open || !selectedId || !items) return null

  const selectedItem = items.find(item => item.id === selectedId)
  if (!selectedItem) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 w-[95vw] sm:w-xl md:w-3xl lg:w-5xl rounded-lg bg-white px-6 pb-3 max-h-[70vh] overflow-auto shadow-lg animate-in fade-in zoom-in">
        <h1 className=" sticky bg-white top-0 py-3 font-medium text-center">{selectedItem.title}</h1>
        <ContentRenderer content={selectedItem.content as ContentBlock[]} />
      </div>
    </div>
  );
}
