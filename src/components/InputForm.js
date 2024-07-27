import React, { useEffect, useRef, useState } from "react";
import { validateForm, validatePan } from "../utils/formValidation";

const InputForm = () => {
  const pan = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const number = useRef(null);
  const [validationError, setValidationError] = useState(null);
  const [panResponse, setPanResponse] = useState(null);
  const [addresses, setAddressess] = useState(["", ""]);

  useEffect(() => {
    console.log("called");
    if (validatePan(pan)) {
      checkPan();
      console.log("called");
    }
  }, [pan?.current?.value]);

  const validate = () => {
    setValidationError(
      validateForm(
        pan?.current?.value,
        fullName?.current?.value,
        email?.current?.value,
        number?.current?.value
      )
    );
    console.log(validationError);
  };

  const checkPan = async () => {
    const panValue = pan?.current?.value;
    try {
      const response = await fetch("https://lab.pixel6.co/api/verify-pan.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ panNumber: panValue }),
      });
      const json = await response.json();
      setPanResponse(json);
      if (json?.isValid) {
        fullName.current.value = json?.fullName;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-full sm:w-1/2 sm:ml-[25vw] md:w-[30vw] p-12 top-[25vh] md:left-1/3 md:ml-12 md:rounded-lg text-white bg-opacity-80"
      >
        <label className="font-semibold">PAN</label>
        <input
          ref={pan}
          type="text"
          placeholder="Enter Pan Card Number"
          className="w-full my-4 p-4 rounded-lg bg-gray-800"
          maxLength="10"
          required
        />
        <label className="font-semibold">Full Name</label>
        <input
          ref={fullName}
          type="text"
          placeholder="Enter Full Name"
          className="w-full my-4 p-4 rounded-lg bg-gray-800"
          maxLength="140"
          required
        />
        <label className="font-semibold">Email</label>
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="w-full my-4 p-4 rounded-lg bg-gray-800"
          maxLength="255"
          required
        />
        <label className="font-semibold">Mobile Number</label>
        <div className="flex items-center">
          <span className="my-4 p-4 rounded-l bg-gray-300 text-black">+91</span>
          <input
            ref={number}
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            maxLength="10"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Add Address:</label>
          {addresses.map((address, index) => (
            <div>
              <h2>Address Line {index + 1}</h2>
              <input
                type="text"
                placeholder="Address Line"
                className="w-full my-4 p-4 rounded-r bg-gray-800"
              />
            </div>
          ))}
          {addresses.length <= 10 ? (
            <button className="text-black py-2 px-4 m-2 bg-white" onClick={addAddressLine}>+</button>
          ) : (
            ""
          )}
          {addresses.length > 2 ? (
            <button className="text-black py-2 px-4 m-2 bg-white">-</button>
          ) : (
            ""
          )}
        </div>

        <span className="text-red-700 text-sm ">{validationError}</span>
        <button
          className="px-4 py-1 bg-purple-400 rounded-md"
          onClick={() => {
            validate();
            validatePan();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
