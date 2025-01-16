"use client";
import { useEffect, useRef, useState } from "react";

const FibCalculator = () => {
  const [formData, setFormData] = useState({
    age: "",
    ast: "",
    alt: "",
    platelets: "",
  });
  const [result, setResult] = useState(null);
  const [riskCategory, setRiskCategory] = useState("");
  const useAgeRef = useRef("");
  const useASTRef = useRef("");
  const useALTRef = useRef("");
  const usePlateletsRef = useRef("");

  useEffect(() => {
    useAgeRef.current.focus();
    useASTRef.current.valueOf = "";
    usePlateletsRef.current.valueOf = "";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateFibScore = () => {
    const { age, ast, alt, platelets } = formData;

    // Convert inputs to numbers and validate
    const ageNum = parseFloat(age);
    const astNum = parseFloat(ast);
    const altNum = parseFloat(alt);
    const plateletsNum = parseFloat(platelets);

    // Validate inputs
    if (!ageNum || !astNum || !altNum || !plateletsNum) {
      alert("Please fill in all values");
      return;
    }

    // Correct FIB-4 formula: (Age × AST) / (Platelets × √ALT)
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
    <div className="max-w-2xl mx-5 sm:mx-auto p-6 my-5 shadow-lg  bg-white border border-[#7CCC52] rounded-xl">
      <h1 className="text-[22px] sm:text-3xl font-bold text-center mb-6 text-[#1A3394]">
        FIB-4 Score and Liver Fibrosis
      </h1>

      <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-gray-100">
        <p className="text-lg font-semibold mb-3 text-[#1A3394]">
          Input Parameters:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-32">
              <span className="text-sm font-medium text-gray-600">
                Age (years)
              </span>
            </div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              ref={useAgeRef}
              placeholder="Age"
              className="flex-1 p-2  border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32">
              <span className="text-sm font-medium text-gray-600">
                AST (IU/L)
              </span>
            </div>
            <input
              type="number"
              name="ast"
              value={formData.ast}
              onChange={handleInputChange}
              ref={useASTRef}
              placeholder="AST"
              className="flex-1 p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-32">
              <span className="text-sm font-medium text-gray-600">
                PLT (10⁹/L)
              </span>
            </div>
            <input
              type="number"
              name="platelets"
              value={formData.platelets}
              ref={usePlateletsRef}
              onChange={handleInputChange}
              placeholder="Platelets"
              className="flex-1 p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32">
              <span className="text-sm font-medium text-gray-600">
                ALT (IU/L)
              </span>
            </div>
            <input
              type="number"
              name="alt"
              value={formData.alt}
              ref={useALTRef}
              onChange={handleInputChange}
              placeholder="ALT"
              className="!flex-1 p-2 border border-gray-400  rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="text-center text-lg font-semibold text-[#1A3394] mb-4">
          Formula Visualization
        </div>
        <div className="flex items-center justify-center text-xl bg-white p-4 rounded-lg shadow-sm">
          <div className="border-b-2 border-black text-center">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="w-10 md:w-16 text-[13px] md:text-[16px] p-1  border rounded text-center"
              />
              <span>×</span>
              <input
                type="number"
                name="ast"
                value={formData.ast}
                onChange={handleInputChange}
                placeholder="AST"
                className="w-10 md:w-16 p-1 text-[13px] md:text-[16px] border rounded text-center"
              />
            </div>
          </div>
          <div className="mx-2">/</div>
          <div className="border-b-2 border-black text-center">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="platelets"
                value={formData.platelets}
                onChange={handleInputChange}
                placeholder="PLT"
                className="w-10 md:w-16 text-[13px] md:text-[16px] p-1 border rounded text-center"
              />
              <span>×</span>
              <span>√</span>
              <input
                type="number"
                name="alt"
                value={formData.alt}
                onChange={handleInputChange}
                placeholder="ALT"
                className="w-12 md:w-16 p-1 text-[13px] md:text-[16px] border rounded text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={calculateFibScore}
        className="w-full bg-[#7CCC52]  text-white py-3 px-6 rounded-lg 
    
        font-medium shadow-md"
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
                riskCategory === "Low Risk"
                  ? "bg-gradient-to-br from-green-50 to-white border-green-100"
                  : riskCategory === "High Risk"
                  ? "bg-gradient-to-br from-red-50 to-white border-red-100"
                  : "bg-gradient-to-br from-yellow-50 to-white border-yellow-100"
              }`}
            >
              <p className="text-sm text-gray-600 mb-2">Risk Category</p>
              <p className="text-3xl font-bold">{riskCategory}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border text-center border-gray-100 shadow-md">
            {riskCategory === "High Risk" && (
              <div className="flex items-center space-x-3 text-red-500 font-bold  ">
                <p className="text-md text-center font-bold">
                  This FIB-4 score is categorized as high risk*
                </p>
              </div>
            )}
            {riskCategory === "Low Risk" && (
              <div className="flex items-center space-x-3 text-green-700  ">
                <p className="text-md text-center font-bold">
                  This FIB-4 score is categorized as low risk*
                </p>
              </div>
            )}
            {riskCategory === "Indeterminate Risk" && (
              <div className="flex items-center space-x-3 text-yellow-500  ">
                <p className="text-md text-center font-bold">
                  This FIB-4 score is categorized as indeterminate risk*
                </p>
              </div>
            )}
          </div>

          {/* Risk Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <p className="text-green-800 font-medium">{"<"} 1.3</p>
              <p className="text-sm text-green-600">Low Risk</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
              <p className="text-yellow-800 font-medium">1.3 - 2.67</p>
              <p className="text-sm text-yellow-600">Indeterminate</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-white border border-red-100">
              <p className="text-red-800 font-medium">{">"} 2.67</p>
              <p className="text-sm text-red-600">High Risk</p>
            </div>
          </div>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-500 text-center italic">
        This tool is intended to assist healthcare professionals and is not a
        substitute for clinical judgment.
      </p>
    </div>
  );
};

export default FibCalculator;
