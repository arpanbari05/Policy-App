import { useState } from "react";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";
import useUpdateFilters from "./useUpdateFilters";
import useFilters from "./useFilters";
import {
  useCompanies,
  useFrontendBoot,
  useTheme,
} from "../../../../customHooks";
import "styled-components/macro";

function FilterModal({ handleClose, ...props }) {
  const { journeyType } = useFrontendBoot();
  const { colors } = useTheme();

  let { companies } = useCompanies();

  companies = Object.values(companies);

  companies = companies.filter(company =>
    company.insurance_types.includes("health"),
  );

  const { getSelectedFilter } = useFilters();

  const [selectedInsurers, setSelectedInsurers] = useState(() =>
    getSelectedFilter("insurers"),
  );

  const addInsurer = company =>
    setSelectedInsurers([...selectedInsurers, company]);

  const removeInsurer = company =>
    setSelectedInsurers(
      selectedInsurers.filter(
        selectedCompany => selectedCompany.alias !== company.alias,
      ),
    );

  const isInsurerSelected = company =>
    selectedInsurers.some(
      selectedCompany => selectedCompany.alias === company.alias,
    );

  const handleChange = (company, checked) => {
    if (checked) {
      removeInsurer(company);
      return;
    }
    addInsurer(company);
  };

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    updateFilters({ insurers: selectedInsurers });
    handleClose && handleClose();
  };

  return (
    <CustomModal1
      header="Insurers"
      footerJSX={
        <ApplyBtn
          css={`
            background-color: ${colors.primary_color};
          `}
          className="apply_btn mx-auto h-100 w-100"
          onClick={handleApplyClick}
        >
          Apply
        </ApplyBtn>
      }
      handleClose={handleClose}
      leftAlignmnetMargin="-22"
      tooltipDesc="Select a choice of Insurance Company to view specific plans provided by that company"
      {...props}
    >
      {companies.map(company => (
        <Insurer
          company={company}
          onChange={handleChange}
          key={company.alias}
          checked={isInsurerSelected(company)}
        />
      ))}
    </CustomModal1>
  );
}

function Insurer({ company, checked = false, onChange, css, ...props }) {
  const { colors } = useTheme();

  const handleChange = () => {
    onChange && onChange(company, checked);
  };

  return (
    <OptionWrapper
      PrimaryColor={colors.primary_color}
      css={`
        margin-bottom: 0;
        ${css};
      `}
      {...props}
    >
      <input
        type="checkbox"
        className="visually-hidden"
        id={company.alias}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={company.alias} className="w-100">
        <li
          css={`
            margin: 5px 0;
          `}
          className="option insurer_option d-flex align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center">
            <div className="insurer_logo">
              <img src={company.logo} alt="COMPANY_LOGO" className="w-100" />
            </div>
            <span className="mx-3">{company.short_name}</span>
          </div>

          <div className="d-flex align-items-center ">
            <span className="plan_csr">{company.csr}% CSR</span>
            <div className="custom_checkbox"></div>
          </div>
        </li>
      </label>
    </OptionWrapper>
  );
}

const InsurerFilter = () => {
  const [showModal, setShowModal] = useState(false);

  const { getSelectedFilter } = useFilters();
  const selectedinsurers = getSelectedFilter("insurers");

  return (
    <>
      <Filter className="filter d-flex flex-column flex-fill">
        <span className="filter_head">Insurers</span>
        <span onClick={() => setShowModal(true)} className="filter_sub_head">
          {selectedinsurers && selectedinsurers.length
            ? `${selectedinsurers.length} Insurers selected`
            : "Select Insurers"}

          <i class="fas fa-chevron-down"></i>
        </span>

        {showModal && <FilterModal handleClose={() => setShowModal(false)} />}
      </Filter>
    </>
  );
};

export default InsurerFilter;
