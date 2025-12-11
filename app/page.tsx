// app/page.tsx
import Image from "next/image";
import QuizFlow from "@/components/quiz/QuizFlow";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Fundo com céu e nuvens */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/bg.jpg"
          alt="Fundo céu e nuvens - Giz da Imaginação"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Véu suave pra contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-100/40 to-sky-200/60 -z-10" />

      <div className="relative max-w-md mx-auto px-4 pt-8 pb-12 flex flex-col gap-6">
        {/* Header com logo */}
        <header className="flex flex-col items-center gap-2">
          <div className="bg-white/90 rounded-3xl px-6 py-3 shadow-lg flex items-center justify-center">
            <Image
              src="/giz-logo.png"
              alt="Giz da Imaginação"
              width={220}
              height={80}
              priority
              className="h-auto w-auto"
            />
          </div>

          <p className="text-[13px] text-sky-900/90 drop-shadow-sm flex items-center gap-2 justify-center">
            <span className="text-base">✨</span>
            <span className="font-medium">
              Kits para colorir, contar, imaginar e aprender brincando.
            </span>
          </p>
        </header>

        {/* Card principal do quiz */}
        <div className="bg-white/95 rounded-3xl shadow-xl px-4 py-4">
          <QuizFlow />
        </div>
      </div>
    </main>
  );
}
