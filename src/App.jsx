import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (/^\d*\.?\d*$/.test(inputValue)) {
      const calculatedResult = -0.521265587569461 + parseFloat(inputValue) * 0.0157168389065773;
      setResult(calculatedResult.toFixed(4));
    } else {
      setResult(null);
      alert('Please enter a valid value for the available Nitrogen');
    } 
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-lg font-black mb-12 text-yellow-50 sm:text-2xl">Soil Organic Carbon Calculator</h1>
      <div className="mb-4">
        <div className="text-yellow-50 mb-2">Enter Available Nitrogen Value:</div>
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="Enter a number"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-yellow-50 font-bold py-2 px-4 rounded"
        onClick={handleButtonClick}
      >
        Calculate
      </button>
      {result !== null && (
        <div className="mt-4">
          <p className='text-md text-yellow-50 sm:text-lg'>Predicted Organic Carbon Value: <span className='font-bold text-yellow-600'>{result}</span></p>
        </div>
      )}
    </div>
  );
};

export default App;