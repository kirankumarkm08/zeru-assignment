"use client";

import React, { useState, useEffect } from "react";
import { useDisconnect, useAccount } from "wagmi";
import dynamic from "next/dynamic";

const SwapComponent = dynamic(() => import("@/components/Swap"), {
  ssr: false,
});

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
        <>
          <div className="mt-32 w-[300px]  sm:w-full px-2 ">
            {address && (
              <h1 className="overflow-auto">wallet address: {address}</h1>
            )}
            {address && (
              <button
                className="bg-black px-2 py-4 text-white rounded-md flex justify-center w-full"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            )}
          </div>{" "}
          {address && <SwapComponent />}
        </>
      )}
    </div>
  );
};

export default Home;
