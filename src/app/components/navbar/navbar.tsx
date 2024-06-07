import { LocalProps } from "@/app/interfaces/local.props.interface";

import { Col, Row } from "antd";
import NavbarLogo from "./navbarLogo";

const Navbar = ({ params: { locale } }: LocalProps) => {
  return (
    <nav>
      <Row>
        <Col span={8}>
          <NavbarLogo />
        </Col>
        <Col span={8}></Col>
        <Col span={8}></Col>
      </Row>
    </nav>
  );
};

export default Navbar;
