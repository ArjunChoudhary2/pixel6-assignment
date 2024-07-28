import React from "react";
import InputForm from "../components/InputForm";
import Header from "../components/Header";

const CustomerData = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden ">
      <Header />
      <div className="w-screen p-5 flex justify-center">
        <InputForm />
      </div>
    </div>
  );
};

export default CustomerData;
