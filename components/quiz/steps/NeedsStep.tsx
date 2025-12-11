// components/quiz/steps/NeedsStep.tsx
"use client";

import QuizOptionTile from "@/components/quiz/QuizOptionTile";

type NeedsStepProps = {
  value?: string;
  onSelect: (value: string) => void;
};

const NEED_OPTIONS = [
  { value: "ideias-rapidas", label: "Ideias rápidas", icon: "⚡" },
  { value: "materiais-prontos", label: "Materiais prontos", icon: "📄" },
  { value: "tempo-preparar", label: "Tempo para preparar", icon: "⏰" },
  { value: "organizacao", label: "Organização", icon: "🗂️" },
];

export default function NeedsStep({ value, onSelect }: NeedsStepProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="text-center space-y-1">
        <p className="text-[12px] uppercase tracking-[0.18em] text-sky-500 font-semibold">
          Passo 2
        </p>
        <h2 className="text-xl font-extrabold text-sky-800">
          O que mais te falta no dia a dia com a criança?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {NEED_OPTIONS.map((opt) => (
          <QuizOptionTile
            key={opt.value}
            icon={opt.icon}
            label={opt.label}
            selected={value === opt.value}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
    </section>
  );
}
