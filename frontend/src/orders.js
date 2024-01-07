import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Table,
  Flex,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Select,
} from "antd";
import { request } from "./utils/request";

const OrderContext = createContext();

const ActionColumn = ({ order }) => {
  const { deleteOrder } = useContext(OrderContext);
  const onDelete = () => {
    Modal.confirm({
      title: "Вы точно хотите удалить этот заказ?",
      onOk: () => {
        deleteOrder(order);
      },
    });
  };
  return (
    <a onClick={onDelete} style={{ color: "red" }} href="#">
      Удалить
    </a>
  );
};

const cols = [
  {
    title: "Товар",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Количество",
    dataIndex: "amount",
    key: "amount",
    render: (_, order) => {
      return (
        <div>
          {order.amount.toFixed(2)} {order.unit}
        </div>
      );
    },
  },
  {
    title: "Цена",
    dataIndex: "amount",
    key: "amount",
    render: (_, order) => {
      return (
        <div>
          {order.pricePerOne.toFixed(2)} руб. / {order.unit}
        </div>
      );
    },
  },
  {
    title: "Стоимость заказа",
    dataIndex: "price",
    key: "price",
    render: (_, order) => {
      return <div>{order.price} руб.</div>;
    },
  },
  {
    title: "",
    dataIndex: "",
    key: "delete",
    render: (order) => {
      return <ActionColumn order={order} />;
    },
  },
];

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [form] = Form.useForm();

  const selectedProduct = products.find((pr) => pr.id == selectedProductId);
  const productUnit = selectedProduct?.unit || null;
  const productPrice = selectedProduct?.price || null;

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      const res = await request(
        "/api/orders/order",
        { productId: values.product, amount },
        "POST"
      );

      if (res.status === 200) {
        fetchOrders();
        setModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProducts = async () => {
    const res_products = await request("/api/products/getAllProducts").then(
      (res) => {
        setProducts(res);
      }
    );
    if (res_products) {
      setProducts(res_products);
      if (res_products.length > 0) {
        setSelectedProductId(res_products[0].id);
      }
    }
  };

  const fetchOrders = async () => {
    const res = await request("/api/orders/getAllOrders");

    setOrders(res);
  };

  const deleteOrder = async (order) => {
    await request(`/api/orders/order?orderId=${order.id}`, null, "DELETE")
    fetchOrders();
  };

  useEffect(() => {
    if (modalOpen) {
      fetchProducts();
    }
  }, [modalOpen]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Flex gap={4}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Create order +
        </Button>
      </Flex>

      <OrderContext.Provider value={{ deleteOrder }}>
        <Table dataSource={orders} columns={cols} />
      </OrderContext.Provider>

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
            <Select
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e)}
            />
          </Form.Item>

          <Form.Item
            style={{ position: "relative" }}
            name="amount"
            label="Amount"
          >
            <Input
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
            <div style={{ position: "absolute", top: 4, right: 10 }}>
              {productUnit}
            </div>
          </Form.Item>

          <Typography>
            Расчет цены: {amount}
            {productUnit} * {productPrice}руб. = {amount * productPrice}руб.
          </Typography>
        </Form>
      </Modal>
    </div>
  );
};
