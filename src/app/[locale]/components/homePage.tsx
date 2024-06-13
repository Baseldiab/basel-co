"use client";

import { useProductStore } from "@/app/store/products";
import { Button, Col, Row, Card, Image, Input, Rate } from "antd";
import React, { useEffect, useState } from "react";
import LoadingLayout from "./layout/loading.layout";
import Link from "next/link";
import AddHomeProductDrawer from "./drawers/addHomeProductDrawer";
import { successNotification } from "./modals/notifications";
import { CartDto } from "@/app/types/cartDto";
import { useCartStore } from "@/app/store/cart";
import { ProductModel } from "@/app/types/productModel";

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

  const { sendAddToCart } = useCartStore();

  // STATES
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
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

  const AddToCart = (item: ProductModel) => {
    const payload: CartDto = {
      userId: 2,
      date: "2024-6-13",
      products: [{ productId: item.id, quantity: 1 }],
    };

    sendAddToCart(payload, item);
    successNotification("Added to cart successfully");
  };

  return isLoading ? (
    <LoadingLayout length={10} loading={true} />
  ) : (
    <section className="myContainer">
      <Row className="lg:!gap-3 gap-1.5" justify="space-between" align="top">
        <Col className="max-md:hidden flex flex-col gap-3" md={6} xl={4}>
          <Button
            onClick={() => sendGetProductsList()}
            className="uppercase font-medium text-sm lg:text-base max-w-[200px]"
          >
            All
          </Button>
          {categories.map((category: string, index: number) => (
            <Button
              key={`category-${index}`}
              onClick={() => sendGetCategoryProducts(category)}
              className="uppercase font-medium text-sm lg:text-base max-w-[200px]"
            >
              {category}
            </Button>
          ))}
        </Col>

        <Col md={17} xs={24} xl={19}>
          <Row className="w-full" justify="space-between" gutter={[8, 8]}>
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

          <Row justify={"center"} className="lg:mt-8 mt-5" gutter={[16, 16]}>
            {list.map((product: any, index: number) => (
              <Col md={12} lg={8} xl={6} sm={12} xs={24} key={`product-${index}`}>
                <Card
                  hoverable
                  className=""
                  // style={{ width: 240 }}
                  cover={
                    <div className="p-4 !flex justify-center items-center mx-auto  w-full">
                      <Image
                        className="block  rounded-t-2xl mx-auto w-auto max-w-[100%] !h-[250px]"
                        alt={`${product.title} image`}
                        src={product.image}
                      />
                    </div>
                  }
                >
                  <Meta
                    title={
                      <Link
                        href={`/product/${product.id}`}
                        className="flex justify-between items-center"
                      >
                        {product.title}
                      </Link>
                    }
                    description={
                      <>
                        <Link
                          href={`/product/${product.id}`}
                          className="flex justify-between items-center"
                        >
                          <p className="capitalize">{product.category}</p>
                          <p className="font-medium">
                            {`${product.price}`} <span className="text-red-500">$</span>
                          </p>
                        </Link>

                        <Rate
                          className="my-1"
                          disabled
                          defaultValue={Math.round(product.rating.rate * 2) / 2}
                        />

                        <Button className="mt-2" onClick={() => AddToCart(product)}>
                          Add To Cart
                        </Button>
                      </>
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
