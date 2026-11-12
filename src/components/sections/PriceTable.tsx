import type { PriceRow, PriceTable as PriceTableData } from "@/content/types";

function Swatch({ row }: { row: PriceRow }) {
  if (!row.swatch) return null;
  return (
    <span aria-hidden className="inline-block h-4 w-4 shrink-0 rounded-full ring-1 ring-inset ring-ink/15" style={{ backgroundColor: row.swatch }} />
  );
}

/** Table on md+, stacked cards on phones (no horizontal scrolling) */
export default function PriceTable({ table, caption }: { table: PriceTableData; caption: string }) {
  const { columns: c, rows } = table;
  return (
    <>
      <div className="hidden overflow-hidden rounded-card border border-line bg-white md:block">
        <table className="w-full border-collapse text-left text-[14.5px]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-ink text-white">
              {[c.name, c.size, c.color, c.pack, c.price].map((h, i) => (
                <th key={h} scope="col" className={`px-5 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] ${i === 4 ? "text-right" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-line transition-colors first:border-none hover:bg-sand">
                <th scope="row" className="px-5 py-4 align-top font-semibold text-ink">
                  {r.name}
                  {r.sku && <span className="mt-0.5 block text-[12.5px] font-normal text-ink-muted">Арт. {r.sku}</span>}
                </th>
                <td className="px-5 py-4 align-top text-ink-soft">{r.size}</td>
                <td className="px-5 py-4 align-top text-ink-soft">
                  <span className="inline-flex items-center gap-2.5">
                    <Swatch row={r} />
                    {r.colorName}
                  </span>
                </td>
                <td className="px-5 py-4 align-top text-ink-soft">{r.pack}</td>
                <td className="whitespace-nowrap px-5 py-4 text-right align-top font-display text-[15.5px] font-bold text-ink">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 md:hidden" aria-label={caption}>
        {rows.map((r, i) => (
          <li key={i} className="rounded-card border border-line bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <p className="font-semibold text-ink">
                {r.name}
                {r.sku && <span className="block text-[12.5px] font-normal text-ink-muted">Арт. {r.sku}</span>}
              </p>
              <p className="whitespace-nowrap font-display text-[16px] font-bold text-ink">{r.price}</p>
            </div>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-line pt-3 text-[14px]">
              <dt className="text-ink-muted">{c.size}</dt>
              <dd className="text-ink-soft">{r.size}</dd>
              <dt className="text-ink-muted">{c.color}</dt>
              <dd className="flex items-center gap-2 text-ink-soft">
                <Swatch row={r} />
                {r.colorName}
              </dd>
              <dt className="text-ink-muted">{c.pack}</dt>
              <dd className="text-ink-soft">{r.pack}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
