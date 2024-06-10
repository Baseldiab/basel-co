import React from "react";
import { Col, Row } from "antd";
import NavbarLogo from "./navbarLogo";
import DropdownItem from "../dropdown/dropdown";

export default function NavDesktop() {
  return (
    <Row className={"myContainer"}>
      {/* RIGHT SIDE OF NAV KIDS , WOMEN */}
      <Col span={10}>
        <DropdownItem />
      </Col>

      {/* LOGO */}
      <Col span={4}>
        <NavbarLogo />
      </Col>

      {/* LEFT SIDE OF NAV CART, WISH AND LOGIN */}
      <Col span={10}></Col>
    </Row>
  );
}
