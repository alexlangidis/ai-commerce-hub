export type PromptTemplate = {
  slug: string;
  name: string;
  category: string;
  description: string;
  fields: string[];
};

export const promptTemplates: PromptTemplate[] = [
  {
    slug: "phone-case",
    name: "Phone case",
    category: "Mobile accessories",
    description: "For cases, covers, MagSafe cases, and protective shells.",
    fields: ["Device model", "Material", "Protection level", "Design style"],
  },
  {
    slug: "screen-protector",
    name: "Screen protector",
    category: "Mobile accessories",
    description: "For tempered glass, privacy glass, and camera protectors.",
    fields: ["Device model", "Glass type", "Hardness", "Installation kit"],
  },
  {
    slug: "charger",
    name: "Charger",
    category: "Power",
    description: "For wall chargers, car chargers, cables, and power banks.",
    fields: ["Wattage", "Ports", "Compatibility", "Safety features"],
  },
  {
    slug: "smartwatch-strap",
    name: "Smartwatch strap",
    category: "Wearables",
    description: "For silicone, leather, metal, and sport straps.",
    fields: ["Watch model", "Material", "Wrist size", "Closure type"],
  },
  {
    slug: "gaming-accessory",
    name: "Gaming accessory",
    category: "Gaming",
    description: "For controllers, headsets, grips, stands, and RGB gear.",
    fields: ["Platform", "Connection type", "Ergonomics", "Key features"],
  },
  {
    slug: "fitness-product",
    name: "Fitness product",
    category: "Fitness",
    description: "For gym accessories, wearables, recovery, and training gear.",
    fields: ["Use case", "Material", "Size/weight", "Care instructions"],
  },
  {
    slug: "beauty-product",
    name: "Beauty product",
    category: "Beauty",
    description: "For skincare, tools, cosmetics, and grooming accessories.",
    fields: ["Skin/hair type", "Ingredients", "How to use", "Warnings"],
  },
  {
    slug: "fashion-item",
    name: "Fashion item",
    category: "Fashion",
    description: "For clothing, shoes, bags, jewelry, and seasonal items.",
    fields: ["Material", "Fit", "Color options", "Styling notes"],
  },
];
