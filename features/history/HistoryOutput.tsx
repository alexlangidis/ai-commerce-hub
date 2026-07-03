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

const commonOutputFields = [
  ...productOutputFields,
  ["Rewritten description", "rewrittenDescription"],
  ["Summary of changes", "summaryOfChanges"],
  ["Before / after", "beforeAfterPreview"],
  ["SEO score", "seoScore"],
  ["Title suggestions", "titleSuggestions"],
  ["Missing keywords", "missingKeywords"],
  ["Improved version", "improvedVersion"],
  ["Translated content", "translatedContent"],
  ["Localization notes", "localizedNotes"],
  ["SEO keywords", "seoKeywords"],
] as const;

export function HistoryOutput({
  output,
  compact = false,
}: {
  output: JsonRecord;
  compact?: boolean;
}) {
  const fields = commonOutputFields
    .map(([label, key]) => ({
      label,
      value: formatOutputValue(output[key]),
    }))
    .filter((field) => field.value);

  if (!fields.length) {
    return (
      <pre className="app-panel overflow-x-auto rounded-xl p-3 text-xs">
        {JSON.stringify(output, null, 2)}
      </pre>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.slice(0, compact ? 3 : fields.length).map((field) => (
        <section key={field.label} className="app-panel rounded-xl p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-medium tracking-wide text-primary uppercase">
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

export function getGenerationTitle(input: JsonRecord, fallback: string) {
  const productName = input.productName;
  const brand = input.brand;

  if (typeof productName === "string" && typeof brand === "string") {
    return `${brand} ${productName}`;
  }

  if (typeof productName === "string") {
    return productName;
  }

  const title = input.title;
  const targetKeyword = input.targetKeyword;
  const mode = input.mode;

  if (typeof title === "string") {
    return title;
  }

  if (typeof targetKeyword === "string") {
    return `SEO: ${targetKeyword}`;
  }

  if (typeof mode === "string") {
    return mode;
  }

  return fallback;
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

const toolLabels: Record<string, string> = {
  "product-content-generator": "Product Generator",
  "rewrite-studio": "Rewrite Studio",
  "seo-optimizer": "SEO Optimizer",
  "translation-studio": "Translation Studio",
};

export function formatToolLabel(tool: string) {
  return toolLabels[tool] ?? tool.replace(/-/g, " ");
}

export function getGenerationPreview(output: JsonRecord, maxLength = 140) {
  for (const [, key] of commonOutputFields) {
    const value = formatOutputValue(output[key]);

    if (!value) {
      continue;
    }

    const singleLine = value.replace(/\s+/g, " ").trim();

    if (singleLine.length <= maxLength) {
      return singleLine;
    }

    return `${singleLine.slice(0, maxLength).trimEnd()}…`;
  }

  return "";
}
