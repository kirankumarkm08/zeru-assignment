import React from "react";
import CustomBtn from "./CustomBtn";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex  justify-between px-6 sm:px-12 md:px-24 lg:px-48 py-5  border-2 fixed w-full">
      <Link href="/" className="">
        {" "}
        zeru assignment
      </Link>
      <div className="">
        <CustomBtn />
      </div>
    </div>
  );
};

export default Navbar;
