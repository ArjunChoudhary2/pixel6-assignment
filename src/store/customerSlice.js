import { createSlice } from "@reduxjs/toolkit";
const customerSlice = createSlice({
    name : 'customers',
    initialState : { customers : []},
    reducers : {
        addCustomer : (state,action) => {
            state.customers.push(action.payload)
        }
    }
})

export default customerSlice.reducer;
export const {addCustomer} = customerSlice.actions