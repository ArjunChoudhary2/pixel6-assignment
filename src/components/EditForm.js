import React, { useEffect, useState } from "react";
import { validateForm, validatePan } from "../utils/formValidation";
import { ColorRing } from "react-loader-spinner";
import verifiedIcon from "../media/verified.png";
import { checkPan, fetchArea } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, deleteCustomer } from "../store/customerSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) =>
    state.customers.customers.find((cust) => cust.id === parseInt(customerId))
  );

  const [formData, setFormData] = useState({
    pan: customer?.pan || "",
    fullName: customer?.fullName || "",
    email: customer?.email || "",
    number: customer?.number || "",
    addresses: customer?.addresses || ["", ""],
    postCode: customer?.postCode || "",
    state: customer?.state || "",
    city: customer?.city || "",
  });
  const [validationError, setValidationError] = useState(null);
  const [isPanLoading, setIsPanLoading] = useState(false);
  const [isPostCodeLoading, setIsPostCodeLoading] = useState(false);
  const [isPanValid, setIsPanValid] = useState(false);

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

   // Validates PAN and updates fullName 
  const checkPanWrapper = async () => {
    setIsPanLoading(true);
    setIsPanValid(false);
    try {
      const json = await checkPan(formData.pan);
      setIsPanValid(json?.isValid);
      setIsPanLoading(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        fullName: json?.fullName,
      }));
    } catch (error) {
      setIsPanLoading(false);
    }
  };

  // Fetch area details based on postCode
  const fetchAreaWrapper = async () => {
    setIsPostCodeLoading(true);
    try {
      const json = await fetchArea(formData.postCode);
      setIsPostCodeLoading(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        state: json?.state[0]?.name || prevFormData.state,
        city: json?.city[0]?.name || prevFormData.city,
      }));
    } catch (error) {
      setIsPostCodeLoading(false);
    }
  };

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
      const updatedCustomer = {
        ...customer,
        ...formData,
        fullName: formData.fullName ,
      };
      dispatch(deleteCustomer(customer.id));
      dispatch(addCustomer(updatedCustomer));
      navigate("/customer-list");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles address line changes specifically
  const handleAddressChange = (e, index) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: updatedAddresses,
    }));
  };

  const addAddressLine = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: [...prevFormData.addresses, ""],
    }));
  };

  const removeAddressLine = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      addresses: prevFormData.addresses.slice(0, -1),
    }));
  };

  return (
    <div className="w-10/12 sm:w-1/2 bg-gray-700 p-10 rounded-md text-white">
      <form onSubmit={(e) => e.preventDefault()} className="">
        <label className="font-semibold">PAN</label>
        <div className="flex items-center">
          <input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            type="text"
            placeholder="Enter Pan Card Number"
            className="w-full my-4 p-4 rounded-lg bg-gray-800"
            maxLength="10"
            required
          />
          <div>
            {isPanValid && formData.pan.length === 10 ? (
              <img
                className="h-[10vh] w-[10vh]"
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
        </div>

        <label className="font-semibold">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName }
          onChange={handleChange}
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
          onChange={handleChange}
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
            onChange={handleChange}
            type="text"
            placeholder="Enter Mobile Number"
            className="w-full my-4 p-4 rounded-r bg-gray-800"
            maxLength="10"
            required
          />
        </div>
        <div>
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
              className="text-black py-2 px-4 m-2 bg-white rounded-md"
              onClick={addAddressLine}
            >
              +
            </button>
          ) : null}
          {formData.addresses.length > 2 ? (
            <button
              className="text-black py-2 px-4 m-2 bg-white rounded-sm"
              onClick={removeAddressLine}
            >
              -
            </button>
          ) : null}
        </div>
        <div>
          <label>Postcode</label>
          <div className="relative">
            <input
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className="w-full my-4 p-4 rounded-r bg-gray-800"
              type="text"
              maxLength="6"
            />
            <div className="absolute top-3 right-0">
              {formData.postCode.length === 6 && (
                <ColorRing
                  visible={isPostCodeLoading}
                  height="60"
                  width="60"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              )}
            </div>
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
        {validationError !== "validated" && (
          <span className="text-center text-sm ">{validationError}</span>
        )}
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

export default EditForm;
