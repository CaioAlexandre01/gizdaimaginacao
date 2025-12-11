// components/quiz/steps/AgeStep.tsx
"use client";

import QuizOptionButton from "@/components/quiz/QuizOptionButton";

type AgeStepProps = {
  value?: string;
  onSelect: (value: string) => void;
};

const AGE_OPTIONS = [
  { value: "2-3", label: "2–3 anos", icon: "🧸" },
  { value: "4-5", label: "4–5 anos", icon: "🧩" },
  { value: "6-7", label: "6–7 anos", icon: "🪁" },
  { value: "8+", label: "8+ anos", icon: "📚" },
];

export default function AgeStep({ value, onSelect }: AgeStepProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-xl font-extrabold text-sky-700 text-center">
        Qual a idade da sua criança?
      </h2>

      <div className="flex flex-col gap-3">
        {AGE_OPTIONS.map((opt) => (
          <QuizOptionButton
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
