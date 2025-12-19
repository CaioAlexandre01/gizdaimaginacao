export interface Product {
  id: string;
  title: string;
  description: string;
  href: string;
  price: string;
  tag?: string;
  imageSrc?: string;
}

export const productCarouselStorageKey = "giz-carousel-products";

export const initialProducts: Product[] = [
  {
    id: "kit-alegria",
    title: "Kit Qtde Criativa",
    description: "Cadernos, cartelas e stickers para estimular cor e narrativa.",
    href: "https://pay.kiwify.com.br/f7bhoJy",
    price: "R$ 189,00",
    tag: "Lançamento",
    imageSrc: "/img-home.png",
  },
  {
    id: "kit-formas",
    title: "Coleção Formas e Cores",
    description:
      "Peças canhotas e jogos imprimíveis para brincar com formas, ritmo e sequência.",
    href: "https://gizdaimaginacao.com/produtos/colecao-formas",
    price: "R$ 147,00",
  },
  {
    id: "kit-estacoes",
    title: "Cartelas 4 Estações",
    description:
      "Um universo de propostas para cada estação do ano com foco em alfabetização audiovisual.",
    href: "https://gizdaimaginacao.com/produtos/cartelas-4-estacoes",
    price: "R$ 176,00",
    tag: "Mais vendido",
  },
];
