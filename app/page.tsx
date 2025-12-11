// app/page.tsx
import Image from "next/image";
import QuizFlow from "@/components/quiz/QuizFlow";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF7E6]">
      <div className="max-w-md mx-auto px-4 pt-6 pb-10">
        <header className="flex justify-center">
          <Image
            src="/giz-logo.png"   // porque está em public/
            alt="Giz da Imaginação"
            width={160}
            height={60}
            priority
          />
        </header>

        <QuizFlow />
      </div>
    </main>
  );
}
