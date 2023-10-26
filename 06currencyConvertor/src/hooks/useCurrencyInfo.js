import { useEffect, useState } from "react";

//standrised approch when you create custom hook start with "use" keyword
// this hook will return data in JS with calling API
function useCurrencyInfo(currency) {
  // create an empty obj at least if we do not have any data than it will not crash at least
  const [apiData, setApiData] = useState({});
  // so when page load this hook will mount the data by the help of useEffect hook
  // with useEffct automaticall fetch will be called at the lifecycle of page load
  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    ) // to fetch the data from an API
      .then((res) => res.json()) // convert api data to json formate
      .then((res) => setApiData(res[currency])); // to hold this data which is in res obj pass it into useState variable. currency is the key if you check URL
    //console.log(apiData);
    //console.table(apiData);
  }, [currency]);
  console.log(apiData);
  return apiData;
}

export default useCurrencyInfo; // in this way we return the whole function as a hook which return apiDAta
