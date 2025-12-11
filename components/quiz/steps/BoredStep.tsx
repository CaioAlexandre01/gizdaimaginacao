// components/quiz/steps/BoredStep.tsx
"use client";

import QuizOptionTile from "@/components/quiz/QuizOptionTile";

type BoredStepProps = {
  value?: string;
  onSelect: (value: string) => void;
};

const BORED_OPTIONS = [
  { value: "pede-telas", label: "Pede telas", icon: "📱" },
  { value: "fica-agitada", label: "Fica agitada", icon: "🌀" },
  { value: "perde-interesse", label: "Perde o interesse rápido", icon: "😕" },
  { value: "pede-atividade", label: "Me pede algo para fazer", icon: "🙋‍♀️" },
];

export default function BoredStep({ value, onSelect }: BoredStepProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="text-center space-y-1">
        <p className="text-[12px] uppercase tracking-[0.18em] text-sky-500 font-semibold">
          Passo 3
        </p>
        <h2 className="text-xl font-extrabold text-sky-800">
          Quando a criança fica entediada, o que acontece primeiro?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {BORED_OPTIONS.map((opt) => (
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
