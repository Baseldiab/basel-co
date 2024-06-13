"use client";
import React from "react";
import NavbarLogo from "./navbarLogo";
// import DropdownItem from "../dropdown/dropdown";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { Badge } from "antd";
import { useCartStore } from "@/app/store/cart";

export default function NavDesktop() {
  const { localStorageList } = useCartStore();

  return (
    <div className="myContainer flex justify-between items-center py-4 bg-gray-100 shadow-lg">
      <NavbarLogo />
      <div className="flex justify-between items-center gap-5">
        <Link className="text-base font-bold" href={"/"}>
          {"Products"}
        </Link>
        <Link href={"/cart"}>
          <Badge className="" count={localStorageList.length} offset={[8, 8]}>
            {/* <Avatar shape="square" size="large" /> */}
            <FaCartArrowDown fontSize="large" className="text-xl" />
          </Badge>
        </Link>
      </div>
    </div>
  );
}
