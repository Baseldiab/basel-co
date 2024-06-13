"use client";

import React, { useCallback, useMemo } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, InputNumber, Upload } from "antd";
import { useProductStore } from "@/app/store/products";
import { ProductDto } from "@/app/types/productDto";
import { PlusOutlined } from "@ant-design/icons";
import { ProductModel } from "@/app/types/productModel";
import { useCartStore } from "@/app/store/cart";
import { CartDto } from "@/app/types/cartDto";
import { successNotification } from "../modals/notifications";

// const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  item: ProductModel;
};

export default function EditCartItemDrawer({ open, onClose, item }: Props) {
  const { sendUpdateCart } = useCartStore();
  const [form] = Form.useForm();

  const onSubmit = useCallback(
    (v: { quantity: number }) => {
      const payload: CartDto = {
        userId: 2,
        date: "2024-6-13",
        products: [{ productId: item.id, quantity: v.quantity }],
      };

      sendUpdateCart(payload, item.id, v.quantity);
      onClose();
      successNotification("Updated cart successfully");
    },
    [form, sendUpdateCart, onClose]
  );

  const initialValue = useMemo(() => {
    const init = {
      quantity: item?.quantity ?? 1,
    };

    Object.keys(init).forEach((e) =>
      form.setFieldValue(e as keyof typeof init, init[e as keyof typeof init])
    );

    return init;
  }, []);

  return (
    <>
      {item && (
        <Drawer
          title="Update cart"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={form.submit} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form
            layout="vertical"
            form={form}
            initialValues={initialValue}
            onFinish={onSubmit}
            size={"large"}
          >
            <Row gutter={16}>
              <h2 className="font-bold mb-2">{item?.title}</h2>
              <Col span={24}>
                <Form.Item
                  name="quantity"
                  label="quantity"
                  rules={[{ required: true, message: "required" }]}
                >
                  <InputNumber addonBefore="+" addonAfter="$" defaultValue={0} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      )}
    </>
  );
}
