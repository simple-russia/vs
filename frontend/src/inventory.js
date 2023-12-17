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
    title: "Product",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
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
