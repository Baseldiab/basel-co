"use client";

import React, { useCallback, useMemo } from "react";
import { Button, Col, Drawer, Form, Input, Row, Space, InputNumber, Upload } from "antd";
import { useProductStore } from "@/app/store/products";
import { ProductDto } from "@/app/types/productDto";
import { PlusOutlined } from "@ant-design/icons";

// const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddHomeProductDrawer({ open, onClose }: Props) {
  const { sendAdd } = useProductStore();
  const [form] = Form.useForm();

  const onSubmit = useCallback(
    (v: ProductDto) => {
      sendAdd(v);
      onClose();
      // console.log(v);
    },
    [form, sendAdd, onClose]
  );

  const initialValue = useMemo(() => {
    const init = {
      // photo: "",
      category: "",
      title: "",
      description: "",
      price: 0,
    };

    Object.keys(init).forEach((e) =>
      form.setFieldValue(e as keyof typeof init, init[e as keyof typeof init])
    );

    return init;
  }, []);

  return (
    <>
      <Drawer
        title="Add New Product"
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
            <Col span={24} className="flex justify-center items-center">
              <Upload action="/upload.do" listType="picture-card">
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Col>

            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter Product title" }]}
              >
                <Input placeholder="Please enter Product title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "required" }]}
              >
                <InputNumber addonBefore="+" addonAfter="$" defaultValue={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Please enter Product category" />
              </Form.Item>
            </Col>

            {/* <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter Product title" }]}
              >
                <Input placeholder="Please enter Product title" />
              </Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
