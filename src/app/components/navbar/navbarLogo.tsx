import React from "react";
// import { Row } from "antd";
import logo from "/public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/">
      <Image className=" !max-w-[300px]" width={200} alt="logo" src={logo} />
    </Link>
  );
}
