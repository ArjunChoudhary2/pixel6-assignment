import React from "react";
import CustomerList from "../components/CustomerList";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const CustomerListpage = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-hidden ">
      <Header />
      <div className="w-screen p-5 flex justify-center">
        <CustomerList />
      </div>
    </div>
  );
};

export default CustomerListpage;
