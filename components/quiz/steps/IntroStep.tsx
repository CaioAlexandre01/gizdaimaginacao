// components/quiz/steps/IntroStep.tsx
"use client";

import Image from "next/image";

type IntroStepProps = {
  onNext: () => void;
};

export default function IntroStep({ onNext }: IntroStepProps) {
  return (
    <section className="flex flex-col gap-4">
      {/* card com a imagem img-home */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <Image
          src="/img-home.png"
          alt="Descubra o tipo de atividade perfeito para a sua criança"
          width={421}
          height={224}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* texto chamativo antes do botão */}
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-sky-800 flex items-center justify-center gap-2">
          <span className="text-lg">🎈</span>
          <span>Pronto para começar a diversão?</span>
        </p>

        <p className="text-[13px] text-slate-600">
          Clique no botão azul e{" "}
          <span className="font-semibold text-sky-700">
            descubra o kit que vai virar o passatempo favorito
          </span>{" "}
          da sua criança ✨
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full rounded-full bg-sky-500 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-sky-600 active:scale-[0.98] transition"
      >
        Começar agora
      </button>
    </section>
  );
}
