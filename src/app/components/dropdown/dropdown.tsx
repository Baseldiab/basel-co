// "use client";

import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { CiFaceSmile } from "react-icons/ci";

import type { MenuProps } from "antd";
import { Dropdown, Space, Button } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <CiFaceSmile />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

export default function DropdownItem() {
  return (
    <Dropdown menu={{ items }}>
      <Button type={"link"}>
        <Space>
          Hover me
          <FaAngleDown />
        </Space>
      </Button>
    </Dropdown>
  );
}
