import getTranslations from "../i18n";
import { LocalProps } from "../interfaces/local.props.interface";
import { build_meta_data } from "./util/build.meta.data";
import HomePage from "./components/homePage";
// import { build_meta_data } from "./util/build.meta.data";

export async function generateMetadata({ params: { locale } }: LocalProps) {
  const { t } = await getTranslations(locale, ["navigation"]);

  return await build_meta_data(locale, [t("home")]);
}

export default async function Home({ params: { locale } }: LocalProps) {
  const { t } = await getTranslations(locale, ["fields"]);
  // const home_data: ProductModel[] = await get_all_products();

  // console.log(home_data);

  return (
    <main className="min-h-screen my-10">
      <HomePage />
    </main>
  );
}
