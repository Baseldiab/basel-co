import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TLocale } from "../interfaces/global.interfaces";
// import getTranslations from "../i18n";
// import { build_meta_data } from "./util/build.meta.data";
import getTranslations from "../i18n";
import Navbar from "../components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export interface LocaleParams {
  locale: TLocale;
}
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

interface ParamsType extends LocaleParams {}

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsType;
}): Promise<Metadata> {
  return await build_meta_data(locale);
}

// Root layout component
export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: ParamsType;
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navbar
          params={{
            locale: locale,
          }}
        />
        {children}
      </body>
    </html>
  );
}
