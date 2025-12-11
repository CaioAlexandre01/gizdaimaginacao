// components/layout/ProgressBar.tsx
type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-4">
      <div className="h-1.5 w-full rounded-full bg-sky-100 overflow-hidden">
        <div
          className="h-full bg-sky-500 transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
