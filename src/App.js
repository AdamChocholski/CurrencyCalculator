
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  return (
    <div className="container-fluid bg-primary vh-100 d-flex align-items-center justify-content-center">
      <div className="container bg-white p-4 rounded">
        <h1 className="mb-4 text-primary">Currency Calculator</h1>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label text-dark border border-primary p-2">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label text-dark border border-primary p-2">From Currency:</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="form-select"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label text-dark border border-primary p-2">To Currency:</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="form-select"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PLN">PLN</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h4 className="mt-3">Result: <span className="text-success">{convertedAmount} {toCurrency}</span></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
