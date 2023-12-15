import React, { useState } from "react";
import { Table, Flex, Button, Modal, Form, Input, Typography, Select } from "antd";

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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
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

export const Orders = () => {
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
          Create order +
        </Button>
      </Flex>

      <Table dataSource={[{}]} columns={cols} />

      <Modal
        open={modalOpen}
        title="Create ordert"
        onOk={onSubmit}
        onCancel={() => setModalOpen(false)}
      >
        <Form form={form}>
          <Form.Item
            name="product"
            rules={[{ required: true }]}
            label="Product"
          >
            <Select />
          </Form.Item>

          <Form.Item name="amount" rules={[{ required: true }]} label="Amount">
            <Input />
          </Form.Item>

          <Typography>Total price: {5}{'шт.'} * {10}руб. = {50}руб.</Typography>
        </Form>
      </Modal>
    </div>
  );
};
