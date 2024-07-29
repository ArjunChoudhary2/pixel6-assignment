import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import { FaWpforms } from "react-icons/fa6";
import { PiUserListBold } from "react-icons/pi";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="flex flex-col text-center">
          <Link
            to="/customer-form"
            className="flex items-center my-2 text-xl font-semibold bg-black text-white py-3 px-4 rounded-xl shadow-lg justify-center"
          >
            <FaWpforms /> <div className="mx-2">Customer Form</div>
          </Link>
          <Link
            to="/customer-list"
            className="flex items-center my-2 text-xl font-semibold bg-white text-black py-3 px-4 rounded-xl shadow-lg border border-black justify-center"
          >
            <PiUserListBold /> <div className="mx-2">Customer List</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
