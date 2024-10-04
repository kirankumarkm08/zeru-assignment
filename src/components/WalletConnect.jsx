"use client";

import { ConnectKitButton } from "connectkit";
import React from "react";
import { useAccount } from "wagmi";

const WalletConnect = () => {
  const { address } = useAccount();

  return (
    <div className="">
      <h1>{address ? address : <ConnectKitButton />}</h1>
    </div>
  );
};

export default WalletConnect;
