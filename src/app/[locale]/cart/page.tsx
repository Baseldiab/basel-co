import React from "react";
import { build_meta_data } from "../util/build.meta.data";
import { LocalProps } from "@/app/interfaces/local.props.interface";
import CartTable from "../components/cart/cartTable";

export async function generateMetadata({ params: { locale } }: LocalProps) {
  // const { t } = await getTranslations(locale, ["navigation"]);

  return await build_meta_data(locale, ["Cart"]);
}

export default function CartPage() {
  return (
    <>
      <CartTable />
    </>
  );
}
