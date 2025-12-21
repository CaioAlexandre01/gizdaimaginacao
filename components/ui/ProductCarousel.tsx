"use client";

import { useEffect, useState } from "react";

import {
  initialProducts,
  type Product,
} from "@/data/products";
import {
  readCachedProducts,
  subscribeToRemoteProducts,
  writeCachedProducts,
} from "@/lib/products-store";

export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>(
    () => readCachedProducts() ?? initialProducts,
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToRemoteProducts(
      (remoteProducts) => {
        if (remoteProducts.length) {
          setProducts(remoteProducts);
          writeCachedProducts(remoteProducts);
        } else {
          const cached = readCachedProducts();
          setProducts(cached ?? initialProducts);
        }
      },
      (error) => {
        console.error("Erro ao ouvir produtos do Firebase", error);
        const cached = readCachedProducts();
        setProducts(cached ?? initialProducts);
      },
    );

    return () => unsubscribe();
  }, []);

  if (!products.length) {
    return null;
  }

  const productCount = products.length;
  const normalizedIndex = Math.min(currentIndex, productCount - 1);
  const activeProduct = products[normalizedIndex];

  const cycleIndex = (delta: number) => {
    setCurrentIndex((previous) => {
      const clamped = Math.min(previous, productCount - 1);
      const next = clamped + delta;
      if (next < 0) {
        return productCount - 1;
      }
      if (next >= productCount) {
        return 0;
      }
      return next;
    });
  };

  const handlePrev = () => cycleIndex(-1);
  const handleNext = () => cycleIndex(1);

  return (
    <section className="mx-auto w-full max-w-md px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-400/60" />
          <span className="h-3 w-3 rounded-full bg-slate-400/60" />
          <span className="h-3 w-3 rounded-full bg-slate-400/60" />
        </div>
        <span className="rounded-full border border-slate-300 px-4 py-1 text-[10px] tracking-[0.4em] text-slate-500">
          PRODUTOS
        </span>
      </div>

      <div className="mt-4 rounded-[26px] bg-white p-4 shadow-[0_18px_30px_rgba(15,23,42,0.18)]">
        <div className="relative flex h-[220px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="absolute inset-4 rounded-[20px] bg-white" />
          <div className="relative z-10 h-full w-full">
            {activeProduct.imageSrc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeProduct.imageSrc}
                  alt={`${activeProduct.title} imagem`}
                  className="h-full w-full rounded-[18px] object-cover"
                  loading="lazy"
                />
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[11px] uppercase tracking-[0.4em] text-slate-500">
                <span>Imagem</span>
                <span className="text-[9px] tracking-[0.3em]">
                  Envie uma imagem em /produtos
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white bg-white/80 p-2 text-xl font-semibold text-slate-600 shadow-lg transition hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white bg-white/80 p-2 text-xl font-semibold text-slate-600 shadow-lg transition hover:bg-white"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[24px] bg-sky-600 px-6 py-5 text-center text-white shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
        <p className="text-[11px] uppercase tracking-[0.6em] text-white/80">
          {activeProduct.price}
        </p>
        <h3 className="mt-2 text-2xl font-semibold">{activeProduct.title}</h3>
        <p className="mt-2 text-sm font-light text-white/80">
          {activeProduct.description}
        </p>
        <a
          href={activeProduct.href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/70 bg-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:border-white hover:bg-white/40"
        >
          Ver produto
        </a>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {products.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`h-3 w-3 rounded-full ${
              dotIndex === normalizedIndex ? "bg-slate-500" : "bg-slate-400/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
