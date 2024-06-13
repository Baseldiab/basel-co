import React from "react";
import { Col, Row, Image, Rate } from "antd";
import { get_single_product } from "../../../../../api/requests/getSingleProduct.request";
import { build_meta_data } from "../../util/build.meta.data";
import { LocalProps } from "@/app/interfaces/local.props.interface";
import type { DescriptionsProps } from "antd";
import { ProductModel } from "@/app/types/productModel";
import ProductDetails from "../../components/productDetails/ProductDetails";

type Props = {
  params: { id: string; locale: string };
};

export async function generateMetadata({ params: { locale } }: LocalProps) {
  // const { t } = await getTranslations(locale, ["navigation"]);

  return await build_meta_data(locale, ["Product"]);
}

export default async function ProductDetailsPage({ params: { id, locale } }: Props) {
  // GET PRODUCT DATA
  const product: ProductModel = await get_single_product(id);

  // const items: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "Title",
  //     children: <h1>{product.title}</h1>,
  //   },
  //   {
  //     key: "2",
  //     label: "Category",
  //     children: <p>{product.category}</p>,
  //   },
  //   {
  //     key: "3",
  //     label: "Price",
  //     children: <p>{product.price}</p>,
  //   },
  //   {
  //     key: "4",
  //     label: "Description",
  //     children: <p>{product.description}</p>,
  //   },
  // ];

  return (
    <>
      {product && (
        <section className="myContainer">
          <Row justify={"space-between"} align={"top"}>
            <Col md={8} xs={24} className="flex justify-center items-center mx-auto my-3">
              <Image
                className="block  rounded-t-2xl mx-auto w-auto max-w-[100%] !h-[250px]"
                alt={`${product.title} image`}
                src={product.image}
              />
            </Col>
            <Col md={15} xs={24}>
              <h1 className="font-bold text-lg mb-3">{product.title}</h1>
              <h5 className="text-gray-500 text-base my-1">{`$ ${product.price}`}</h5>
              <h5 className="text-gray-500 text-base my-1">{product.category}</h5>

              <Rate
                className="my-1"
                disabled
                defaultValue={Math.round(product.rating.rate * 2) / 2}
              />

              <p className="text-gray-600 text-base my-2">{product.description}</p>
              {/* <Descriptions title="User Info" items={items} /> */}
              <ProductDetails item={product} />
            </Col>
          </Row>
        </section>
      )}
    </>
  );
}
