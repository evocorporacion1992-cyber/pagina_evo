import { Locale } from "./types";

export function detectLocale(acceptLanguageHeader?: string | null): Locale {
  const value = acceptLanguageHeader?.toLowerCase() ?? "";

  if (value.includes("es")) {
    return "es";
  }

  if (value.includes("en")) {
    return "en";
  }

  return "es";
}
