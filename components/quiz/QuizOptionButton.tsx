// components/quiz/QuizOptionButton.tsx
"use client";

type QuizOptionButtonProps = {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
};

export default function QuizOptionButton({
  icon,
  label,
  selected = false,
  onClick,
}: QuizOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 rounded-[999px] px-4 py-3 text-sm font-medium",
        "bg-[#FFEFD9] border border-orange-200 text-sky-800",
        "hover:bg-[#FFE4C0] hover:-translate-y-[1px] transition-all",
        selected ? "ring-2 ring-orange-400 border-orange-400" : "",
      ]
        .join(" ")
        .trim()}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
