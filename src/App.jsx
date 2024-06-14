import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [model, setModel] = useState("");
  const [inputValues, setInputValues] = useState({
    pH: "",
    EC: "",
    Ava_N: "",
    Ava_P: "",
    Ava_K: "",
  });
  const [predictedOC, setPredictedOC] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isNumeric = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };

  const handlePredictClick = async () => {
    if (!model) {
      alert("PLEASE SELECT A MODEL!");
      return;
    }

    const valuesFilled = Object.values(inputValues).every(
      (value) => value.trim() !== ""
    );
    if (!valuesFilled) {
      alert("PLEASE INPUT ALL VALUES!");
      return;
    }

    const allNumeric = Object.values(inputValues).every(isNumeric);
    if (!allNumeric) {
      alert("ONLY NUMERICAL VALUES ARE ALLOWED!");
      return;
    }

    setLoading(true);

    console.log("Model:", model);
    console.log("Input Values:", inputValues);

    try {
      const numericInputValues = {
        pH: parseFloat(inputValues.pH),
        EC: parseFloat(inputValues.EC),
        Ava_N: parseFloat(inputValues.Ava_N),
        Ava_P: parseFloat(inputValues.Ava_P),
        Ava_K: parseFloat(inputValues.Ava_K),
      };

      // const response = await axios.post(
      //   `http://127.0.0.1:8080/predict_${model
      //     .toLowerCase()
      //     .replace(/ /g, "_")}`,
      //   numericInputValues,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const response = await axios.post(
        `https://soil-backend-ruby.vercel.app/predict_${model
          .toLowerCase()
          .replace(/ /g, "_")}`,
        numericInputValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      setPredictedOC(response.data.predicted_OC);
    } catch (error) {
      console.error("Error predicting OC:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-yellow-50 bg-[#171616] p-0">
      <h1 className="text-2xl font-black pb-10 px-6  w-full z-10 flex justify-center items-center">
        Soil Organic Carbon Calculator
      </h1>
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <label htmlFor="pH" className="text-md mb-2">
            {" "}
            pH Value:
          </label>
          <input
            type="text"
            id="pH"
            name="pH"
            value={inputValues.pH}
            onChange={handleInputChange}
            className="border border-[#cb8a05] px-3 py-2 rounded-md focus:outline-none bg-[#171616] text-yellow-50"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="EC" className="text-md mb-2">
            EC Value:
          </label>
          <input
            type="text"
            id="EC"
            name="EC"
            value={inputValues.EC}
            onChange={handleInputChange}
            className="border border-[#cb8a05] px-3 py-2 rounded-md focus:outline-none bg-[#171616] text-yellow-50"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="Ava_N" className="text-md mb-2">
            Ava N Value:
          </label>
          <input
            type="text"
            id="Ava_N"
            name="Ava_N"
            value={inputValues.Ava_N}
            onChange={handleInputChange}
            className="border border-[#cb8a05] px-3 py-2 rounded-md focus:outline-none bg-[#171616] text-yellow-50"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="Ava_P" className="text-md mb-2">
            Ava P Value:
          </label>
          <input
            type="text"
            id="Ava_P"
            name="Ava_P"
            value={inputValues.Ava_P}
            onChange={handleInputChange}
            className="border border-[#cb8a05] px-3 py-2 rounded-md focus:outline-none bg-[#171616] text-yellow-50"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="Ava_K" className="text-md mb-2">
            Ava K Value:
          </label>
          <input
            type="text"
            id="Ava_K"
            name="Ava_K"
            value={inputValues.Ava_K}
            onChange={handleInputChange}
            className="border border-[#cb8a05] px-3 py-2 rounded-md focus:outline-none bg-[#171616] text-yellow-50"
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <select
          id="model"
          value={model}
          onChange={handleModelChange}
          className="border border-[#cb8a05] px-3 py-2 rounded-md focus:outline-none bg-[#171616] text-yellow-50"
        >
          <option value="" hidden disabled>
            Select A Model
          </option>
          <option value="LinearRegressor">Linear Regression</option>
          <option value="GradientBoostingRegressor">
            Gradient Boosting Regression
          </option>
          <option value="NeuralNetwork">Neural Network</option>
          <option value="KNN">K-Nearest Neighbours</option>
          <option value="SVR">Support Vector Regression</option>
        </select>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={handlePredictClick}
          className="px-4 py-2 bg-[#cb8a05] text-yellow-50 rounded-md hover:bg-yellow-50 hover:text-[#171616] focus:outline-none font-bold"
          disabled={loading}
        >
          {loading ? "........." : "Calculate"}
        </button>
      </div>
      <div className="mt-4 text-lg">
        {predictedOC !== null && (
          <p>
            Predicted Organic Carbon Value:{" "}
            <span className="font-bold text-[#cb8a05]">
              {parseFloat(predictedOC).toFixed(4)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
