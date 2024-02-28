import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [pHValue, setPHValue] = useState('');
  const [ECValue, setECValue] = useState('');
  const [NValue, setNValue] = useState('');
  const [PValue, setPValue] = useState('');
  const [KValue, setKValue] = useState('');
  const [result, setResult] = useState(null);

  const handlePHChange = (e) => {
    setPHValue(e.target.value);
  };

  const handleECChange = (e) => {
    setECValue(e.target.value);
  };

  const handleNChange = (e) => {
    setNValue(e.target.value);
  };

  const handlePChange = (e) => {
    setPValue(e.target.value);
  };

  const handleKChange = (e) => {
    setKValue(e.target.value);
  };

  const handleButtonClick = () => {
    // Perform your calculation using the input values
    if (/^\d*\.?\d*$/.test(NValue)) {
      const regressionIntercept = -0.501089335682187;
      const pHCoefficient = -0.00008617549007226171;
      const ECCoefficient = 0.000987666549731028;
      const NCoefficient = 0.015357416634671987;
      const PCoefficient = 0.00016213215575418646;
      const KCoefficient = 0.000015734525442998026;

      const calculatedResult =
        regressionIntercept +
        parseFloat(pHValue) * pHCoefficient +
        parseFloat(ECValue) * ECCoefficient +
        parseFloat(NValue) * NCoefficient +
        parseFloat(PValue) * PCoefficient +
        parseFloat(KValue) * KCoefficient;
      
      setResult(calculatedResult.toFixed(4));
    } else {
      setResult(null);
      alert('Please enter a valid value for the available Nitrogen');
    }
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-lg font-black mb-12 text-yellow-50 sm:text-2xl">
        Soil Organic Carbon Calculator
      </h1>
      <div className="mb-4">
        <div className="text-yellow-50 mb-2">Enter pH Value:</div>
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="Enter a number"
          value={pHValue}
          onChange={handlePHChange}
        />
      </div>
      <div className="mb-4">
        <div className="text-yellow-50 mb-2">Enter EC Value:</div>
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="Enter a number"
          value={ECValue}
          onChange={handleECChange}
        />
      </div>
      <div className="mb-4">
        <div className="text-yellow-50 mb-2">Enter N Value:</div>
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="Enter a number"
          value={NValue}
          onChange={handleNChange}
        />
      </div>
      <div className="mb-4">
        <div className="text-yellow-50 mb-2">Enter P Value:</div>
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="Enter a number"
          value={PValue}
          onChange={handlePChange}
        />
      </div>
      <div className="mb-4">
        <div className="text-yellow-50 mb-2">Enter K Value:</div>
        <input
          type="text"
          className="border rounded-md p-2"
          placeholder="Enter a number"
          value={KValue}
          onChange={handleKChange}
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
          <p className="text-md text-yellow-50 sm:text-lg">
            Predicted Organic Carbon Value:{' '}
            <span className="font-bold text-yellow-600">{result}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;