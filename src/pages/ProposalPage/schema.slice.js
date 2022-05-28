import { createSlice } from "@reduxjs/toolkit";
import { proposalFields } from "./serviceApi";
const schema = createSlice({
  name: "schema",
  initialState: {
    currentSchema: {},
    active: 0,
  },
  reducers: {
    setCurrentSchema: (state, action) => {
      state.currentSchema = action.payload;
    },
    setActiveForm: (state, action) => {
      state.active = action.payload;
    },
  },
});
export const { setCurrentSchema } = schema.actions;
export const getProposalFields = () => {
  const urlQueryStrings = new URLSearchParams(window.location.search);
  const EnquiryId = urlQueryStrings.get("enquiryId");

  return async dispatch => {
    try {
      const { data } = await proposalFields({
        enquiryId: EnquiryId,
      });

      dispatch(setCurrentSchema(data.data || {}));
    } catch (err) {
      console.error(err);
      alert("Can't fetch schema");
    }
  };
};

export default schema.reducer;
