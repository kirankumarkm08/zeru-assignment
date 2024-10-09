import React from "react";

const CurrencyField = ({ tokenName, getSwapPrice, value, field, balance }) => {
  const getPrice = (value) => {
    getSwapPrice(value);
  };

  return (
    <div className="flex justify-between py-4 px-2 hover:bg-gray-300 rounded-md my-3 border-2  hover:scale-100">
      <input
        value={value}
        onBlur={(e) => (field === "input" ? getPrice(e.target.value) : null)}
        className="outline-none  bg-transparent text-2xl  "
        placeholder="0.0"
      />

      {/* <span>{"getSwapPrice"}</span> */}

      <div className="flex flex-col">
        <span className="flex-1 font-semibold ">{tokenName}</span>
        <span> balance:{balance} 0</span>
      </div>
    </div>
  );
};

export default CurrencyField;
