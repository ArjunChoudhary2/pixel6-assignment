import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate,Link} from  'react-router-dom'
import {deleteCustomer} from '../store/customerSlice'


const CustomerList = () => {
  const customers = useSelector(state => state.customers.customers);
  console.log(customers)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (customer) => {
    // dispatch(setEditingCustomer(customer));
    // Redirect to customer edit page
  };

  const handleDelete = (id) => {
     dispatch(deleteCustomer(id));
  };

  return (
    <div className='bg-gray-600 m-5 p-5 flex flex-col'>
      {customers.map(customer => (
        <div key={customer.id} className='flex '>
          <h3 className='mx-3'>{customer.fullName}</h3>
          <button  className='mx-3 bg-white px-3'  onClick={() => handleEdit(customer)}>Edit</button>
          <button  className='mx-3 bg-white px-3'  onClick={() => handleDelete(customer.id)}>Delete</button>
        </div>
      ))}
      <Link className='m-3 bg-white px-3' to='/customer-form' >Add New Customer</Link>
    </div>
  );
};

export default CustomerList;
