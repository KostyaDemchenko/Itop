import { useState } from "react";
import './CurrencyConverter.css';

function CurrencyConverter() {
  const [conversionRate, setConversionRate] = useState(null);
  const [currencyFrom, setCurrencyFrom] = useState("UAH");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [amount, setAmount] = useState(1);

  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleCurrencyFromChange = (event) => {
    setCurrencyFrom(event.target.value);
  };

  const handleCurrencyToChange = (event) => {
    setCurrencyTo(event.target.value);
  };

  const handleConvert = () => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyFrom}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.rates[currencyTo];
        setConversionRate(rate);
      });
  };

  const convertedAmount = conversionRate ? amount * conversionRate : "";

  return (
    <div className='currency-converter'>
      <h2 className="sub-title">Currency Converter</h2>
      <div className="container-select">
        <div className='form-group'>
          <label htmlFor='currency-from'>From:</label>
          <select
            id='currency-from'
            value={currencyFrom}
            onChange={handleCurrencyFromChange}
          >
            <option value='UAH'>₴ UAH</option>
            <option value='USD'>$ USD</option>
            <option value='EUR'>€ EUR</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='currency-to'>To:</label>
          <select
            id='currency-to'
            value={currencyTo}
            onChange={handleCurrencyToChange}
          >
            <option value='UAH'>₴ UAH</option>
            <option value='USD'>$ USD</option>
            <option value='EUR'>€ EUR</option>
          </select>
        </div>
      </div>
      <div className='output-container'>
        <div className="input-container">
          <label htmlFor='amount'>Amount:</label>
          <div className="curency-container">
            <input
              type='number'
              id='amount'
              value={amount}
              onChange={handleAmountChange}
            />
            <p>
              {currencyFrom}
            </p>
          </div>
        </div>
        {conversionRate && (
        <p className="results"> {convertedAmount.toFixed(2)} {currencyTo} </p>
        )}
      </div>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
}

export default CurrencyConverter;
