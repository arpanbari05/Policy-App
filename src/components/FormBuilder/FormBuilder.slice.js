import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const FormBuilder = createSlice({
  initialState: {
    asyncOptions: {},
    asyncValues: {},
  },
  name: "formBuilder",
  reducers: {
    setAsyncOptions: (state, action) => {
      state.asyncOptions = { ...state.asyncOptions, ...action.payload };
    },
    setAsyncValues: (state, action) => {
      state.asyncValues = { ...state.asyncValues, ...action.payload };
    },
  },
});
export const { setAsyncOptions, setAsyncValues } = FormBuilder.actions;
export const callApi = (endPoint, param, bus) => {
  return async dispatch => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_BASE_URL + endPoint,
      { params: param },
    );
    let options = {};
    let values = {};
    let temp = data.data;
    if (endPoint.includes("area")) {
      let newTemp = temp[0];
      newTemp.forEach(innerItem => {
        let [value, key] = Object.values(innerItem);
        options = {
          ...options,
          ...{ area: { ...options["area"], ...{ [key]: value } } },
        };
      });
    } else
      Object.keys(temp).forEach(item => {
        if (typeof temp[item] === "string") {
          values = { ...values, [item]: temp[item] };
        } else if (temp[item] instanceof Array) {
          temp[item].forEach(innerItem => {
            let [value, key] = Object.values(innerItem);
            options = {
              ...options,
              ...{ [item]: { ...options[item], ...{ [key]: value } } },
            };
          });
        }
      });
    dispatch(setAsyncOptions(options));
    dispatch(setAsyncValues(values));
  };
};
export default FormBuilder.reducer;
