import React, { useEffect, useState } from "react";
import { validateForm, validatePan } from "../utils/formValidation";
import { ColorRing } from "react-loader-spinner";
import verifiedIcon from "../media/verified.png";
import { checkPan, fetchArea } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, idCounter } from "../store/customerSlice";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const [formData, setFormData] = useState({
    pan: "",
    fullName: "",
    email: "",
    number: "",
    addresses: ["", ""],
    postCode: "",
    state: "",
    city: ""
  });
  const [validationError, setValidationError] = useState(null);
  const [isPanLoading, setIsPanLoading] = useState(false);
  const [isPostCodeLoading, setIsPostCodeLoading] = useState(false);
  const [isPanValid, setIsPanValid] = useState(false);
  const [fetchedFullName, setFetchedFullName] = useState("");
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.customers.idCount);
  const navigate = useNavigate();

  useEffect(() => {
    if (validatePan(formData.pan)) {
      checkPanWrapper();
    }
  }, [formData.pan]);

  useEffect(() => {
    if (formData.postCode.length === 6) {
      fetchAreaWrapper();
    }
  }, [formData.postCode]);

  const validate = () => {
    const isFormValid = validateForm(
      formData.pan,
      formData.fullName,
      formData.email,
      formData.number,
      formData.addresses[0],
      formData.postCode
    );
    setValidationError(isFormValid);
    if (isFormValid === "validated") {
      const createdUser = {
        ...formData,
        id: currentUserId
      };
      dispatch(idCounter());
      dispatch(addCustomer(createdUser));
      navigate('/customer-list');
    }
  };

  const checkPanWrapper = async () => {
    setIsPanLoading(true);
    setIsPanValid(false);
    try {
      const json = await checkPan(formData.pan);
      setIsPanValid(json?.isValid);
      setIsPanLoading(false);
      if (json?.isValid) {
        setFetchedFullName(json?.fullName || "");
      }
    } catch (error) {
      setIsPanLoading(false);
    }
  };

  const fetchAreaWrapper = async () => {
    setIsPostCodeLoading(true);
    try {
      const json = await fetchArea(formData.postCode);
      setIsPostCodeLoading(false);
      setFormData(prevFormData => ({
        ...prevFormData,
        state: json?.state[0]?.name || "",
        city: json?.city[0]?.name || ""
      }));
    } catch (error) {
      setIsPostCodeLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleAddressChange = (e, index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      addresses: updatedAddresses
    }));
  };

  const addAddressLine = (e) => {
    e.preventDefault();
    setFormData(prevFormData => ({
      ...prevFormData,
      addresses: [...prevFormData.addresses, ""]
    }));
  };

  const removeAddressLine = (e) => {
    e.preventDefault();
    setFormData(prevFormData => ({
      ...prevFormData,
      addresses: prevFormData.addresses.slice(0, -1)
    }));
  };

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-full sm:w-1/2 sm:ml-[25vw] md:w-[30vw] p-12 top-[25vh] md:left-1/3 md:ml-12 md:rounded-lg text-white bg-opacity-80"
      >
        <label className="font-semibold">PAN</label>
        <input
          name="pan"
          value={formData.pan}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter Pan Card Number"
          className="w-full my-4 p-4 rounded-lg bg-gray-800"
          maxLength="10"
          required
        />
        <div>
          {isPanValid && formData.pan.length === 10 ? (
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
          name="fullName"
          value={formData.fullName || fetchedFullName}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter Full Name"
          className="w-full my-4 p-4 rounded-lg bg-gray-800"
          maxLength="140"
          required
        />
        <label className="font-semibold">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
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
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            maxLength="10"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Add Address:</label>
          {formData.addresses.map((address, index) => (
            <div key={index}>
              <h2>Address Line {index + 1}</h2>
              <input
                name={`address${index}`}
                type="text"
                placeholder="Address Line"
                className="w-full my-4 p-4 rounded-r bg-gray-800"
                maxLength="100"
                value={address}
                onChange={(e) => handleAddressChange(e, index)}
              />
            </div>
          ))}
          {formData.addresses.length < 10 ? (
            <button
              className="text-black py-2 px-4 m-2 bg-white"
              onClick={addAddressLine}
            >
              +
            </button>
          ) : null}
          {formData.addresses.length > 2 ? (
            <button
              className="text-black py-2 px-4 m-2 bg-white"
              onClick={removeAddressLine}
            >
              -
            </button>
          ) : null}
        </div>
        <div>
          <label>Postcode</label>
          <input
            name="postCode"
            value={formData.postCode}
            onChange={handleInputChange}
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            type="text"
            maxLength="6"
          />
          <div>
            {formData.postCode.length === 6 && (
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
            name="state"
            value={formData.state}
            disabled
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            type="text"
          />
          <label>City</label>
          <input
            name="city"
            value={formData.city}
            disabled
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            type="text"
          />
        </div>
        {validationError && <p>{validationError}</p>}
        <button
          className="bg-white text-black w-full mt-4 py-4 rounded-lg"
          onClick={validate}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputForm;
