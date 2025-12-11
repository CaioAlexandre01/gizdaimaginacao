// components/quiz/QuizFlow.tsx
"use client";

import { useState } from "react";
import ProgressBar from "@/components/layout/ProgressBar";
import IntroStep from "@/components/quiz/steps/IntroStep";
import AgeStep from "@/components/quiz/steps/AgeStep";
import NeedsStep from "@/components/quiz/steps/NeedsStep";
import BoredStep from "@/components/quiz/steps/BoredStep";
import SimplifyStep from "@/components/quiz/steps/SimplifyStep";
import ResultStep from "@/components/quiz/steps/ResultStep";

export type QuizAnswers = {
  ageRange?: string;
  needMost?: string;
  boredReaction?: string;
  simplifyWish?: string;
};

const STEPS = ["intro", "age", "needs", "bored", "simplify", "result"] as const;
const TOTAL_STEPS = STEPS.length;

export default function QuizFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const goNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };

  const restart = () => {
    setAnswers({});
    setStepIndex(0);
  };

  const currentStep = STEPS[stepIndex];

  const handleAgeSelect = (ageRange: string) => {
    setAnswers((prev) => ({ ...prev, ageRange }));
    goNext();
  };

  const handleNeedSelect = (needMost: string) => {
    setAnswers((prev) => ({ ...prev, needMost }));
    goNext();
  };

  const handleBoredSelect = (boredReaction: string) => {
    setAnswers((prev) => ({ ...prev, boredReaction }));
    goNext();
  };

  const handleSimplifySelect = (simplifyWish: string) => {
    setAnswers((prev) => ({ ...prev, simplifyWish }));
    goNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <IntroStep onNext={goNext} />;

      case "age":
        return (
          <AgeStep value={answers.ageRange} onSelect={handleAgeSelect} />
        );

      case "needs":
        return (
          <NeedsStep value={answers.needMost} onSelect={handleNeedSelect} />
        );

      case "bored":
        return (
          <BoredStep
            value={answers.boredReaction}
            onSelect={handleBoredSelect}
          />
        );

      case "simplify":
        return (
          <SimplifyStep
            value={answers.simplifyWish}
            onSelect={handleSimplifySelect}
          />
        );

      case "result":
      default:
        return <ResultStep answers={answers} onRestart={restart} />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <ProgressBar currentStep={stepIndex} totalSteps={TOTAL_STEPS} />
      {renderStep()}
    </div>
  );
}
