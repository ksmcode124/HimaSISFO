interface KabinetYearButtonProps {
  label: string;
  onClick: () => void;
}

export default function KabinetYearButton({
  label,
  onClick,
}: KabinetYearButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 md:px-8 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white md:text-xl hover:bg-gray-600 transition-colors"
    >
      {label}
    </button>
  );
}
