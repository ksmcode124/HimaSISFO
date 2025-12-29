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
      className="px-8 py-2 bg-gray-700 rounded-full border border-gray-500 text-xl hover:bg-gray-600 transition-colors"
    >
      {label}
    </button>
  );
}
