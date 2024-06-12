"use client";

import { useProductStore } from "@/app/store/products";
import { Button, Col, Row, Card, Image, Input } from "antd";
import React, { useEffect, useState } from "react";
import LoadingLayout from "./layout/loading.layout";
import Link from "next/link";
import AddHomeProductDrawer from "./drawers/addHomeProductDrawer";

const { Meta } = Card;
const { Search } = Input;

export default function HomePage() {
  //   STORE
  const {
    list,
    categories,
    sendGetProductsList,
    sendGetCategoriesList,
    sendGetCategoryProducts,
    sendGetSearchList,
  } = useProductStore();

  // STATES
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onSearch = () => {
    sendGetSearchList(searchQuery);
  };

  // DRAWER
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (searchQuery === "") sendGetProductsList();
  }, [searchQuery]);

  useEffect(() => {
    sendGetProductsList();
    sendGetCategoriesList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // console.log(list, categories);

  return isLoading ? (
    <LoadingLayout length={10} loading={true} />
  ) : (
    <section className="myContainer">
      <Row className="!gap-3" justify="space-between" align="top">
        <Col className="max-md:hidden flex flex-col gap-3" span={4}>
          <Button onClick={() => sendGetProductsList()} className="uppercase font-medium">
            All
          </Button>
          {categories.map((category: string, index: number) => (
            <Button
              key={`category-${index}`}
              onClick={() => sendGetCategoryProducts(category)}
              className="uppercase font-medium"
            >
              {category}
            </Button>
          ))}
        </Col>

        <Col md={19} xs={24}>
          <Row className="w-full" justify="space-between">
            <Col>
              <Search
                placeholder="search for products"
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={onSearch}
                allowClear
                style={{ width: 280 }}
              />
            </Col>

            <Col>
              <Button onClick={showDrawer}>Add New</Button>
            </Col>
          </Row>

          <Row justify={"space-between"} className="mt-8" gutter={[16, 16]}>
            {list.map((product: any, index: number) => (
              <Col md={8} sm={12} xs={24} key={`product-${index}`}>
                <Card
                  hoverable
                  className=""
                  // style={{ width: 240 }}
                  cover={
                    <div className="p-4 flex justify-center items-center">
                      <Image
                        className="block  rounded-t-2xl mx-auto w-auto max-w-[100%] !h-[250px]"
                        alt={`${product.title} image`}
                        src={product.image}
                      />
                    </div>
                  }
                >
                  <Meta
                    title={product.title}
                    description={
                      <Link
                        href={`/product/${product.id}`}
                        className="flex justify-between items-center"
                      >
                        <span className="capitalize">{product.category}</span>
                        <span className="font-medium">{`${product.price}$`}</span>
                      </Link>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <AddHomeProductDrawer open={openDrawer} onClose={onClose} />
    </section>
  );
}
