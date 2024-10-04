import React from "react";
import WalletConnect from "./WalletConnect";

const Swap = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] h-[300px] border-2 rounded-md">
        <WalletConnect />
      </div>
    </div>
  );
};

export default Swap;
