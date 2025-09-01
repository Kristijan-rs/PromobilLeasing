type Item = { label: string; value?: string | number | null | undefined };

export default function SpecList({ items }: { items: Item[] }) {
  return (
    <dl className="grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2 sm:gap-x-6">
      {items.map((it) => (
        <div key={it.label} className="flex items-baseline justify-between gap-3 sm:block">
          <dt className="text-neutral-500">{it.label}</dt>
          <dd className="font-medium">{(it.value ?? "–").toString()}</dd>
        </div>
      ))}
    </dl>
  );
}
