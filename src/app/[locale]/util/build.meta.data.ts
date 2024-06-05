import getTranslations from "@/app/i18n";
import { TLocale } from "@/app/interfaces/global.interfaces";
import type { Metadata } from "next";

export async function build_meta_data(locale: TLocale, routes: string[] = []): Promise<Metadata> {
    const { t } = await getTranslations(locale, ["fields"]);
  
    // Check if routes is an array
    if (!Array.isArray(routes)) {
      console.error("Expected routes to be an array, but got:", typeof routes);
      routes = []; // Fallback to an empty array if not
    }
  
    routes.push(t("app-name"));
  
    return {
      title: routes.join(" | "),
      description: t("app-description"),
      keywords: "",
    };
  }