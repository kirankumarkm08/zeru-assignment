"use client";

import React from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <div className="flex  justify-between px-6 sm:px-12 md:px-24 lg:px-48 py-5  border-2  fixed w-full">
      <Link href="/" className="">
        {" "}
        zeru assignment
      </Link>

      <div className="">
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Navbar;
