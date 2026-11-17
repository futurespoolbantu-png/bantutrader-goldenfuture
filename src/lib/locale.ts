import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export type Language = "en" | "pt";
export const languageSearch = zodValidator(z.object({
  lang: fallback(z.string(), "").optional(),
}));
export function resolveLanguage(value: unknown): Language {
  return value === "pt" ? "pt" : "en";
}
export function languageFromMatches(matches: ReadonlyArray<{ search: unknown }>): Language {
  const search = matches.at(-1)?.search;
  return resolveLanguage(search && typeof search === "object" && "lang" in search ? search.lang : undefined);
}