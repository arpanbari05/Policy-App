import { createSlice } from "@reduxjs/toolkit";
import SecureLS from "secure-ls";
import { proposalFields } from "./serviceApi";
import {
  starSchema,
  bupaSchema,
  adityaBirla,
  lombardSchema,
  careSchema,
  birlaTwoBase,
} from "./ProposalDetailsSchema";
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
  const ls = new SecureLS();

  return async (dispatch) => {
    try {
      const { data } = await proposalFields({
        enquiryId: ls.get("enquiryId"),
      });
      // console.log('tetete',data.data["Proposer Details"][12].validate.matched = 'address')
      //console.log('tetete',data.data["Insured Details"][4].validate.matches = 'validDigits/1/200')
      // data.data["Medical Details"]["10006386_self"][30][0].validate.matches = "validYear/1/100"
      // data.data["Medical Details"]["10012319_self"][16][0].type = "checkBox2"
      //  data.data["Medical Details"]["10012319_self"][16][0].additionalOptions = {title: 'hahah', members: ["self"]}

      // data.data["Medical Details"]["10006386_self"][2][6] =

      // {
      //   parent: "reassure_medical_assure_2_1",
      //   additionalOptions: { label: "dasf",customOptions: ["plan 1", "plan 2","plan 3"]},
      //   render: { when: "", is: "true" },
      //   name: "31413",
      //   type: 'custom_radio'
      // };

      // data.data["Medical Details"]["10014339_self"][2].name = "3141";
      // data.data["Medical Details"]["10014339_self"][2].parent =
      //   "royal_sundaram_Q101";
      // data.data["Medical Details"]["10014339_self"][2].additionalOptions = {
      //   label: "dasf",
      //   customOptions: ["yas", "nononon"],
      // };
      // data.data["Medical Details"]["10014339_self"][2].render = {
      //   when: "",
      //   is: "true",
      // };
      // data.data["Medical Details"]["10014339_self"][2].validate = {};
      // data.data["Medical Details"][
      //   "10011696_self"
      // ][10][2].additionalOptions.notAllowed = "null/10";
      //data.data["Proposer Details"][11].validate = {required: true,matches:"alt/mobile"}
      // data.data["Other Details"]["10012578_self_spouse_son1"][0].populate = 'nominee_relation=self/Proposer Details.name'
      // data.data["Other Details"]["10012578_self_spouse_son1"][1].populate = 'nominee_relation=self/Proposer Details.mobile'
      // data.data["Other Details"]["10011082_self"][7] =  {
      //   additionalOptions: { label: "dasf"},
      //   render: { when: "nominee_dob", is: {minAge: '18' } },
      //   name: "31413",
      //   type: 'text',
      //   validate:{required: true}
      // }
      // data.data["Insured Details"]["10012578_self_spouse_son1"][4].validate.matches =
      //   "validDigits/1/200";
      dispatch(setCurrentSchema(data.data || {}));
    } catch (err) {
      console.error(err);
      alert("Can't fetch schema");
    }
  };
};

export default schema.reducer;
