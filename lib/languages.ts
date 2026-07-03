export const languageOptions = [
  "Greek",
  "English",
  "German",
  "French",
  "Italian",
  "Spanish",
  "Polish",
] as const;

export type LanguageOption = (typeof languageOptions)[number];

export const supportedLanguageLabels = languageOptions.join(", ");
