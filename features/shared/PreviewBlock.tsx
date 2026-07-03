export function PreviewBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <section className="flex flex-col gap-2 rounded-lg bg-muted p-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <p className="whitespace-pre-wrap leading-6">{value}</p>
    </section>
  );
}
