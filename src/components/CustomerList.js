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

  // Function to handle edit action for a customer
  const handleEdit = (customer) => {
    navigate(`/customer-edit/${customer.id}`);
  };

  // Function to handle delete action for a customer
  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <div className="w-1/2 bg-gray-700 p-10 rounded-md">
      <div className="space-y-4">
      {/* Display a message when there are no customers */}
        <div className="text-white text-center">{customers.length === 0 && 'Customer List is empty, Please create new customer!!'}</div>
          {/* Map over the customers to display each one */}
        {customers.map((customer) => (
          <div key={customer.id} className="flex w-full bg-white px-2 py-3 rounded-md">
            <h3 className="mx-3 w-1/2">{customer.fullName}</h3>
            <div className="w-1/2 flex">
              <button
                className="mx-3 px-3 w-1/2 bg-black text-white flex items-center justify-center font-semibold rounded-md"
                onClick={() => handleEdit(customer)}
              >
                <div>
                  <CiEdit />
                </div>
                <div className="px-2">Edit</div>
              </button>
              <button
                className="mx-3 bg-red-600 px-3 w-1/2 text-white flex items-center justify-center font-semibold rounded-md"
                onClick={() => handleDelete(customer.id)}
              >
                <div>
                  <RxCross1 />
                </div>
                <div className="px-2">Delete</div>
              </button>
            </div>
          </div>
        ))}
      </div>
       {/* Button to navigate to the form page for creating a new customer */}
      <div className="my-4 text-center">
        <Link className="bg-white px-3 py-2 rounded-md font-semibold" to="/customer-form">
          Add New Customer
        </Link>
      </div>
    </div>
  );
};

export default CustomerList;
