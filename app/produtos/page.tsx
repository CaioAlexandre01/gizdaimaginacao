"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  initialProducts,
  type Product,
} from "@/data/products";
import {
  deleteProductFromRemote,
  readCachedProducts,
  saveProductToRemote,
  subscribeToRemoteProducts,
  writeCachedProducts,
} from "@/lib/products-store";

const DEFAULT_PRODUCT_LINK = "https://gizdaimaginacao.com/produtos";
const defaultDescription = "Sem descriÇõÇœo adicional.";

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
  const [products, setProducts] = useState<Product[]>(
    () => readCachedProducts() ?? initialProducts,
  );
  const [formState, setFormState] = useState<ManageFormState>(blankForm);
  const [status, setStatus] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToRemoteProducts(
      (remoteProducts) => {
        if (remoteProducts.length) {
          setProducts(remoteProducts);
          writeCachedProducts(remoteProducts);
          setStatus(null);
        } else {
          const cached = readCachedProducts();
          setProducts(cached ?? initialProducts);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Falha ao carregar produtos do Firebase", error);
        const cached = readCachedProducts();
        setProducts(cached ?? initialProducts);
        setStatus("NÇœo foi possÇðvel carregar do Firebase. Usando lista local.");
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.price.trim() || !formState.href.trim()) {
      setStatus("Informe tÇðtulo, valor e link para salvar o produto.");
      return;
    }

    const newProduct: Product = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `new-${Date.now()}`,
      title: formState.title.trim(),
      description: formState.description.trim() || defaultDescription,
      price: formState.price.trim(),
      href: formState.href.trim() || DEFAULT_PRODUCT_LINK,
      imageSrc: formState.imageSrc,
    };

    setIsSaving(true);
    setStatus("Salvando no Firebase...");

    try {
      await saveProductToRemote(newProduct);
      const nextCollection = [...products, newProduct];
      setProducts(nextCollection);
      writeCachedProducts(nextCollection);
      setFormState(blankForm);
      setFileError(null);
      setStatus("Produto salvo e sincronizado com o carrossel.");
    } catch (error) {
      console.error("Erro ao salvar produto no Firebase", error);
      setStatus("NÇœo foi possÇðvel salvar no Firebase. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
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
      setFileError("NÇœo foi possÇðvel ler o arquivo. Tente outro.");
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setStatus(null);

    try {
      await deleteProductFromRemote(id);
      const nextCollection = products.filter((product) => product.id !== id);
      setProducts(nextCollection);
      writeCachedProducts(nextCollection);
      setStatus("Produto removido do carrossel.");
    } catch (error) {
      console.error("Erro ao excluir produto no Firebase", error);
      setStatus("NÇœo foi possÇðvel excluir no Firebase. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-3xl bg-white/90 p-8 shadow-2xl shadow-slate-900/10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            GestÇœo rÇ­pida
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Adicionar tÇðtulo, descriÇõÇœo e valor
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Os produtos sÇü salvos no Firebase na coleÇõÇœo{" "}
            <span className="font-semibold text-slate-900">/produtos</span> para
            alimentar o carrossel e o quiz. A imagem enviada (opcional) fica
            salva junto como data URL.
          </p>
          <p className="text-xs text-slate-500">
            {isLoading
              ? "Carregando lista do Firebase..."
              : "Lista sincronizada com o Firebase e cache local."}
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
                placeholder="Ex: Kit HistÇürias do Arco-Çðris"
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
            DescriÇõÇœo (opcional)
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
              placeholder="Um resumo rÇ­pido do que torna o produto especial."
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
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Salvando..." : "Salvar produto"}
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

          {isLoading ? (
            <p className="mt-4 text-sm text-slate-500">
              Carregando produtos...
            </p>
          ) : (
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
                        disabled={deletingId === product.id || isSaving}
                        className="rounded-full border border-rose-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === product.id ? "Excluindo..." : "Excluir"}
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
          )}
        </section>
      </div>
    </main>
  );
}
