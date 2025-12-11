// components/quiz/steps/ResultStep.tsx
"use client";

import Image from "next/image";
import type { QuizAnswers } from "@/components/quiz/QuizFlow";

type ResultStepProps = {
  answers: QuizAnswers;
  onRestart: () => void;
};

const ageLabelMap: Record<string, string> = {
  "2-3": "crianças bem pequenas (2–3 anos)",
  "4-5": "crianças em fase de descobertas (4–5 anos)",
  "6-7": "crianças que já gostam de desafios (6–7 anos)",
  "8+": "crianças maiores que ainda amam brincar (8+ anos)",
};

const needLabelMap: Record<string, string> = {
  "ideias-rapidas": "ter ideias rápidas na mão ⚡",
  "materiais-prontos": "ter materiais prontos para só imprimir 📄",
  "tempo-preparar": "não perder tempo preparando tudo ⏰",
  "organizacao": "ter tudo organizado num só lugar 🗂️",
};

const boredLabelMap: Record<string, string> = {
  "pede-telas": "quando se entedia, ela logo pede telas 📱",
  "fica-agitada": "ela fica agitada e inquieta 🌀",
  "perde-interesse": "ela perde o interesse rapidinho 😕",
  "pede-atividade": "ela te pede alguma coisa pra fazer 🙋‍♀️",
};

const simplifyLabelMap: Record<string, string> = {
  "preparar-atividades": "preparar atividades sem complicar 📝",
  "ensinar-brincando": "ensinar brincando, de forma leve 🎲",
  "estimular-sem-complicar": "estimular sem virar aula chata 🌱",
  "manter-ocupada": "manter a criança ocupada com qualidade 🧩",
};

const KIWIFY_URL = "https://pay.kiwify.com.br/f7bhoJy";

export default function ResultStep({ answers, onRestart }: ResultStepProps) {
  const ageText = answers.ageRange ? ageLabelMap[answers.ageRange] : null;
  const needText = answers.needMost ? needLabelMap[answers.needMost] : null;
  const boredText = answers.boredReaction
    ? boredLabelMap[answers.boredReaction]
    : null;
  const simplifyText = answers.simplifyWish
    ? simplifyLabelMap[answers.simplifyWish]
    : null;

  return (
    <section className="flex flex-col gap-5">
      {/* MATCH + headline */}
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-sky-700 flex items-center justify-center gap-2">
          <span>MATCH!</span>
          <span>✅</span>
          <span>🎯</span>
        </p>
        <h2 className="text-xl font-extrabold text-sky-800">
          O seu jeitinho combina com o Kit Giz da Imaginação 💙
        </h2>
        <p className="text-sm text-slate-700">
          Pelas suas respostas, você quer{" "}
          <span className="font-semibold text-sky-800">
            menos peso na rotina
          </span>{" "}
          e atividades prontas pra usar sem drama.
        </p>
      </div>

      {/* história + imagem */}
      <div className="bg-sky-50/80 rounded-3xl px-4 py-3 text-sm text-slate-700 space-y-3">
        <div className="w-full rounded-2xl overflow-hidden">
          <Image
            src="/child-paint.jpg"
            alt="Criança pintando e se divertindo"
            width={400}
            height={260}
            className="w-full h-auto object-cover"
          />
        </div>

        <p>
          <span className="font-semibold text-sky-800">
            Eu sou a Natalia, criadora do Giz da Imaginação. ✨
          </span>{" "}
          Também já tive dias em que os meus filhos só queriam tela e eu não
          tinha energia para inventar nada diferente.
        </p>
        <p>
          Por isso criei{" "}
          <span className="font-semibold text-sky-800">
            kits pedagógicos prontos para imprimir
          </span>
          : folhas coloridas, jogos e brincadeiras guiadas pra você só
          entregar, brincar junto e ver a imaginação deles explodir. 🎨🧠
        </p>
      </div>

      {/* resumo do quiz – versão mais destacada */}
      <div className="bg-white rounded-3xl px-4 py-4 shadow-sm text-sm space-y-3 border border-sky-100">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-sky-500 font-semibold">
            Resumo do seu quiz
          </span>
          <span className="text-base">✨</span>
        </div>

        <div className="space-y-2">
          {ageText && (
            <div className="flex items-start gap-2">
              <span className="text-lg mt-[2px]">👶</span>
              <p className="text-slate-700">
                <span className="font-semibold text-sky-800">Idade:</span>{" "}
                {ageText}.
              </p>
            </div>
          )}

          {needText && (
            <div className="flex items-start gap-2">
              <span className="text-lg mt-[2px]">💡</span>
              <p className="text-slate-700">
                <span className="font-semibold text-sky-800">
                  O que mais falta:
                </span>{" "}
                {needText}
              </p>
            </div>
          )}

          {boredText && (
            <div className="flex items-start gap-2">
              <span className="text-lg mt-[2px]">😅</span>
              <p className="text-slate-700">
                <span className="font-semibold text-sky-800">
                  Quando bate o tédio:
                </span>{" "}
                {boredText}
              </p>
            </div>
          )}

          {simplifyText && (
            <div className="flex items-start gap-2">
              <span className="text-lg mt-[2px]">✨</span>
              <p className="text-slate-700">
                <span className="font-semibold text-sky-800">
                  O que você quer simplificar:
                </span>{" "}
                {simplifyText}
              </p>
            </div>
          )}
        </div>

        <div className="mt-2 rounded-2xl bg-sky-50 px-3 py-2">
          <p className="text-[13px] text-sky-900">
            O Kit Giz da Imaginação junta tudo isso em um só lugar:{" "}
            <span className="font-semibold">
              material pronto, bonito e fácil de usar
            </span>{" "}
            sempre que você precisar. 💙
          </p>
        </div>
      </div>

      {/* CTA Kiwify */}
      <div className="space-y-2">
        <a
          href={KIWIFY_URL}
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 active:scale-[0.98] transition"
        >
          Quero liberar meu kit para imprimir agora 🚀
        </a>
        <p className="text-[12px] text-center text-slate-600">
          Pagamento e acesso seguros pela Kiwify. Link com todos os materiais
          chega na hora no seu e-mail. 📩
        </p>
      </div>

      {/* botão secundário */}
      <button
        type="button"
        onClick={onRestart}
        className="w-full rounded-full border border-sky-200 py-2.5 text-[12px] font-medium text-sky-700 hover:bg-sky-50 transition"
      >
        Refazer o quiz ou responder por outra criança 🔁
      </button>
    </section>
  );
}
