"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import {
  initialProducts,
  productCarouselStorageKey,
  type Product,
} from "@/data/products";

const DEFAULT_PRODUCT_LINK = "https://gizdaimaginacao.com/produtos";

function loadStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    return initialProducts;
  }

  const stored = window.localStorage.getItem(productCarouselStorageKey);
  if (!stored) {
    return initialProducts;
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fall back to the default catalog if parsing fails.
  }

  return initialProducts;
}

type ManageFormState = {
  title: string;
  description: string;
  price: string;
  href: string;
  imageSrc?: string;
};

const blankForm: ManageFormState = {
  title: "",
  description: "",
  price: "",
  href: "",
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => loadStoredProducts());
  const [formState, setFormState] = useState<ManageFormState>(blankForm);
  const [status, setStatus] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const persist = (items: Product[]) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      productCarouselStorageKey,
      JSON.stringify(items),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.price.trim() || !formState.href.trim()) {
      setStatus("Informe título, valor e link para salvar o produto.");
      return;
    }

    const newProduct: Product = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `new-${Date.now()}`,
      title: formState.title.trim(),
      description: formState.description.trim() || "Sem descrição adicional.",
      price: formState.price.trim(),
      href: formState.href.trim() || DEFAULT_PRODUCT_LINK,
      imageSrc: formState.imageSrc,
    };

    const nextCollection = [...products, newProduct];
    setProducts(nextCollection);
    persist(nextCollection);
    setFormState(blankForm);
    setFileError(null);
    setStatus("Produto salvo e adicionado ao carrossel.");
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFormState((current) => ({ ...current, imageSrc: undefined }));
      setFileError(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFormState((current) => ({ ...current, imageSrc: undefined }));
      setFileError("Escolha uma imagem menor que 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormState((current) => ({
        ...current,
        imageSrc: reader.result as string | undefined,
      }));
      setFileError(null);
    };
    reader.onerror = () => {
      setFileError("Não foi possível ler o arquivo. Tente outro.");
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    const nextCollection = products.filter((product) => product.id !== id);
    setProducts(nextCollection);
    persist(nextCollection);
    setStatus("Produto removido do carrossel.");
  };

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-3xl bg-white/90 p-8 shadow-2xl shadow-slate-900/10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Gestão rápida
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Adicionar título, descrição e valor
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Salve o conteúdo rápido para o carrossel; o botão sempre aponta para{" "}
            <span className="font-semibold text-slate-900">
              https://gizdaimaginacao.com/produtos
            </span>{" "}
            e a imagem deve ser configurada manualmente em
            <span className="font-semibold text-slate-900">
              {" "}
              data/products.ts.
            </span>
          </p>
        </header>

        <form
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Nome do produto
              <input
                type="text"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                value={formState.title}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Ex: Kit Histórias do Arco-íris"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Valor (R$)
              <input
                type="text"
                inputMode="decimal"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                value={formState.price}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    price: event.target.value,
                  }))
                }
                placeholder="Ex: R$ 189,00"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Link do produto
            <input
              type="url"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              value={formState.href}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  href: event.target.value,
                }))
              }
              placeholder="https://seuloja.com/produto"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Descrição (opcional)
            <textarea
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              rows={3}
              value={formState.description}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Um resumo rápido do que torna o produto especial."
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Imagem (opcional)
            <input
              type="file"
              accept="image/*"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition file:cursor-pointer file:border-0 file:bg-slate-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-slate-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
              onChange={handleImageChange}
            />
            {formState.imageSrc && (
              <p className="text-xs text-slate-500">
                Imagem pronta para o carrossel.
              </p>
            )}
            {fileError && (
              <p className="text-xs font-semibold text-rose-500">{fileError}</p>
            )}
          </label>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              Salvar produto
            </button>
            {status && (
              <p className="text-xs text-slate-500">{status}</p>
            )}
          </div>
        </form>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Produtos atualmente no carrossel
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.4em] text-slate-500">
              {products.length}
            </span>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {product.title}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                      {product.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="rounded-full border border-rose-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-600 transition hover:bg-rose-50"
                    >
                      Excluir
                    </button>
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600"
                    >
                      Abrir
                    </a>
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {product.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
