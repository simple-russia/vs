import "./App.css";
import { Button, Modal, Tabs, Form, Input } from "antd";
import { Products } from "./products";
import { Orders } from "./orders";
import { Inventory } from "./inventory";
import { useState } from "react";

const tabItems = [
  {
    key: "products",
    label: "Товары",
    children: <Products />,
  },
  {
    key: "orders",
    label: "Заказы",
    children: <Orders />,
  },
  {
    key: "inventory",
    label: "Инвентарь",
    children: <Inventory />,
  },
];

function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <div className="App">
      <div>
        <Button onClick={() => setLoginModalOpen(true)} type="primary">
          Войти в учетную запись
        </Button>
      </div>

      <Tabs items={tabItems} />

      <Modal
        open={loginModalOpen}
        onOk={() => {}}
        onCancel={() => setLoginModalOpen(false)}
        title="Log in"
      >
        <Form form={form}>
          <Form.Item
            name="username"
            rules={[{ required: true }]}
            label="Username"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true }]}
            label="Password"
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
