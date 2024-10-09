"use client";

import React from "react";
// import WalletConnect from "./WalletConnect";
import { SiConvertio } from "react-icons/si";

import Card from "@/components/Card";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CurrencyField from "@/components/CurrencyField";
import { Button } from "./ui/button";

import {
  runSwap,
  getUniContract,
  getPrice,
  getWethContract,
  slippageAmount,
} from "@/RouterService/index";

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
  const [uniContract, setUniContract] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);

  useEffect(() => {
    const onLoad = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);

          // Get WETH and UNI contracts
          const wethContract = getWethContract();
          setWethContract(wethContract);

          const uniContract = getUniContract();
          setUniContract(uniContract);
        } catch (error) {
          console.error("Error connecting to Ethereum provider:", error);
        }
      } else {
        console.error("Ethereum provider not found. Please install MetaMask.");
      }
    };

    onLoad();
  }, []);

  // const getSigner = async () => {
  //   provider.send("eth_requestAccount", []);
  //   const signer = provider.getSigner();
  //   setSigner(signer);
  // };

  const getWalletAddress = () => {
    signer.getAddress().then((address) => {
      setSignerAddress(address);
      setSigner(signer);
    });

    wethContract.balanceOf(address).then((res) => {
      setWethAmount(Number(ethers.formatEther(res)));
    });

    uniContract.balanceOf(address).then((res) => {
      setUniAmount(Number(ethers.formatEther(res)));
    });
  };

  if (signer !== undefined) {
    getWalletAddress();
  }

  const getSwapPrice = (inputAmount) => {
    setInputAmount(inputAmount);
    getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now() / 1000),
      signerAddress
    ).then((data) => {
      setTransacton(data[0]);
      setOutputAmount(data[1]);
      setRation(data[2]);
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="sm:w-[400px]  h-fit border-2 rounded-md px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold leading-3  ">Swap</div>
          {provider && (
            <div className="">
              <Card />
            </div>
          )}
        </div>
        <div className="">
          <CurrencyField
            field={"input"}
            tokenName="WETH"
            getSwapPrice={getSwapPrice}
            getSigner={signer}
            balance={wethAmount}
            value={inputAmount}
          />
          <SiConvertio className="text-[30px] flex justify-center w-full" />
          <CurrencyField
            field={"output"}
            tokenName="UNI"
            value={outputAmount}
            signer={signer}
            balance={uniAmount}
          />{" "}
          <span className="flex w-full justify-center py-3 ">
            {" "}
            {`1UNI =${ratio} WETH`}{" "}
          </span>
          <Button
            className="w-full h-[50px] bg-red-600  ont-semibold"
            onClick={() => runSwap(transaction, signer)}
          >
            Swap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Swap;
