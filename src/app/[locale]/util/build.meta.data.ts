import getTranslations from "@/app/i18n";
import { TLocale } from "@/app/interfaces/global.interfaces";
import { Metadata } from "next";

export async function build_meta_data(locale: TLocale, routes: string[] = []): Promise<Metadata> {
    const { t } = await getTranslations(locale, ["fields"]);
  
    routes.unshift(t("app-name"));
  
    return {
      title: routes.join(" | "),
      description: t("app-description"),
    };
  }