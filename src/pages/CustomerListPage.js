import React from "react";
import CustomerList from "../components/CustomerList";
import {Link} from 'react-router-dom'

const CustomerListpage = () => {
  return (
    <div className="flex bg-blue-200 justify-center items-center h-[100vh]">
      <CustomerList />
    </div>
  );
};

export default CustomerListpage;
