import React, { useId } from "react";

function InputBox({
  label, // labe like from to
  amount, // amount which he enter
  onAmountChange, // when he change the amount
  onCurrencyChange, // when he change the currecny type
  currencyOptions = [], // make an empty array if user not passed anything a pop list
  selectCurrency = "usd", // select currency from user by default we use USD
  amountDisable = false, // if user do not provide the amount in case
  currencyDisable = false, // if user do not provide the currency in case

  className = "",
}) {
  const bindAmountLabel = useId(); // it will generate a unique number to bind both(labl and input) just for optimization
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        {/* use above variable in js */}
        <label
          htmlFor={bindAmountLabel}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={bindAmountLabel} // just bind this input with id attribute
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          // disable property check the input field is disable or not by default it's flase
          disabled={amountDisable}
          value={amount}
          // if amount change than call the onChange event
          // if anyone do not pass the onamountChange than use ternary ops
          // and wrap in Number coz som time JS send value in string which cause error however its type is number
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency} // select the value in list bydefault we set "USD"
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // when change the currency
          disabled={currencyDisable}
        >
          {/*  print the all currency from array and when u print any array through loop
        react hit the performance so always use KEY element with every element to
        identify it unique like "in db key should be Ids than index of array so use a 
        unique number here currency name is unique" */}
          {currencyOptions.map((singleCurrency) => (
            <option key={singleCurrency} value={singleCurrency}>
              {singleCurrency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
