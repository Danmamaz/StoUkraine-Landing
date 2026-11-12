import type { Product } from "./types";

/*
 * TEST DATA. Descriptions, specs and every price below are placeholders for
 * the layout; the client fills real positions in the CMS (rows can be added
 * and removed freely).
 */

export const products: Product[] = [
  {
    id: "stocleyer-w",
    tag: "Продукт 01",
    name: "StoCleyer W",
    title: "StoCleyer W — імітація дерева",
    description:
      "Фасадна дошка для природного дерев'яного вигляду без догляду за деревом. Монтується в системі утеплення або як самостійне облицювання, не гниє і не потребує просочень.",
    images: [
      { src: "/images/products/cleyer-1.jpg", alt: "Будинок з білим фасадом StoCleyer W", width: 1024, height: 683 },
      { src: "/images/products/cleyer-2.jpg", alt: "Деталь дощок StoCleyer W", width: 1024, height: 683 },
      { src: "/images/products/cleyer-3.jpg", alt: "Схема системи утеплення з дошками StoCleyer W", width: 1024, height: 581 },
    ],
    specs: [
      {
        title: "Застосування",
        items: [
          "Фасади в системах утеплення та без них",
          "Акцентні зони, фронтони, ніші",
          "Не для горизонтальних поверхонь під снігом",
        ],
      },
      {
        title: "Властивості",
        items: ["Висока механічна стійкість", "Нецементований матеріал", "Проста обробка і монтаж"],
      },
      {
        title: "Колір",
        items: ["Базовий колір — білий", "Фарбування за палітрою STO Veneer Wood та RAL", "Нанесення вручну"],
      },
    ],
    priceTable: {
      columns: { name: "Позиція", size: "Розмір дошки", color: "Колір / тон", pack: "Упаковка", price: "Ціна" },
      rows: [
        { name: "Дошка 16 см", sku: "00170-001", size: "200 × 16 см", colorName: "Білий (база)", swatch: "#EDE7DA", pack: "8 шт/уп", price: "1 240 грн/уп" },
        { name: "Дошка 16 см", sku: "00170-001", size: "200 × 16 см", colorName: "Дуб (STO Veneer Wood)", swatch: "#8C5A2E", pack: "8 шт/уп", price: "1 390 грн/уп" },
        { name: "Дошка 8 см", sku: "00170-003", size: "200 × 8 см", colorName: "Білий (база)", swatch: "#EDE7DA", pack: "4 шт/уп", price: "690 грн/уп" },
        { name: "Дошка 8 см", sku: "00170-003", size: "200 × 8 см", colorName: "Горіх (RAL)", swatch: "#4A3B2E", pack: "4 шт/уп", price: "780 грн/уп" },
      ],
    },
    comment: "Будь-який відтінок RAL або STO Veneer Wood — на замовлення. Фарбування впливає на вартість, точну ціну порахує менеджер.",
    buyLabel: "Купити StoCleyer W",
  },
  {
    id: "stoecoshape",
    tag: "Продукт 02",
    name: "StoEcoshape 20000",
    title: "StoEcoshape 20000 — еластичні панелі",
    description:
      "Готові гнучкі панелі з ідеально рівними лініями рустування. Огинають заокруглені поверхні, сумісні з системами утеплення ETICS і вентильованими фасадами.",
    images: [
      { src: "/images/products/ecoshape-3.jpg", alt: "Фасад з рельєфними панелями StoEcoshape", width: 1280, height: 720 },
      { src: "/images/products/ecoshape-2.jpg", alt: "Заокруглений фасад з панелями StoEcoshape", width: 1280, height: 720 },
      { src: "/images/products/ecoshape-1.png", alt: "Панель StoEcoshape 20000", width: 335, height: 393 },
    ],
    specs: [
      {
        title: "Застосування",
        items: ["Зовнішнє облицювання фасаду", "Системи утеплення ETICS", "Вентильовані фасади"],
      },
      {
        title: "Властивості",
        items: ["Еластична, огинає радіуси", "Підвищена ударостійкість", "Рівна геометрія рустування"],
      },
      {
        title: "Колір",
        items: ["Фарбування за палітрою StoColor System", "Нестандартні формати — на замовлення", "Нанесення вручну"],
      },
    ],
    priceTable: {
      columns: { name: "Формат рустування", size: "Розмір панелі", color: "Колір / фарбування", pack: "Од.", price: "Ціна" },
      rows: [
        { name: "Рустування 1×1 см", size: "24 × 205 см", colorName: "Білий (база StoColor)", swatch: "#F2EFE7", pack: "шт", price: "890 грн/шт" },
        { name: "Рустування 2×2 см", size: "24 × 205 см", colorName: "RAL 7016 — антрацит", swatch: "#4B4C46", pack: "шт", price: "960 грн/шт" },
        { name: "Рустування 1×2 см", size: "27 × 204 см", colorName: "RAL 1019 — сіро-бежевий", swatch: "#C7BBA0", pack: "шт", price: "1 050 грн/шт" },
        { name: "Нестандартний формат", size: "за кресленням", colorName: "За палітрою StoColor System", pack: "шт", price: "за запитом" },
      ],
    },
    comment: "Панелі фарбуються після монтажу за будь-яким кодом StoColor System — вкажіть бажаний колір у заявці.",
    buyLabel: "Купити StoEcoshape",
  },
];
