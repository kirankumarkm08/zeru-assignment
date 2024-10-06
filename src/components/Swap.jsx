"use client";

import React from "react";
// import WalletConnect from "./WalletConnect";
import { CiSettings } from "react-icons/ci";
import CustomBtn from "@/components/CustomBtn";
import Card from "@/components/Card";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import {
  runSwap,
  getWethAddress,
  getUniContract,
  getPrice,
} from "@/RouterService";

const Swap = () => {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);
  const [transaction, setTransacton] = useState(undefined);
  const [ratio, setRation] = useState(undefined);
  const [deadlineminutes, setDeadlineMinutes] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  useEffect(() => {
    const onLoad = async () => {
      const provid = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provid);
    };
    onLoad();
  }, []);

  const getSigner = async () => {
    provider.send("eth_requestAccount", []);
    const sign = provider.getSigner();
    setSigner(sign);
  };

  const isConnect = () => signer !== undefined;

  const getWalletAddress = () => {
    signer.getAddress().then((address) => setSignerAddress(address));
  };

  wethContract.balanceOf(address).then((res) => {
    setWethAmount(Number(ethers.formatEther(res)));
  });

  uniContract.balanceOf(address).then((res) => {
    setUniAmount(Number(ethers.formatEther(res)));
  });

  if (signer !== undefined) {
    getWalletAddress();
  }
  const getSwapPrice = () => {
    setInputAmount(inputAmount);

    const Swap = getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Data.now() / 1000 + deadlineminutes * 60),
      signerAddress
    ).then((data) => {
      setTransacton(data[0]);
      setOutputAmount(data[1]);
      setRation(data[2]);
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] h-[300px] border-2 rounded-md px-5 py-2">
        <div className="flex justify-between items-center">
          <div className="font-bold leading-3  ">Swap</div>

          <div className="">
            <Card />
          </div>
        </div>
        <div className="">
          <CurrencyField
            field="input"
            tokenName="WETH"
            getSwapPrice={getSwapPrice}
            signer={signer}
            balance={wethAmount}
          />
          <CurrencyField
            field="output"
            tokenName="UNI"
            // getSwapPrice={getSwapPrice}
            value={outputAmount}
            signer={signer}
            balance={uniAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default Swap;
