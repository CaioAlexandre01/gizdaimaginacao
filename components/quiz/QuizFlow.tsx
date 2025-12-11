// components/quiz/QuizFlow.tsx
"use client";

import { useState } from "react";
import ProgressBar from "@/components/layout/ProgressBar";
import IntroStep from "@/components/quiz/steps/IntroStep";
import AgeStep from "@/components/quiz/steps/AgeStep";

type QuizAnswers = {
  ageRange?: string;
  // depois vamos adicionar: context, goal, time, etc.
};

const STEPS = ["intro", "age", "context", "goal", "time", "result"] as const;
const TOTAL_STEPS = STEPS.length;

export default function QuizFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const goNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };

  const handleAgeSelect = (ageRange: string) => {
    setAnswers((prev) => ({ ...prev, ageRange }));
    goNext();
  };

  const currentStep = STEPS[stepIndex];

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <IntroStep onNext={goNext} />;

      case "age":
        return (
          <AgeStep value={answers.ageRange} onSelect={handleAgeSelect} />
        );

      // por enquanto, placeholders pros próximos passos
      case "context":
      case "goal":
      case "time":
      case "result":
      default:
        return (
          <section className="bg-white/95 rounded-[30px] shadow-xl px-5 py-6 text-center">
            <p className="text-sm text-slate-700 mb-4">
              Step <strong>{currentStep}</strong> ainda não implementado.
            </p>
            <button
              onClick={goNext}
              className="w-full rounded-full bg-orange-400 py-3 text-sm font-semibold text-white hover:bg-orange-500 active:scale-[0.98] transition"
            >
              Próximo
            </button>
          </section>
        );
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <ProgressBar currentStep={stepIndex} totalSteps={TOTAL_STEPS} />
      {renderStep()}
    </div>
  );
}
