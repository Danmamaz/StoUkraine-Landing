import type { HeroContent, LeadFormContent, ReferencesContent } from "./types";

/*
 * TEST DATA. Only the first hero photo is real client content; texts were
 * drafted for the layout and will be replaced by the client in the CMS.
 */

export const hero: HeroContent = {
  eyebrow: "Фасадні рішення STO",
  title: "Фасад з фактурою дерева та чіткою геометрією",
  lead:
    "StoCleyer W відтворює природну текстуру деревини, StoEcoshape 20000 — готові еластичні панелі з рівними лініями рустування. Обидва матеріали працюють у системах утеплення і фарбуються в будь-який колір палітри STO.",
  images: [
    {
      image: {
        src: "/images/products/cleyer-hero.jpg",
        alt: "Багатоповерховий будинок з фасадом під дерево StoCleyer W",
        width: 912,
        height: 918,
      },
      caption: "StoCleyer W",
    },
    {
      image: {
        src: "/images/products/ecoshape-2.jpg",
        alt: "Заокруглений фасад з рельєфними панелями StoEcoshape",
        width: 1280,
        height: 720,
      },
      caption: "StoEcoshape 20000",
    },
  ],
  ctas: [
    { label: "StoCleyer W", href: "#stocleyer-w" },
    { label: "StoEcoshape 20000", href: "#stoecoshape" },
  ],
};

const img = (src: string, alt: string, width: number, height: number) => ({ src, alt, width, height });

export const references: ReferencesContent = {
  tag: "Референції",
  title: "Реалізовані об'єкти",
  text: "Фасади з StoCleyer W та StoEcoshape 20000. Натисніть на об'єкт, щоб переглянути всі фото.",
  items: [
    {
      id: "pryvatnyi-budynok",
      title: "Приватний будинок",
      caption: "Фасад з імітацією дерева StoCleyer W",
      productId: "stocleyer-w",
      images: [
        img("/images/references/ref-1.jpg", "Приватний будинок з фасадом StoCleyer W", 563, 750),
        img("/images/products/cleyer-2.jpg", "Деталь дощок StoCleyer W", 1024, 683),
        img("/images/products/cleyer-1.jpg", "Будинок з білим фасадом під дерево", 1024, 683),
      ],
    },
    {
      id: "zamiskyi-obiekt",
      title: "Заміський об'єкт",
      caption: "Дерев'яна текстура в системі утеплення",
      productId: "stocleyer-w",
      images: [
        img("/images/references/ref-2.jpg", "Заміський будинок з фасадом під дерево", 533, 355),
        img("/images/products/cleyer-3.jpg", "Схема системи утеплення з дошками StoCleyer W", 1024, 581),
      ],
    },
    {
      id: "stotherm-wood",
      title: "Житловий комплекс",
      caption: "Дошки StoCleyer W на всій площі фасаду",
      productId: "stocleyer-w",
      images: [
        img("/images/references/ref-3.jpg", "Фасад StoTherm Wood", 533, 355),
        img("/images/products/cleyer-hero.jpg", "Багатоповерховий будинок з фасадом під дерево", 912, 918),
      ],
    },
    {
      id: "bahatokvartyrnyi",
      title: "Багатоквартирний будинок",
      caption: "Рельєфні панелі StoEcoshape на фасаді",
      productId: "stoecoshape",
      images: [
        img("/images/references/ref-4.jpg", "Багатоквартирний будинок з панелями StoEcoshape", 519, 381),
        img("/images/products/ecoshape-2.jpg", "Заокруглений фасад з панелями StoEcoshape", 1280, 720),
      ],
    },
    {
      id: "komertsiina-budivlia",
      title: "Комерційна будівля",
      caption: "Панелі з рустуванням 2×2 см",
      productId: "stoecoshape",
      images: [
        img("/images/references/ref-5.jpeg", "Комерційна будівля з панелями StoEcoshape", 598, 845),
        img("/images/products/ecoshape-3.jpg", "Фасад з рельєфними панелями крупним планом", 1280, 720),
      ],
    },
    {
      id: "rekonstruktsiia",
      title: "Реконструкція фасаду",
      caption: "StoEcoshape 20000, пофарбовано за StoColor",
      productId: "stoecoshape",
      images: [
        img("/images/references/ref-6.jpg", "Реконструйований фасад зі StoEcoshape 20000", 227, 381),
        img("/images/products/ecoshape-1.png", "Панель StoEcoshape 20000", 335, 393),
      ],
    },
  ],
};

export const leadForm: LeadFormContent = {
  anchor: "zayavka",
  tag: "Заявка",
  title: "Замовте розрахунок або консультацію",
  text: "Залиште контакти — менеджер зателефонує, підбере матеріал і порахує вартість для вашого об'єкта.",
  requiredHint: "Поля, позначені *, обов'язкові.",
  optionalHint: "(необов'язково)",
  fields: {
    name: { label: "Ім'я", error: "Вкажіть ваше ім'я" },
    phone: { label: "Номер телефону", placeholder: "+380 __ ___ __ __", error: "Вкажіть номер у форматі +380 XX XXX XX XX" },
    email: { label: "Пошта", error: "Перевірте адресу пошти" },
    product: { label: "Продукція", emptyOption: "— Не обрано —" },
    notes: { label: "Примітки", placeholder: "Напишіть, що вас цікавить" },
  },
  submitLabel: "Надіслати",
  sendingLabel: "Надсилаємо…",
  success: {
    title: "Дякуємо, заявку отримано",
    text: "Менеджер зв'яжеться з вами найближчим часом у робочий час.",
    again: "Надіслати ще одну",
  },
  errorText: "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.",
  privacyNote: "Натискаючи «Надіслати», ви погоджуєтесь на обробку контактних даних для зв'язку з вами.",
};
