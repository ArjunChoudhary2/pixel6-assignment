import React, { useEffect, useRef, useState } from "react";
import { validateForm, validatePan } from "../utils/formValidation";
import { ColorRing } from "react-loader-spinner";
import verifiedIcon from "../media/verified.png";
import { checkPan, fetchArea } from "../utils/api"; // Import the API functions
import { useDispatch } from "react-redux";
import { addCustomer } from "../store/customerSlice";

const InputForm = () => {
  const [pan, setPan] = useState("");
  const [fullName, setFullName] = useState("");
  const email = useRef(null);
  const number = useRef(null);
  const [validationError, setValidationError] = useState(null);
  const [addresses, setAddressess] = useState(["", ""]);
  const [postCode, setPostCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isPanLoading, setIsPanLoading] = useState(false);
  const [isPostCodeLoading, setIsPostCodeLoading] = useState(false);
  const [isPanValid, setIsPanValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (validatePan(pan)) {
      checkPanWrapper();
    }
    if (postCode?.length === 6) {
      fetchAreaWrapper();
    }
  }, [pan, postCode]);

  const validate = () => {
    let isFormValid = validateForm(
      pan,
      fullName,
      email?.current?.value,
      number?.current?.value,
      addresses[0],
      postCode
    );
    setValidationError(isFormValid);
    if (isFormValid === "validated") {
      
      let createdUser = {
        name: fullName,
        email: email?.current?.value,
        number: number?.current?.value,
        panID: pan,
        postCode: postCode,
      };
      dispatch(addCustomer(createdUser));
    }
  };

  const checkPanWrapper = async () => {
    setIsPanLoading(true);
    setIsPanValid(false);
    try {
      const json = await checkPan(pan);
      setIsPanValid(json?.isValid);
      setIsPanLoading(false);
      if (json?.isValid) {
        setFullName(json?.fullName);
      }
    } catch (error) {
      setIsPanLoading(false);
    }
  };

  const fetchAreaWrapper = async () => {
    setIsPostCodeLoading(true);
    try {
      const json = await fetchArea(postCode);
      setIsPostCodeLoading(false);
      setState(json?.state[0]?.name);
      setCity(json?.city[0]?.name);
    } catch (error) {
      setIsPostCodeLoading(false);
    }
  };

  const addAddressLine = (e) => {
    e.preventDefault();
    setAddressess([...addresses, ""]);
  };

  const removeAddressLine = (e) => {
    e.preventDefault();
    setAddressess(addresses.slice(0, -1));
  };

  const handleAddressChange = (e, index) => {
    let updatedAddress = [...addresses];
    updatedAddress[index] = e.target.value;
    setAddressess(updatedAddress);
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-full sm:w-1/2 sm:ml-[25vw] md:w-[30vw] p-12 top-[25vh] md:left-1/3 md:ml-12 md:rounded-lg text-white bg-opacity-80"
      >
        <label className="font-semibold">PAN</label>
        <input
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          type="text"
          placeholder="Enter Pan Card Number"
          className="w-full my-4 p-4 rounded-lg bg-gray-800"
          maxLength="10"
          required
        />
        <div>
          {isPanValid && pan.length === 10 ? (
            <img
              className="h-[80px] w-[80px]"
              src={verifiedIcon}
              alt="verified"
            />
          ) : (
            <ColorRing
              visible={isPanLoading}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </div>
        <label className="font-semibold">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
            <div key={index}>
              <h2>Address Line {index + 1}</h2>
              <input
                type="text"
                placeholder="Address Line"
                className="w-full my-4 p-4 rounded-r bg-gray-800"
                maxLength="100"
                value={address}
                onChange={(e) => handleAddressChange(e, index)}
              />
            </div>
          ))}
          {addresses.length < 10 ? (
            <button
              className="text-black py-2 px-4 m-2 bg-white"
              onClick={(e) => addAddressLine(e)}
            >
              +
            </button>
          ) : (
            ""
          )}
          {addresses.length > 2 ? (
            <button
              className="text-black py-2 px-4 m-2 bg-white"
              onClick={(e) => removeAddressLine(e)}
            >
              -
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <label>Postcode</label>
          <input
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            type="text"
            maxLength="6"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          ></input>
          <div>
            {postCode.length === 6 && (
              <ColorRing
                visible={isPostCodeLoading}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            )}
          </div>
          <label>State</label>
          <input
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            disabled
            value={state}
            type="text"
          ></input>
          <label>City</label>
          <input
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            disabled
            value={city}
            type="text"
          ></input>
        </div>

        {validationError !== "validated" ? (
          <span className="text-red-700 text-sm ">{validationError}</span>
        ) : (
          ""
        )}
        <button
          className="px-4 py-1 bg-purple-400 rounded-md"
          onClick={() => {
            validate();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
