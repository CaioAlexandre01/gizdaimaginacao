// components/quiz/steps/SimplifyStep.tsx
"use client";

import QuizOptionTile from "@/components/quiz/QuizOptionTile";

type SimplifyStepProps = {
  value?: string;
  onSelect: (value: string) => void;
};

const SIMPLIFY_OPTIONS = [
  { value: "preparar-atividades", label: "Preparar atividades", icon: "📝" },
  { value: "ensinar-brincando", label: "Ensinar brincando", icon: "🎲" },
  { value: "estimular-sem-complicar", label: "Estimular sem complicar", icon: "🌱" },
  { value: "manter-ocupada", label: "Manter a criança ocupada", icon: "🧩" },
];

export default function SimplifyStep({ value, onSelect }: SimplifyStepProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="text-center space-y-1">
        <p className="text-[12px] uppercase tracking-[0.18em] text-sky-500 font-semibold">
          Passo 4
        </p>
        <h2 className="text-xl font-extrabold text-sky-800">
          O que você gostaria que fosse mais simples?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SIMPLIFY_OPTIONS.map((opt) => (
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
