"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useDisconnect, useAccount } from "wagmi";
import DemoSwap from "@/components/DemoSwap";

const Home = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3">
      {isClient && (
        <div className="">
          <h1 className="">{address && `wallet address: ${address}`}</h1>
          <div>
            {address && (
              <button
                className="bg-black px-2 py-4 text-white rounded-md flex justify-center w-full"
                onClick={() => disconnect()}
              >
                disconnect
              </button>
            )}
          </div>
        </div>
      )}

      <DemoSwap />
    </div>
  );
};

export default Home;
