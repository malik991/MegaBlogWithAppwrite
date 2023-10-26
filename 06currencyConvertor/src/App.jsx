import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
//import "./App.css";
import { useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MemoryIcon from "@mui/icons-material/Memory";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("usd");
  const [toCurr, setToCurr] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // now we will use our hook useCurrencyInfo
  const currecnyInfo = useCurrencyInfo(fromCurr); // pass the currency from by default usd
  // our hook retunr the data in shape of an object so we get that data
  //console.log(`curency info from hook: ${currecnyInfo.pkr}`);
  const getOptionsFromKey = Object.keys(currecnyInfo); // which goes to fill the currency option
  //console.log(`All keys: ${getOptionsFromKey}`);
  // now we will swap two variable with each other
  const swap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  // now multiply with the desired converted currency
  const convert = () => {
    //console.log(`amount: ${amount}, currency info: ${currecnyInfo[toCurr]}`);
    setConvertedAmount(amount * currecnyInfo[toCurr]); // get the specific value of obj
  };

  return (
    // with full iamge bg
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/210679/pexels-photo-210679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={getOptionsFromKey}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={fromCurr}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 w-20 h-10 hover:bg-blue-300"
              >
                <CurrencyExchangeIcon />
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={getOptionsFromKey}
                onCurrencyChange={(currency) => setToCurr(currency)}
                selectCurrency={toCurr}
                amountDisable // it mean is is true
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              <MemoryIcon /> Convert {fromCurr.toUpperCase()} to{" "}
              {toCurr.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>

    // half img bg
    // <div className="w-full px-1 h-screen flex flex-wrap">
    //   <div className="w-1/2 h-screen flex justify-center items-center">
    //     <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
    //       <form
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           convert();
    //         }}
    //       >
    //         <div className="w-full mb-1">
    //           <InputBox
    //             label="From"
    //             amount={amount}
    //             currencyOptions={getOptionsFromKey}
    //             onCurrencyChange={(currency) => setAmount(amount)}
    //             selectCurrency={fromCurr}
    //             onAmountChange={(amount) => setAmount(amount)}
    //           />
    //         </div>
    //         <div className="relative w-full h-0.5">
    //           <button
    //             onClick={swap}
    //             type="button"
    //             className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
    //           >
    //             swap
    //           </button>
    //         </div>
    //         <div className="w-full mt-1 mb-4">
    //           <InputBox
    //             label="To"
    //             amount={convertedAmount}
    //             currencyOptions={getOptionsFromKey}
    //             onCurrencyChange={(currency) => setToCurr(currency)}
    //             selectCurrency={toCurr}
    //             amountDisable // it mean is is true
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
    //         >
    //           Convert {fromCurr.toUpperCase()} to {toCurr.toUpperCase()}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    //   <div className="w-1/2 h-screen bg-cover bg-no-repeat">
    //     <div className="h-full p-8">
    //       <img
    //         src="https://images.pexels.com/photos/210679/pexels-photo-210679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         className="h-full w-full"
    //         alt="Background"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
