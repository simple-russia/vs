import React, { createContext, useContext, useEffect, useState } from "react";
import { Input, Table, notification } from "antd";
import { request } from "./utils/request";

const InventoryContext = createContext();

const ActionColumn = ({ item }) => {
  const [v, setV] = useState("0");
  const { increase, decrease } = useContext(InventoryContext);

  const onPlus = async () => {
    const res = await increase(item.id, Number(v));
    if (res) {
      setV("0");
    }
  };

  const onMinus = async () => {
    const res = await decrease(item.id, Number(v));
    if (res) {
      setV("0");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Input value={v} onChange={(e) => setV(e.target.value)} size="small" />

      <div>
        <button onClick={onPlus} style={{ width: 24 }}>
          +
        </button>
        <button onClick={onMinus} style={{ width: 24 }}>
          -
        </button>
      </div>
    </div>
  );
};

const cols = [
  {
    title: "Товар",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Кол-во на складе",
    dataIndex: "amount",
    key: "amount",
    render: (_, item) => {
      return (
        <div>
          {item.amount.toFixed(2)} {item.unit}.
        </div>
      );
    },
  },
  {
    title: "",
    render: (item) => {
      return <ActionColumn item={item} />;
    },
    width: 230,
  },
];

export const Inventory = () => {
  const [items, setItems] = useState([]);

  const refreshItems = async () => {
    const res = await request("/api/inventory/getAllInventoryItems");

    setItems(res);
  };

  const increase = async (itemId, amount) => {
    if (Number.isNaN(amount)) {
      notification.error({
        message: "Incorrect amount value",
      });
      return false;
    }

    try {
      const res = await request(
        "/api/inventory/increaseProductAmount",
        { itemId, increaseAmount: amount },
        "POST"
      );

      setItems((pr) => {
        const nw = [...pr];
        const it = nw.find((item) => item.id === itemId);
        if (it) {
          it.amount = res.amount;
        }
        return nw;
      });

      return true;
    } catch {
      return false;
    }
  };

  const decrease = async (itemId, amount) => {
    if (Number.isNaN(amount)) {
      notification.error({
        message: "Incorrect amount value",
      });
      return false;
    }

    try {
      const res = await request(
        "/api/inventory/decreaseProductAmount",
        { itemId, decreaseAmount: amount },
        "POST"
      );

        if (res.status === 400) {
          notification.error({
            message: 'Не может быть отрицательного количества'
          })
          return false;
        }

      setItems((pr) => {
        const nw = [...pr];
        const it = nw.find((item) => item.id === itemId);
        if (it) {
          it.amount = res.amount;
        }
        return nw;
      });

      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    refreshItems();
  }, []);

  return (
    <div style={{ maxWidth: 800 }}>
      <InventoryContext.Provider value={{ increase, decrease }}>
        <Table dataSource={items} columns={cols} />
      </InventoryContext.Provider>
    </div>
  );
};
