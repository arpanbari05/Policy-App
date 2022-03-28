import ProposalCheckBox from "../../../components/Common/ProposalSummary/summaryCheckBox";
import CustomMedicalTable from "./CustomMedicalTable";
import DropDown from "./DropDown";
import Height from "./Height";
import OtherTable from "./OtherTable";
import TextInput from "./TextInput";
import Title from "./Title";
import Toggle from "./Toggle";
import DateComp from "./Date";
import CustomCheckBox from "./customCheckBox";
import RadioButtons from "./RadioButtons";
import CheckBoxGroup from "./CheckBoxGroup";
import BtnGroup from "./BtnGroup";

export const components = {
  text: TextInput,
  select: DropDown,
  custom_toggle: Toggle,
  custom_medical: CustomMedicalTable,
  custom_radio: RadioButtons,
  checkBox: ProposalCheckBox,
  checkBox2: CustomCheckBox,
  title: Title,
  custom_table: OtherTable,
  custom_height: Height,
  date: DateComp,
  checkboxGroup:CheckBoxGroup,
  btn_group:BtnGroup
};
