import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { request } from "./utils/request";

const ActionColumn = ({ item }) => {
  return (
    <div style={{ display: "flex" }}>
      <Input size="small" />

      <div>
        <button style={{width: 24}}>+</button>
        <button style={{width: 24}}>-</button>
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
      return <div>{item.amount} {item.unit}.</div>
    }
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

  useEffect(() => {
    refreshItems();
  }, []);

  return (
    <div style={{maxWidth: 800}}>
      <Table dataSource={items} columns={cols} />
    </div>
  );
};
