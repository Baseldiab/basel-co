import React from "react";
// import { Row } from "antd";
import logo from "/public/images/logo.png";
import Image from "next/image";

export default function NavbarLogo() {
  return <Image className="!w-full !max-w-[300px]" width={200} alt="logo" src={logo} />;
}
