import React from "react";
import { Button, Col, Row, Card, Image, Input } from "antd";
import { get_single_product } from "../../../../../api/requests/getSingleProduct.request";

type Props = {
  params: { id: string; locale: string };
};

export default async function ProductDetails({ params: { id, locale } }: Props) {
  const product = await get_single_product(id);

  return (
    <>
      <header className="myContainer">
        <h1>{product.title}</h1>
      </header>

      <section>
        <Row gutter={[8, 8]} justify={"space-between"} align={"top"}>
          <Col md={8} xs={24}>
            <Image
              className="block  rounded-t-2xl mx-auto w-auto max-w-[100%] !h-[250px]"
              alt={`${product.title} image`}
              src={product.image}
            />
          </Col>
          <Col md={16} xs={24}>
            <h5>{product.price}</h5>
            <h5>{product.category}</h5>
            <h2>{product.description}</h2>
          </Col>
        </Row>
      </section>
    </>
  );
}
