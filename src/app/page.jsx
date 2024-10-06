"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { useDisconnect } from "wagmi";
import DemoSwap from "@/components/DemoSwap";

const page = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3">
      <div>{isClient && address && `wallet address: ${address}`}</div>
      <div>
        {address && (
          <div>
            <button
              className="bg-black px-2 py-4 text-white rounded-md"
              onClick={() => disconnect()}
            >
              disconnect
            </button>
          </div>
        )}
      </div>
      <DemoSwap />
    </div>
  );
};

export default page;
