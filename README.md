# STO Ukraine — лендінг StoCleyer W + StoEcoshape 20000

Односторінковий лендінг двох фасадних продуктів STO Ukraine. Працюватиме на підшляху домену sto-ukraine.com
(Cloudflare Worker проксіює на Vercel, WordPress не чіпаємо).

**Поточний етап — Частина 1 (верстка на тестових даних):** без Sanity і без реальної відправки листів.
Інтеграції (Sanity, Resend, Upstash, SEO, інфраструктура) — Частина 2.

## Стек

- **Next.js 15** (App Router, статична генерація), **React 19**, TypeScript
- **Tailwind CSS 3** — дизайн-токени в `src/styles/tokens.ts` (чорний `#231F20`, жовтий `#FDD313` з логотипу, білий)
- **Framer Motion**, **Lucide React**
- Шрифти: Inter (текст), Manrope (заголовки)

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

`NEXT_PUBLIC_BASE_PATH` — підшлях, на якому живе лендінг (наприклад `/fasad`). Порожньо = корінь.

## Структура сторінки

| Секція | Компонент | Що робить |
|---|---|---|
| Header | `layout/Header` | Логотип, якорі, клікабельний телефон, «Замовити розрахунок» → форма |
| Hero | `sections/Hero` | Інтро до обох продуктів, дві кнопки-якорі |
| Продукт ×2 | `sections/ProductSection` | Опис, 3 фото (lightbox), застосування / властивості / колір, таблиця цін (картки на мобільному), коментар, «Купити» |
| Референції | `sections/References` | Картки об'єктів; клік → центрований lightbox з усіма фото об'єкта (стрілки, свайп, Esc, ×) |
| Заявка + контакти | `sections/LeadSection`, `form/LeadForm` | Ім'я*, прізвище*, телефон* (маска +380), пошта, продукція, чіпси «Сфера / Тип об'єкта» (мультивибір), примітки; honeypot |
| Footer | `layout/Footer` | Контакти (Жовква, Львів), навігація |
| Віджет | `layout/MessengerWidget` | Внизу справа: Telegram / WhatsApp / Viber (без телефону — він у хедері) |

«Купити» не має кошика: прокручує до форми й підставляє продукт у поле «Продукція» (`form/LeadFormContext`).

## Контент

- Компоненти беруть контент **лише** через `src/lib/data.ts`. У Частині 2 там з'являться GROQ-запити, решта коду не зміниться.
- Типи в `src/content/types.ts` повторюють майбутні документи Sanity.
- Жодних текстів у JSX — усе в `src/content/*` (згодом у Sanity). Рядки таблиці цін можна додавати й видаляти.
- **Тестові дані:** реальне лише перше фото Hero (`cleyer-hero.jpg`). Решта фото взята з sto-ukraine.com як заглушки, тексти й ціни — приклади.

## Частина 2 — TODO

- `src/lib/lead.ts` → POST на `api/lead` (Resend, rate limit через Upstash, IP через Worker, UTM, час за Києвом)
- Sanity: схеми (siteSettings, landingPage, product + priceTable, reference, leadForm), Studio, revalidate
- SEO: OG-зображення, schema.org Product, sitemap, canonical на домені STO
