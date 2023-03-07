import { useState, useEffect } from "react";
import logo from './logo.svg'
import './Header.css'

function Header() {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/UAH")
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates));
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h2>Exchange Rate</h2>
        </div>
        {exchangeRate && (
          <div className="exchange-rate-container">
            <p>1 USD = {(1 / exchangeRate.USD).toFixed(2)} UAH</p>
            <p>1 EUR = {(1 / exchangeRate.EUR).toFixed(2)} UAH</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
