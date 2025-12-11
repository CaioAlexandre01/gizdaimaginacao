// components/quiz/steps/IntroStep.tsx
"use client";

import Image from "next/image";

type IntroStepProps = {
  onNext: () => void;
};

export default function IntroStep({ onNext }: IntroStepProps) {
  return (
    <section className="flex flex-col gap-5">
      {/* card agora é só a imagem */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <Image
          src="/img-home.png"
          alt="Giz da Imaginação - Descubra o tipo de atividade perfeito"
          width={421}   // pode ajustar, isso é só referência
          height={224}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* texto curto + botão, igual o fluxo anterior */}
      <p className="text-sm text-center text-slate-700">
        Toque no botão abaixo para começar 👇
      </p>

      <button
        onClick={onNext}
        className="w-full rounded-full bg-orange-400 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-orange-500 active:scale-[0.98] transition"
      >
        Começar
      </button>
    </section>
  );
}
