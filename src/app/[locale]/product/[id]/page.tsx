import React from "react";
import { get_single_product } from "../../../../../api/requests/getSingleProduct.request";

type Props = {
  params: { id: string; locale: string };
};

export default async function ProductDetails({ params: { id, locale } }: Props) {
  const product = await get_single_product(id);

  return (
    <>
      <header>{id}</header>
    </>
  );
}
