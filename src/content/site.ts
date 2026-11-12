import type { SiteSettings } from "./types";

const PHONE_DIGITS = "380960221105";

export const site: SiteSettings = {
  companyName: "STO Ukraine",
  logo: {
    header: { src: "/images/brand/logo-mark.png", alt: "STO", width: 1024, height: 173 },
    footer: { src: "/images/brand/logo-full.png", alt: "STO — Будувати свідомо.", width: 1024, height: 272 },
  },
  phone: { display: "+38 096 022 11 05", e164: `+${PHONE_DIGITS}` },
  email: "stoexpert.ukraine@gmail.com",
  addresses: [
    {
      city: "Жовква",
      lines: ["вул. Лісна, 2В"],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Жовква,+вул.+Лісна,+2В",
    },
    {
      city: "Львів",
      lines: ["вул. Дорожня, 58", "логістичний центр Port"],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Львів,+вул.+Дорожня,+58",
    },
  ],
  messengers: [
    { kind: "telegram", label: "Telegram", href: `https://t.me/+${PHONE_DIGITS}` },
    { kind: "whatsapp", label: "WhatsApp", href: `https://wa.me/${PHONE_DIGITS}` },
    { kind: "viber", label: "Viber", href: `viber://chat?number=%2B${PHONE_DIGITS}` },
  ],
  nav: [
    { label: "StoCleyer W", href: "#stocleyer-w" },
    { label: "StoEcoshape 20000", href: "#stoecoshape" },
    { label: "Референції", href: "#referencii" },
    { label: "Контакти", href: "#kontakty" },
  ],
  header: {
    ctaLabel: "Замовити розрахунок",
    menuOpenLabel: "Відкрити меню",
    menuCloseLabel: "Закрити меню",
  },
  messengerWidget: {
    title: "Напишіть нам",
    text: "Оберіть зручний месенджер — відповімо найближчим часом.",
    openLabel: "Написати в месенджер",
    closeLabel: "Закрити",
  },
  footer: {
    contactsTitle: "Контакти",
    navTitle: "Навігація",
    note: "Технічні характеристики та ціни уточнюйте у менеджера перед замовленням.",
    copyright: "© 2026 STO Ukraine. Будувати свідомо.",
  },
  seo: {
    title: "StoCleyer W та StoEcoshape 20000 — фасадні рішення STO",
    description:
      "Імітація дерева StoCleyer W та еластичні фасадні панелі StoEcoshape 20000. Ціни, характеристики, реалізовані об'єкти. Консультація та розрахунок від STO Ukraine.",
  },
  labels: {
    phone: "Телефон",
    email: "Пошта",
    writeIn: "Написати в",
    lightbox: {
      open: "Відкрити фото",
      close: "Закрити",
      prev: "Попереднє фото",
      next: "Наступне фото",
      photos: "фото",
    },
  },
};
