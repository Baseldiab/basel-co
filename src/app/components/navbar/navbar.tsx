import { LocalProps } from "@/app/interfaces/local.props.interface";

import React from "react";
import { Row } from "antd";

const Navbar = ({ params: { locale } }: LocalProps) => {
  return (
    <nav>
      <Row></Row>
    </nav>
  );
};

export default Navbar;
