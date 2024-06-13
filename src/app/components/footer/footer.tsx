import { LocalProps } from "@/app/interfaces/local.props.interface";
import React from "react";

export default function Footer({ params: { locale } }: LocalProps) {
  const yearNow = new Date().getFullYear();

  return (
    <footer
      className={`bg-gray-100 shadow-lg z-30  ${locale === "ar" && "!font-cairo !font-bold"}`}
    >
      <div className="myContainer py-4 align-middle text-start relative">
        <span>{`All rights reserved Basel & Co © ${yearNow} Created by `}</span>
        <a className="text-sky-500 bold" href="https://github.com/Baseldiab">
          Basel Diab
        </a>
      </div>
    </footer>
  );
}
