import { createSlice } from "@reduxjs/toolkit";

// Slice to manage customer data
const customerSlice = createSlice({
  name: "customers",
  initialState: { customers: [], //Array to hold customer objects
    idCount : 1 // Counter to generate uniqueIds for each customer
   },
  reducers: {
    // Adds a new customer object 
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    // Increments the ID counter used for generating unique IDs for new customers
    idCounter : (state) => {
        state.idCount++;
    },
    // Deletes a customer from the customers array based on their ID
    deleteCustomer(state, action) {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
  },
});

export default customerSlice.reducer;
export const { addCustomer,idCounter,deleteCustomer } = customerSlice.actions;
