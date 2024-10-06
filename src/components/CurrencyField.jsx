import React from "react";

const CurrencyField = ({ tokenName }) => {
  // const getPrice = (value) => {
  //   getSwapPrice(value);
  // };

  return (
    <div>
      <input
        value={"value"}
        // onBlur={(e) => field === "input" && getPrice(e.target.value)}
        className="outline-none  bg-transparent text-2xl  "
        placeholder="0"
      />
      <span>{tokenName}</span>
      {/* <span> balance:{balance.toFixed(3)}</span> */}
    </div>
  );
};

export default CurrencyField;
