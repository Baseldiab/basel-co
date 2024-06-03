import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TLocale } from "../interfaces/global.interfaces";
// import getTranslations from "../i18n";
import { build_meta_data } from "./util/build.meta.data";

const inter = Inter({ subsets: ["latin"] });

export interface LocaleParams {
  locale: TLocale;
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
