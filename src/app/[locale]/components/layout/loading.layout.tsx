"use client";
import { Skeleton } from "antd";
// import { Skeleton } from "@mui/material";
import loading from "./../../loading";

export default function LoadingLayout({
  loading = true,
  isEmpty = true,
  empty = null,
  length = 5,
}) {
  return (
    <>
      {/* bg-[#0000009c] */}
      {loading && (
        <div
          className={
            "relative myContainer mx-auto  grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3 xl:grid-cols-5"
          }
        >
          {Array.from({ length }, (_, index) => (
            <div
              key={index + 1000000}
              className="skeleton_image rounded-xl p-3 w-full  max-w-[400px] "
            >
              <Skeleton
                paragraph={false}
                active
                className=" relative rounded-xl !w-full h-[300px] !flex !items-center !justify-center mx-auto  p-0  *:!h-full"
              />
              <Skeleton active className=" relative" />
              {/* <Skeleton className="w-full" sx={{ bgcolor: "grey.900" }} />
            <Skeleton className="w-full" sx={{ bgcolor: "grey.900" }} /> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
