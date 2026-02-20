import { ArrowLeft } from "lucide-react";

function BackButton({ onBack, label = "Back" }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition"
      title={label}
    >
      <ArrowLeft size={20} />
      <span className="hidden sm:inline text-sm">{label}</span>
    </button>
  );
}

export default BackButton;
