import {
  useCompanies,
  useFrontendBoot,
  useGetQuotes,
  useTheme,
  useToggle,
} from "../../../../customHooks";
import {
  RiChatSmile3Line,
  RiFilter2Line,
  RiShareLine,
  RiSortAsc,
} from "react-icons/ri";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { Modal, Nav, Tab } from "react-bootstrap";
import { Button, CloseButton } from "../../../../components";
import { EditMembers } from "../../components/filters/EditMemberFilter";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useFilters from "../../components/filters/useFilters";
import useUpdateFilters from "../../components/filters/useUpdateFilters";
import "styled-components/macro";
import { tenures } from "../../data";

export function BottomNavigation() {
  const { boxShadows } = useTheme();
  return (
    <div
      className="p-2 position-fixed bottom-0 w-100 d-flex"
      css={`
        border-radius: 1em 1em 0 0;
        box-shadow: ${boxShadows.six};
        background-color: #fff;
        & > div {
          flex: 1;
          display: flex;
          justify-content: center;
        }
      `}
    >
      <NavItemToggle icon={<BsPeopleFill />} label="Edit">
        <EditMembers />
      </NavItemToggle>
      <NavItemToggle icon={<RiFilter2Line />} label="Filter">
        <FilterModal />
      </NavItemToggle>
      <NavItemToggle icon={<RiShareLine />} label="Share"></NavItemToggle>
      <NavItemToggle
        icon={<RiChatSmile3Line />}
        label="Talk to us"
      ></NavItemToggle>
      <NavItemToggle icon={<RiSortAsc />} label="Sort"></NavItemToggle>
    </div>
  );
}

function FilterModal({ onClose }) {
  const { boxShadows } = useTheme();

  const {
    data: { premiums, covers, plantypes, morefilters, deductibles },
    journeyType,
  } = useFrontendBoot();

  const {
    updateFilters,
    resetFilters,
    query: updateFiltersMutation,
  } = useUpdateFilters();

  const [filters, setFilters] = useState({});

  const updateFilter = (code, option) => {
    setFilters({ ...filters, [code]: option });
  };

  const clearFilters = () => {
    setFilters({});
    resetFilters();
  };

  const handleShowPlansClick = () => {
    updateFilters(filters);
    onClose && onClose();
  };

  const RenderFilterOptions = ({ code, options }) => (
    <Tab.Pane eventKey={code}>
      <FilterOptions
        code={code}
        options={options}
        currentOption={filters[code]}
        onChange={updateFilter}
      />
    </Tab.Pane>
  );

  return (
    <MobileModal onClose={onClose}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="premium">
        <div
          className="d-flex min-vh-100"
          css={`
            & .nav-link.active {
              background-image: linear-gradient(90deg, #0a87ff40, #fff);
            }
            overflow: auto;
            margin-bottom: 3em;
          `}
        >
          <Nav
            className="flex-column"
            css={`
              flex: 1;
              box-shadow: ${boxShadows.one};
            `}
          >
            <FilterNavItem eventKey={"premium"}>Premium</FilterNavItem>
            {journeyType === "health" ? (
              <FilterNavItem eventKey={"cover"}>Cover</FilterNavItem>
            ) : (
              <FilterNavItem eventKey={"deductible"}>Deductible</FilterNavItem>
            )}
            <FilterNavItem eventKey={"tenure"}>Multiyear Options</FilterNavItem>
            {journeyType === "health" ? (
              <FilterNavItem eventKey={"plantype"}>Policy type</FilterNavItem>
            ) : null}
            <FilterNavItem eventKey={"insurers"}>Insurers</FilterNavItem>
            {morefilters.map(filter => (
              <FilterNavItem eventKey={filter.code} key={filter.code}>
                {filter.group_name}
              </FilterNavItem>
            ))}
          </Nav>

          <Tab.Content
            className="p-3"
            css={`
              flex: 2;
            `}
          >
            <RenderFilterOptions code="premium" options={premiums} />
            {journeyType === "health" ? (
              <RenderFilterOptions code="cover" options={covers} />
            ) : (
              <RenderFilterOptions code="deductible" options={deductibles} />
            )}
            <RenderFilterOptions code="tenure" options={tenures} />
            <RenderFilterOptions code="plantype" options={plantypes} />
            <Tab.Pane eventKey="insurers">
              <InsurersFilter />
            </Tab.Pane>
            {morefilters.map(filter => (
              <RenderFilterOptions
                key={filter.code}
                code={filter.code}
                options={filter.options}
              />
            ))}
          </Tab.Content>
        </div>
      </Tab.Container>
      <div
        className="p-3 position-fixed bottom-0 w-100 d-flex justify-content-between"
        css={`
          border-radius: 1em 1em 0 0;
          box-shadow: ${boxShadows.six};
          background-color: #fff;
          font-size: 0.79rem;
        `}
      >
        <button
          disabled={updateFiltersMutation.isLoading}
          onClick={clearFilters}
        >
          Clear filters
        </button>
        <Button
          disabled={updateFiltersMutation.isLoading}
          onClick={handleShowPlansClick}
        >
          Show plans
        </Button>
      </div>
    </MobileModal>
  );
}

