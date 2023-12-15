import React, { useState } from "react";
import { Table, Flex, Button, Modal, Form, Input, Typography, Select } from "antd";

const cols = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
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
];

export const Inventory = () => {
  return (
    <div>
      <Table dataSource={[{}]} columns={cols} />
    </div>
  );
};
