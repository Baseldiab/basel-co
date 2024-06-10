import { LocalProps } from "@/app/interfaces/local.props.interface";

import { Col, Row } from "antd";
import NavbarLogo from "./navbarLogo";
import NavDesktop from "./navDesktop";

const Navbar = ({ params: { locale } }: LocalProps) => {
  return (
    <nav>
      <NavDesktop />
    </nav>
  );
};

export default Navbar;
