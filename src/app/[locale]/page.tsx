import Image from "next/image";
import getTranslations from "../i18n";
import { LocalProps } from "../interfaces/local.props.interface";
import { build_meta_data } from "./util/build.meta.data";
// import { build_meta_data } from "./util/build.meta.data";

export async function generateMetadata({ params: { locale } }: LocalProps) {
  const { t } = await getTranslations(locale, ["navigation"]);

  return await build_meta_data(locale, [t("home")]);
}

export default async function Home({ params: { locale } }: LocalProps) {
  const { t } = await getTranslations(locale, ["fields"]);

  return <main className="flex min-h-screen flex-col items-center justify-between"></main>;
}
