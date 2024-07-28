import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="flex flex-col text-center">
          <Link
            to="/customer-form"
            className="my-2 text-xl font-semibold bg-black text-white py-2 px-2 rounded-xl shadow-lg"
          >
            Customer Form
          </Link>
          <Link
            to="/customer-list"
            className="my-2 text-xl font-semibold bg-white text-black py-2 px-2 rounded-xl shadow-lg border border-black"
          >
            Customer List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
