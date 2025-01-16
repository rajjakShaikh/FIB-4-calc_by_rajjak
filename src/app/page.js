"use client";
import { useEffect, useRef, useState } from "react";

const FibCalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    ast: "",
    alt: "",
    platelets: "",
    plateletUnit: "10^9/L",
  });
  const [result, setResult] = useState(null);
  const [riskCategory, setRiskCategory] = useState("");

  const inputRefs = {
    age: useRef(null),
    ast: useRef(null),
    alt: useRef(null),
    platelets: useRef(null),
  };

  useEffect(() => {
    inputRefs.age.current?.focus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUnitChange = (e) => {
    setFormData({ ...formData, plateletUnit: e.target.value });
  };

  // const convertPlatelets = (platelets, unit) => {
  //   const plateletsNum = parseFloat(platelets);
  //   if (isNaN(plateletsNum)) return null;

  //   switch (unit) {
  //     case "10^3/μL":
  //       return plateletsNum;
  //     case "/μL":
  //       return plateletsNum * 1000; // Convert to 10^3/μL
  //     default:
  //       return plateletsNum * 1000; // Convert 10^9/L to 10^3/μL
  //   }
  // };

  const convertPlatelets = (platelets, unit) => {
    const plateletsNum = parseFloat(platelets);
    if (isNaN(plateletsNum)) return null;

    switch (unit) {
      case "10^9/L": // Base unit - no conversion needed
        return plateletsNum;
      case "10^3/μL": // Conversion factor is 1
        return plateletsNum;
      case "/μL": // Conversion factor is 10^-3
        return plateletsNum * 0.001;
      default:
        return plateletsNum;
    }
  };

  const calculateFibScore = () => {
    const { age, ast, alt, platelets, plateletUnit } = formData;
    const ageNum = parseFloat(age);
    const astNum = parseFloat(ast);
    const altNum = parseFloat(alt);
    const plateletsNum = convertPlatelets(platelets, plateletUnit);

    if (!ageNum || !astNum || !altNum || !plateletsNum) {
      alert("Please fill in all values");
      return;
    }

    const fib4 = (ageNum * astNum) / (plateletsNum * Math.sqrt(altNum));

    let category = "";
    if (fib4 < 1.3) {
      category = "Low Risk";
    } else if (fib4 <= 2.67) {
      category = "Indeterminate Risk";
    } else {
      category = "High Risk";
    }
    setResult(fib4.toFixed(2));
    setRiskCategory(category);
  };

  return (
    <div className="max-w-2xl mx-5 sm:mx-auto p-6 my-5 shadow-lg bg-white border border-[#7CCC52] rounded-xl">
      <h1 className="text-[22px] sm:text-3xl font-bold text-center mb-6 text-[#1A3394]">
        FIB-4 Score and Liver Fibrosis
      </h1>

      <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-gray-100">
        <p className="text-lg font-semibold mb-3 text-[#1A3394]">
          Input Parameters:
        </p>
        <div className="grid grid-cols-1 text-sm md:grid-cols-2 gap-6 mb-6">
          {[
            { label: "Age (years)", name: "age" },
            { label: "AST (IU/L)", name: "ast" },
            { label: "ALT (IU/L)", name: "alt" },
          ].map(({ label, name }) => (
            <div key={name} className="grid md:flex items-center gap-3">
              <span className="w-32 text-sm font-medium text-gray-600">
                {label}
              </span>
              <input
                type="number"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                ref={inputRefs[name]}
                placeholder={label}
                className="flex-1 text-sm p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              />
            </div>
          ))}
          <div className="grid md:flex items-center gap-3">
            <span className="w-32 text-sm font-medium text-gray-600">
              Platelets
            </span>
            <div className="grid ml-0 md:ml-3 grid-cols-2 gap-2">
              <input
                type="number"
                name="platelets"
                value={formData.platelets}
                onChange={handleInputChange}
                placeholder="Platelets"
                className="flex-1 p-2  border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              />
              <select
                value={formData.plateletUnit}
                onChange={handleUnitChange}
                className="w-24 p-2 border mr-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              >
                <option value="10^9/L">10⁹/L</option>
                <option value="10^3/μL">10³/μL</option>
                <option value="/μL">/μL</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={calculateFibScore}
        className="w-full bg-[#7CCC52] text-white py-3 px-6 rounded-lg font-medium shadow-md"
      >
        Calculate FIB-4 Score
      </button>

      {result && (
        <div className="mt-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
              <p className="text-sm text-[#1A3394] mb-2">FIB-4 Score</p>
              <p className="text-3xl font-bold text-gray-800">{result}</p>
            </div>
            <div
              className={`p-6 rounded-xl border ${
                riskCategory.includes("Low")
                  ? "border-green-100"
                  : riskCategory.includes("High")
                  ? "border-red-100"
                  : "border-yellow-100"
              }`}
            >
              <p className="text-sm text-gray-600 mb-2">Risk Category</p>
              <p className="text-3xl font-bold">{riskCategory}</p>
            </div>
          </div>
        </div>
      )}
      {riskCategory && (
        <div className="bg-white p-4 my-4 rounded-xl border text-center border-gray-100 shadow-md">
          {riskCategory === "High Risk" && (
            <div className="flex items-center space-x-3 text-red-500 font-bold  ">
              <p className="text-md text-center font-bold">
                This FIB-4 score is categorized as high risk for liver fibrosis.
              </p>
            </div>
          )}
          {riskCategory === "Low Risk" && (
            <div className="flex items-center space-x-3 text-green-700">
              <p className="text-md text-center font-bold">
                This FIB-4 score is categorized as low risk for liver fibrosis.
              </p>
            </div>
          )}
          {riskCategory === "Indeterminate Risk" && (
            <div className="flex items-center space-x-3 text-yellow-500">
              <p className="text-md text-center font-bold">
                This FIB-4 score is categorized as indeterminate risk for liver
              </p>
            </div>
          )}
        </div>
      )}

      <p className="mt-6 text-sm text-gray-500 text-center italic">
        This tool is intended to assist healthcare professionals and is not a
        substitute for clinical judgment.*
      </p>
    </div>
  );
};

export default FibCalculator;
