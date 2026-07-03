import { InfoPanel } from "@/components/app/info-panel";
import { PageHeader } from "@/components/app/page-header";
import { PageShell } from "@/components/app/page-shell";
import { ProductContentGeneratorForm } from "@/features/product-content-generator/ProductContentGeneratorForm";

const outputs = [
  "SEO title",
  "Short and long description",
  "Bullet benefits",
  "Meta title and description",
  "Tags and image alt text",
  "WooCommerce HTML",
];

export default function ProductGeneratorPage() {
  return (
    <PageShell>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <PageHeader
          eyebrow="Product Content Generator"
          title="Turn product facts into reusable commerce content."
          description="Add your product details, choose tone and language, then generate structured output saved to history."
          className="h-full"
        />

        <InfoPanel
          title="Generated outputs"
          description="Each submit saves version one to history."
        >
          <ul className="flex flex-col gap-3">
            {outputs.map((output) => (
              <li key={output} className="tool-check-item">
                <span className="tool-check-icon">✓</span>
                <span>{output}</span>
              </li>
            ))}
          </ul>
        </InfoPanel>
      </section>

      <ProductContentGeneratorForm />
    </PageShell>
  );
}
