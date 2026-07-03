export function PreviewBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <section className="app-panel rounded-xl p-4">
      <h3 className="text-xs font-medium tracking-wide text-primary uppercase">
        {title}
      </h3>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{value}</p>
    </section>
  );
}
