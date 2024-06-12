"use client";

import { useProductStore } from "@/app/store/products";
import { Col, Row } from "antd";
import React, { useEffect } from "react";

export default function HomePage() {
  const { list, categories, sendGetProductsList, sendGetCategoriesList } = useProductStore();

  useEffect(() => {
    sendGetProductsList();
    sendGetCategoriesList();
  }, []);

  console.log(list, categories);

  return (
    <Row>
      <Col className="max-md:hidden" span={8}></Col>
      <Col span={12}></Col>
    </Row>
  );
}