function InsurersFilter({ onChange, currentOption }) {
  const { isLoading, data } = useGetQuotes();

  const companies = data
    ? data
        .filter(icQuotes => !!icQuotes.data.data.length)
        .map(icQuotes => icQuotes.company_alias)
    : [];

    const handleChange = (company, evt) => {
      if(evt.target.checked) {
        onChange && onChange()
      }
    }

  return (
    <OptionsWrap>
      {companies.map(company_alias => (
        <InsurerOption companyAlias={company_alias} />
      ))}
      {isLoading && <p>Loading...</p>}
    </OptionsWrap>
  );
}

function InsurerOption({ companyAlias, onChange, checked, ...props }) {
  const { getCompany } = useCompanies();

  const company = getCompany(companyAlias);

  const { colors } = useTheme();

  const handleChange = evt => {
    onChange && onChange(company, evt);
  };

  return (
    <div
      className="rounded"
      css={`
        border: 1px solid ${colors.primary_color};
      `}
      {...props}
    >
      <label
        className="d-flex align-items-center justify-content-between px-2 py-1"
        css={`
          font-size: 0.79rem;
        `}
      >
        <img
          src={company.logo}
          alt={companyAlias}
          css={`
            width: 6em;
            height: 3em;
            object-fit: contain;
          `}
        />
        <span
          css={`
            font-size: 1.6rem;
            color: ${colors.primary_color};
            line-height: 1;
          `}
        >
          {checked ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
        </span>
        <input
          className="visually-hidden"
          type={"checkbox"}
          checked={checked}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

function FilterOptions({ code, options, currentOption, onChange }) {
  const { getSelectedFilter } = useFilters();

  const selectedOption = currentOption || getSelectedFilter(code);

  const isSelected = option => option.code === selectedOption?.code;

  const handleChange = option => {
    onChange(code, option);
  };

  return (
    <OptionsWrap>
      {options.map(option => (
        <FilterOption
          key={option.code}
          option={option}
          onChange={handleChange}
          checked={isSelected(option)}
        />
      ))}
    </OptionsWrap>
  );
}

function OptionsWrap({ children, ...props }) {
  return (
    <div
      className="d-flex flex-column"
      css={`
        gap: 1em;
      `}
    >
      {children}
    </div>
  );
}

function FilterOption({ option, checked, onChange, type = "radio", ...props }) {
  const { colors } = useTheme();

  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(option);
  };

  return (
    <div
      className="rounded"
      css={`
        border: 1px solid ${colors.primary_color};
      `}
      {...props}
    >
      <label
        className="d-flex align-items-center justify-content-between px-2 py-1"
        css={`
          font-size: 0.79rem;
        `}
      >
        {option.display_name}
        <span
          css={`
            font-size: 1.6rem;
            color: ${colors.primary_color};
            line-height: 1;
          `}
        >
          {checked ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
        </span>
        <input
          className="visually-hidden"
          type={type}
          checked={checked}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

function FilterNavItem({ children, eventKey, ...props }) {
  return (
    <Nav.Item {...props}>
      <Nav.Link
        eventKey={eventKey}
        css={`
          &,
          &.active {
            font-size: 0.79rem;
            color: #000;
            font-weight: 700;
            padding: 1em;
          }
        `}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}

function MobileModal({ onClose, children }) {
  const { colors } = useTheme();
  return (
    <Modal
      show
      onHide={onClose}
      css={`
        & .modal-dialog {
          margin: 0;
        }

        & .modal-content {
          border-radius: 0;
        }
      `}
    >
      <div
        css={`
          height: 100vh;
          width: 100vw;
          overflow: auto;
        `}
      >
        <div
          className="p-3"
          css={`
            background-color: ${colors.primary_color};
            color: #fff;
          `}
        >
          <div
            className="d-flex align-items-center"
            css={`
              gap: 1em;
            `}
          >
            <button
              onClick={onClose}
              css={`
                color: #fff;
                line-height: 1;
              `}
            >
              <FaArrowLeft />
            </button>
            <h1
              className="m-0"
              css={`
                font-size: 1rem;
                font-weight: 900;
              `}
            >
              Filters
            </h1>
          </div>
        </div>
        {children}
      </div>
    </Modal>
  );
}

function SortByNavItem() {
  const modalToggle = useToggle(true);

  return (
    <div>
      <NavItem onClick={modalToggle.on} icon={<RiSortAsc />}>
        Sort
      </NavItem>
      <Dialog show={modalToggle.isOn} onHide={modalToggle.off} title="Sort By">
        <div className="p-3 pt-0">
          <div>
            <Option>Price</Option>
          </div>
          <Button className="w-100 mt-3">Sort By</Button>
        </div>
      </Dialog>
    </div>
  );
}

function Dialog({ onHide, show, title, children, ...props }) {
  const { colors } = useTheme();
  return (
    <Modal onHide={onHide} show={show} centered {...props}>
      <CloseButton onClick={onHide} />
      <h1
        className="p-3 m-0"
        css={`
          font-size: 1rem;
          font-weight: 900;
          border-bottom: 1px solid ${colors.border.one};
        `}
      >
        {title}
      </h1>
      {children}
    </Modal>
  );
}

function Option({ checked = false, onChange, type = "radio", children }) {
  const { colors } = useTheme();

  return (
    <label
      role="option"
      aria-selected={checked}
      className="d-flex align-items-center justify-content-between py-3"
      css={`
        :not(:last-child) {
          border-bottom: 1px solid ${colors.border.one};
        }
      `}
    >
      {children}
      <span
        css={`
          font-size: 1.6rem;
          color: ${colors.primary_color};
        `}
      >
        {checked ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
      </span>
      <input type={type} className="visually-hidden" onChange={onChange} />
    </label>
  );
}

export function NavItem({ icon: Icon = <></>, children, onClick, ...props }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onClick}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <div
        css={`
          font-size: 1.27rem;
          color: ${colors.font.six};
        `}
      >
        {Icon}
      </div>
      <div
        className="mt-1"
        css={`
          font-size: 0.79rem;
        `}
      >
        {children}
      </div>
    </button>
  );
}

function NavItemToggle({ icon: Icon = <></>, label = "", children }) {
  const toggle = useToggle(false);
  return (
    <div>
      <NavItem onClick={toggle.toggle} icon={Icon}>
        {label}
      </NavItem>
      {toggle.isOn
        ? React.Children.map(children, child =>
            React.cloneElement(child, { onClose: toggle.off }),
          )
        : null}
    </div>
  );
}
