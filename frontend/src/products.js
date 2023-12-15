import React, { useState } from "react";
import { Table, Flex, Button, Modal, Form, Input, Typography } from "antd";

const cols = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: () => {
      return <img src="" alt="" />;
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: '',
    dataIndex: '',
    key: 'delete',
    render: () => {
      return <a style={{color: 'red'}} href="#">Delete</a>
    }
  }
];

export const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Flex gap={4}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Create product +
        </Button>
      </Flex>

      <Table dataSource={[{}]} columns={cols} />

      <Modal
        open={modalOpen}
        title="Create product"
        onOk={onSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            label="Product name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            rules={[{ required: true }]}
            label="Image url"
          >
            <Input />
          </Form.Item>

          <Form.Item name="unit" rules={[{ required: true }]} label="Unit">
            <Input />
          </Form.Item>

          <Form.Item name="price" rules={[{ required: true }]} label="Price">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
