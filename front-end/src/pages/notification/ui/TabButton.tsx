
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

export default function TabButton({ isActive, onClick, label }: TabButtonProps) {
  return (
    <button
      className={`flex-1 py-3 text-center ${isActive ? 'border-b-3 border-[#CFE7B5] font-medium' : 'text-gray-500'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
