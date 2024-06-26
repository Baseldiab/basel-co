import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TLocale } from "../interfaces/global.interfaces";
// import getTranslations from "../i18n";
// import { build_meta_data } from "./util/build.meta.data";
import getTranslations from "../i18n";
import Navbar from "../components/navbar/navbar";
import { build_meta_data } from "./util/build.meta.data";
import Footer from "../components/footer/footer";

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
      <body className={inter.className}>
        <Navbar
          params={{
            locale: locale,
          }}
        />
        <main className="main_content my-6">{children}</main>
        <Footer
          params={{
            locale: locale,
          }}
        />
      </body>
    </html>
  );
}
