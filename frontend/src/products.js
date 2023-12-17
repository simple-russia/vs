import React, { createContext, useContext, useEffect, useState } from "react";
import { Table, Flex, Button, Modal, Form, Input, notification } from "antd";
import { request } from "./utils/request";

const ProductsContext = createContext();

const ActionColumn = ({ productId }) => {
  const { deleteProduct, openEditProduct } = useContext(ProductsContext);
  return (
    <Flex gap={20}>
      <a
        style={{ color: "red" }}
        onClick={() => deleteProduct(productId)}
        href="#"
      >
        Delete
      </a>
      <a onClick={() => openEditProduct()}>Edit</a>
    </Flex>
  );
};

const cols = [
  {
    title: "Продукт",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Цена руб.",
    dataIndex: "price",
    key: "price",
    render: (pr) => {
      return `${pr} руб.`
    }
  },
  {
    title: "Ед. измерения",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "",
    dataIndex: "",
    key: "delete",
    render: (product) => {
      return <ActionColumn productId={product.id} />;
    },
  },
];

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const refershProducts = () => {
    request("/api/products/getAllProducts").then((res) => {
      setProducts(res);
    });
  };

  const deleteProduct = async (productId) => {
    Modal.confirm({
      title: "Вы тоочно хоитите удалить продукт?",
      type: "error",
      onOk: async () => {
        const response = await request(
          `/api/products/product?id=${productId}`,
          "",
          "DELETE"
        );
        if (response.status !== 200) {
          notification.error({
            message: `Error HTTP ${response.status}`,
          });
        } else {
          refershProducts();
        }
      },
    });
  };

  const openEditProduct = () => {};

  useEffect(() => {
    refershProducts();
  }, []);

  const onSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      console.log(formValues);
      const res = await request('/api/products/product', formValues, 'POST');

      if (res.status === 200) {
        setModalOpen(false);
        refershProducts();
      } else {
        notification.error({
          message: `Error HTTP ${res.status}`
        })
      }

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

        <Button type="primary" onClick={refershProducts}>
          Refresh
        </Button>
      </Flex>

      <ProductsContext.Provider value={{ deleteProduct, openEditProduct }}>
        <Table dataSource={products} columns={cols} />
      </ProductsContext.Provider>

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
