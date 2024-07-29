import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCustomer } from "../store/customerSlice";
import { RxCross1 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";

const CustomerList = () => {
  const customers = useSelector((state) => state.customers.customers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (customer) => {
    navigate(`/customer-edit/${customer.id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <div className="w-8/12 lg:w-1/2 bg-gray-700 p-10 rounded-md mx-auto">
      <div className="text-white text-center mb-4">
        {customers.length === 0 && "Customer List is empty, Please create new customer!!"}
      </div>
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="flex flex-col xl:flex-row w-full bg-white px-2 py-3 rounded-md mb-4"
        >
          <h3 className="text-center xl:w-1/2 mb-2 xl:mb-0">{customer.fullName}</h3>
          <div className="flex w-full xl:w-1/2 space-x-2">
            <button
              className="w-full bg-black text-white flex items-center justify-center font-semibold rounded-md"
              onClick={() => handleEdit(customer)}
            >
              <CiEdit />
              <span className="px-2">Edit</span>
            </button>
            <button
              className="w-full bg-red-600 text-white flex items-center justify-center font-semibold rounded-md"
              onClick={() => handleDelete(customer.id)}
            >
              <RxCross1 />
              <span className="px-2">Delete</span>
            </button>
          </div>
        </div>
      ))}
      <div className="my-4 text-center">
        <Link
          className="bg-white px-3 py-2 rounded-md font-semibold"
          to="/customer-form"
        >
          Add New Customer
        </Link>
      </div>
    </div>
  );
};

export default CustomerList;
