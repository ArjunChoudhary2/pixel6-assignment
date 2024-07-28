import React from "react";
import InputForm from "./components/InputForm";
import CustomerList from "./components/CustomerList";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1 className="m-2 text-center text-3xl">React Assignment</h1>
      <div className="flex flex-col">
        <Link to="/customer-form">Customer Form</Link>
        <Link to="/customer-list">Customer List</Link>
      </div>
    </div>
  );
};

export default App;
