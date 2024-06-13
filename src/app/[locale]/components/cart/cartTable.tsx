"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Image, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useCartStore } from "@/app/store/cart";
import { ProductModel } from "@/app/types/productModel";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { orange, red } from "@ant-design/colors";
import Link from "next/link";
import ConfirmationModal from "../modals/confirmation";
import { successNotification } from "../modals/notifications";
import EditCartItemDrawer from "../drawers/editCartItem.drawer";

interface DataType {
  id: string | number;
  image: string;
  title: string;
  price: string;
  quantity: number;
  total: number;
  category?: string;
  description?: string;
}

export default function CartTable() {
  // STATES
  const [OpenConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<DataType>(null as any);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // STORE
  const { localStorageList, sendDeleteItemCart, calculateTotalPrice, totalPrice, sendGetList } = useCartStore();

  // ANT TABLE
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image width={50} className="!max-w-[50px]" alt="product image" src={image} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (title: string) => <Link href={""}>{title}</Link>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },

    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space size="middle">
          <Button
            onClick={(e) => {
              setCartItem(row);
              setOpenDrawer(true)
            }}
            size="small"
            type="text"
            shape="circle"
            icon={<EditOutlined style={{ color: orange[6] }} />}
          />
          <Button
            onClick={(e) => {
              setCartItem(row);
              setOpenConfirmationModal(true);
            }}
            size="small"
            type="text"
            shape="circle"
            icon={<DeleteOutlined style={{ color: red[6] }} />}
          />
        </Space>
      ),
    },
  ];

  const data: DataType[] = useMemo(
    () =>
      localStorageList.map((product: ProductModel) => ({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: product.quantity ?? 1,
        total: Number(product.quantity) * Number(product.price),
      })),
    [localStorageList]
  );

  const handleOk = () => {
    setConfirmLoading(true);

    if (cartItem) sendDeleteItemCart(cartItem.id as any);

    setTimeout(() => {
      setOpenConfirmationModal(false);
      setConfirmLoading(false);
    }, 2000);

    successNotification("Deleted item successfully");
  };

  const handleCancel = () => {
    setOpenConfirmationModal(false);
  };

  // EDIT DRAWER
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  // GET DATA
  useEffect(() => {
    sendGetList();
  }, []);
  
  useEffect(() => {
    calculateTotalPrice();
  }, [localStorageList]);

  return (
    <section className="myContainer">
      <Table columns={columns} pagination={false} dataSource={data} />
      <div className="flex justify-center rounded items-center border border-green-700 border-spacing-2">
        <span>{"Subtotal: "}</span> <span className="font-bold">{totalPrice}</span>
      </div>
      <ConfirmationModal
        confirmLoading={confirmLoading}
        open={OpenConfirmationModal}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <EditCartItemDrawer item={cartItem as any} open={openDrawer} onClose={onClose} />
    </section>
  );
}
