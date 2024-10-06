import React from "react";
import CurrencyField from "@/components/CurrencyField";
import Card from "./Card";
import { SiConvertio } from "react-icons/si";
import { ERC20TOKENS } from "@/constants/index";

const DemoSwap = () => {
  return (
    <div>
      <div className="w-[400px] h-[300px] rounded-sm border-2 px-2 py-2">
        <div className="">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="font-bold leading-3  ">Swap</div>

              <div className="">
                <Card />
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-gray-200 rounded-sm px-2 py-4 my-3 flex justify-between">
              <div className="">
                <h1 className="text-md capitalize font-bold">sell</h1>
                <CurrencyField field="input" />
              </div>

              <div className="">
                <select className="px-2 py-4  rounded-md">
                  {ERC20TOKENS.map((i, index) => (
                    <option value="" key={index}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <SiConvertio className="flex justify-center items-center w-full text-[20px]  " />
            <div className="bg-gray-200 rounded-sm px-2 py-4 my-3 flex justify-between">
              <div className="">
                <h1 className="text-md capitalize font-bold">buy</h1>
                <CurrencyField field="output" />
              </div>

              <div className="">
                <select className="px-2 py-4  rounded-md">
                  {ERC20TOKENS.map((i, index) => (
                    <option value="" key={index}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSwap;
