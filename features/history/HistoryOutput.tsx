import { CopyButton } from "@/features/history/CopyButton";

type JsonRecord = Record<string, unknown>;

const productOutputFields = [
  ["SEO title", "seoTitle"],
  ["Short description", "shortDescription"],
  ["Long description", "longDescription"],
  ["Benefits", "bulletBenefits"],
  ["Meta title", "metaTitle"],
  ["Meta description", "metaDescription"],
  ["Tags", "tags"],
  ["Image alt text", "imageAltText"],
  ["WooCommerce HTML", "wooCommerceHtml"],
] as const;

export function HistoryOutput({
  output,
  compact = false,
}: {
  output: JsonRecord;
  compact?: boolean;
}) {
  const fields = productOutputFields
    .map(([label, key]) => ({
      label,
      value: formatOutputValue(output[key]),
    }))
    .filter((field) => field.value);

  if (!fields.length) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
        {JSON.stringify(output, null, 2)}
      </pre>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.slice(0, compact ? 3 : fields.length).map((field) => (
        <section key={field.label} className="rounded-lg bg-muted p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {field.label}
            </h3>
            <CopyButton value={field.value} />
          </div>
          <p className="whitespace-pre-wrap text-sm leading-6">{field.value}</p>
        </section>
      ))}
    </div>
  );
}

export function formatOutputValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join("\n");
  }

  if (value && typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return "";
}

export function getGenerationTitle(input: JsonRecord, fallback: string) {
  const productName = input.productName;
  const brand = input.brand;

  if (typeof productName === "string" && typeof brand === "string") {
    return `${brand} ${productName}`;
  }

  if (typeof productName === "string") {
    return productName;
  }

  return fallback;
}
