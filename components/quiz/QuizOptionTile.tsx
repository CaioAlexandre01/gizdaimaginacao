// components/quiz/QuizOptionTile.tsx
"use client";

type QuizOptionTileProps = {
  icon: string;
  label: string;
  selected?: boolean;
  onClick: () => void;
};

export default function QuizOptionTile({
  icon,
  label,
  selected = false,
  onClick,
}: QuizOptionTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex flex-col items-center justify-center gap-2",
        "rounded-2xl px-3 py-4 text-sm font-medium",
        "bg-[#F2F7FF] border border-sky-100 text-sky-900",
        "hover:bg-[#E4EEFF] hover:-translate-y-[1px] transition-all",
        selected ? "ring-2 ring-sky-400 border-sky-400 bg-[#E0ECFF]" : "",
      ]
        .join(" ")
        .trim()}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-[13px]">{label}</span>
    </button>
  );
}
