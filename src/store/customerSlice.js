import { createSlice } from "@reduxjs/toolkit";
const customerSlice = createSlice({
  name: "customers",
  initialState: { customers: [],
    idCount : 1
   },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    idCounter : (state) => {
        state.idCount++;
    },
    deleteCustomer(state, action) {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
  },
});

export default customerSlice.reducer;
export const { addCustomer,idCounter,deleteCustomer } = customerSlice.actions;
