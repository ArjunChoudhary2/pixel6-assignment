export const validateForm = (pan, fullName, email, number, address, postCode) => {
  if (!validatePan(pan)) return "Pan ID is not valid";

  //full name validation against regex
  const isFullNameValid = /^[a-zA-Z]+(?:[ '-][a-zA-Z]+)+$/.test(fullName);
  if (!isFullNameValid) return "Full Name is not valid";

  //email validation
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  if (!isEmailValid) return "Email ID is not valid";

  //number validation
  const isNumValid = /^[6-9]\d{9}$/.test(number);
  if (!isNumValid) return "Number is not valid";

  //address validation
  const isAddressValid = address.length !== 0;
  if(!isAddressValid) return "Address cannot be empty"

  //postcode validation
  const isPostCodeValid = /^[1-9][0-9]{5}$/.test(postCode);
  if(!isPostCodeValid) return "Postcode is not valid"

  return "validated";
};

export const validatePan = (pan) => {
  //pan validation against regex
  const isPanValid = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(pan);
  return isPanValid;
};
