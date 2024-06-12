import React from "react";
import NavbarLogo from "./navbarLogo";
// import DropdownItem from "../dropdown/dropdown";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";

export default function NavDesktop() {
  return (
    <div className="myContainer flex justify-between items-center py-4 bg-gray-100 shadow-lg">
      <NavbarLogo />
      <div className="flex justify-between items-center gap-5">
        <Link className="text-base font-bold" href={"/"}>
          {"Products"}
        </Link>
        <Link href={"/cart"}>
          <FaCartArrowDown className="text-lg" />
        </Link>
      </div>
    </div>
  );
}
