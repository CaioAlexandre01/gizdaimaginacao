"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from "firebase/firestore";

import {
  productCarouselStorageKey,
  type Product,
} from "@/data/products";
import { db } from "./firebase";

const COLLECTION_NAME = "produtos";
const collectionRef = collection(db, COLLECTION_NAME);
const defaultDescription = "Sem descriÇõÇœo adicional.";

const mapDocToProduct = (
  snapshot: QueryDocumentSnapshot<DocumentData>,
): Product | null => {
  const data = snapshot.data();

  const title = typeof data.title === "string" ? data.title : "";
  const price = typeof data.price === "string" ? data.price : "";
  const href = typeof data.href === "string" ? data.href : "";
  if (!title || !price || !href) {
    return null;
  }

  return {
    id:
      typeof data.id === "string" && data.id.length > 0
        ? data.id
        : snapshot.id,
    title,
    description:
      typeof data.description === "string" && data.description.length > 0
        ? data.description
        : defaultDescription,
    href,
    price,
    tag: typeof data.tag === "string" ? data.tag : undefined,
    imageSrc: typeof data.imageSrc === "string" ? data.imageSrc : undefined,
  };
};

export const fetchRemoteProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs
    .map((document) => mapDocToProduct(document))
    .filter((product): product is Product => Boolean(product));
};

export const subscribeToRemoteProducts = (
  onData: (products: Product[]) => void,
  onError?: (error: unknown) => void,
): Unsubscribe => {
  return onSnapshot(
    collectionRef,
    (snapshot) => {
      const mapped = snapshot.docs
        .map((document) => mapDocToProduct(document))
        .filter((product): product is Product => Boolean(product));
      onData(mapped);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
};

export const saveProductToRemote = async (product: Product) => {
  await setDoc(doc(collectionRef, product.id), product);
};

export const deleteProductFromRemote = async (id: string) => {
  await deleteDoc(doc(collectionRef, id));
};

export const readCachedProducts = (): Product[] | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(productCarouselStorageKey);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Ignore invalid cache and fall back to defaults.
  }

  return null;
};

export const writeCachedProducts = (products: Product[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    productCarouselStorageKey,
    JSON.stringify(products),
  );
};
