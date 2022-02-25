import { useState, useRef } from "react";
import { Modal, Nav, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { Button } from "../../../../components";
import {
  useCompanies,
  useFrontendBoot,
  useGetQuotes,
  useTheme,
} from "../../../../customHooks";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import useFilters from "../../components/filters/useFilters";
import useUpdateFilters from "../../components/filters/useUpdateFilters";
import { tenures } from "../../data";
import * as mq from "../../../../utils/mediaQueries";
import "styled-components/macro";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

export function useFiltersSlot({ initialFilters } = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (code, option, type) => {
    const isChecked = filters[code]?.find(
      singleSelectedOption => singleSelectedOption?.code === option.code,
    );

    let updateFilters =
      type === "radio"
        ? {
            ...filters,
            [code]: filters[code] ? [option] : [option], // IMPLEMENTS RADIO FUNCTIONALITY
          }
        : {
            ...filters,
            [code]: filters[code] ? [...filters[code], option] : [option], // IMPLEMENTS CHECKBOX FUNCTIONALITY
          };

    if (isChecked)
      updateFilters = {
        ...filters,
        [code]:
          type === "radio"
            ? undefined
            : filters[code]?.filter(
                singleSelectedOption =>
                  singleSelectedOption?.code !== option.code,
              ),
      }; // REMOVAL LOGIC
    setFilters(updateFilters);
  };

  const clearFilters = () => setFilters({});

  return { filters, updateFilter, clearFilters };
}

export function getAllSelectedFilters(filters, filterSelector) {
  const allFilters = {};

  for (let filter of filters) {
    allFilters[filter] = filterSelector(filter);
  }

  return allFilters;
}

export function FilterModal({ onClose }) {
  const { boxShadows } = useTheme();

  const { getSelectedFilter } = useFilters();

  const {
    data: { premiums, covers, plantypes, morefilters, deductibles },
    journeyType,
  } = useFrontendBoot();

  const {
    updateFilters,
    resetFilters,
    query: updateFiltersMutation,
  } = useUpdateFilters();

  const { filters, updateFilter, clearFilters } = useFiltersSlot({
    initialFilters: getAllSelectedFilters(
      [
        "premium",
        "cover",
        "plantype",
        "deductible",
        ...morefilters.map(filter => filter.code),
      ],
      getSelectedFilter,
    ),
  });

  const handleClearFiltersClick = () => {
    clearFilters();
    resetFilters();
  };

  const handleShowPlansClick = () => {
    updateFilters(filters);
    onClose && onClose();
  };

  const RenderFilterOptions = ({ code, options, type }) => (
    <Tab.Pane eventKey={code}>
      <FilterOptions
        code={code}
        options={options}
        currentOption={filters[code]}
        onChange={updateFilter}
        type={type}
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
                type={filter.type}
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
          onClick={handleClearFiltersClick}
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

export function FilterOptions({
  code,
  options,
  currentOption,
  onChange,
  type,
  ...props
}) {
  const selectedOption = currentOption ? [...currentOption] : []; // [{}..] Read Only Behaviour reccomended.

  const isSelected = option =>
    selectedOption.find(singleOption => singleOption?.code === option?.code)
      ? true
      : false;

  const handleChange = option => {
    onChange && onChange(code, option, type);
  };

  return (
    <OptionsWrap {...props}>
      {options.map(option => (
        <FilterOption
          key={option.code}
          option={option}
          onChange={handleChange}
          checked={isSelected(option)}
          type={type}
        />
      ))}
    </OptionsWrap>
  );
}

function OptionsWrap({ children, className, css = "", ...props }) {
  return (
    <div
      className={`w-100 d-flex ${className ? className : ""}`}
      css={`
        flex-direction: column;
        ${mq.mobile} {
          gap: 1em;
        }
        ${css};
      `}
      {...props}
    >
      {children}
    </div>
  );
}

function FilterOption({ option, checked, onChange, type = "radio", ...props }) {
  const { colors } = useTheme();

  const handleChange = () => {
    onChange && onChange(option, !checked);
  };

  return (
    <div
      className="rounded"
      css={`
        width: calc(50% - 0.5em);
        ${mq.mobile} {
          width: 100%;
          border: 1px solid ${colors.primary_color};
        }
      `}
      {...props}
    >
      <label
        role="button"
        className="d-flex align-items-center justify-content-between px-2 py-1"
        css={`
          font-size: 0.79rem;
        `}
      >
        <FilterDataSet
          name={option.display_name}
          description={option.description}
        />
        <span
          css={`
            font-size: 1.6rem;
            line-height: 1;
            margin-bottom: 0.2em;
            color: ${colors.primary_color};
          `}
          onClick={handleChange}
        >
          {type === "radio" ? (
            checked ? (
              <IoRadioButtonOn />
            ) : (
              <IoRadioButtonOff />
            )
          ) : checked ? (
            <RiCheckboxFill />
          ) : (
            <RiCheckboxBlankLine />
          )}
        </span>
        <input
          className="visually-hidden"
          type={type}
          checked={checked}
          readOnly
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

function InsurersFilter({ onChange, currentOption }) {
  const { isLoading, data } = useGetQuotes();

  const companies = data
    ? data
        .filter(icQuotes => !!icQuotes.data.data.length)
        .map(icQuotes => icQuotes.company_alias)
    : [];

  const handleChange = (company, evt) => {
    if (evt.target.checked) {
      onChange && onChange();
    }
  };

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

function FilterDataSet({ name, description, ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  useOutsiteClick(target, () => setShowTooltip(false));

  const toggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };
  return (
    <OverlayTrigger
      show={showTooltip}
      placement="bottom"
      overlay={<Tooltip {...props}>{description}</Tooltip>}
    >
      <div className="d-flex align-items-center" onClick={toggleTooltip}>
        {name}
        <IoMdInformationCircleOutline className="mx-1" />
      </div>
    </OverlayTrigger>
  );
}
