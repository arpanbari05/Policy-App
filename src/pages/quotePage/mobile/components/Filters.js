import { useState, useRef } from "react";
import { Nav, OverlayTrigger, Tab, Tooltip } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { IoRadioButtonOn } from "react-icons/io5";
import { Button } from "../../../../components";
import {
  useCompanies,
  useFrontendBoot,
  useTheme,
  useFilterOrder,
} from "../../../../customHooks";
import useOutsiteClick from "../../../../customHooks/useOutsideClick";
import useFilters from "../../components/filters/useFilters";
import useUpdateFilters from "../../components/filters/useUpdateFilters";
import { tenures } from "../../data";
import * as mq from "../../../../utils/mediaQueries";
import "styled-components/macro";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiCheckboxBlankCircleLine, RiCheckboxFill } from "react-icons/ri";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import useWindowSize from "../../../../customHooks/useWindowSize";
import { useGetEnquiriesQuery } from "../../../../api/api";
import { ClickSound, isSSOJourney } from "../../../../utils/helper";
import { useDispatch } from "react-redux";
import { setPosPopup } from "../../quote.slice";
import {
  validateCustomCover,
  CustomInputWrapper,
} from "../../components/filters/CoverRangeFilter";

const availableMoreFilters = {
  popular_filters: true,
  pre_existing_ailments: true,
  no_claim_bonus: true,
  others: true,
};

export function useFiltersSlot({ initialFilters } = {}) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (code, option, type) => {
    let isChecked, updateFilters;
    //MORE FILTERS UPDATION CHECK FUNCTIONALITY *MOBILE OR DESKTOP*
    if (availableMoreFilters[code]) {
      isChecked = filters[code]?.find(
        singleSelectedOption =>
          singleSelectedOption?.display_name === option?.display_name,
      );

      updateFilters =
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
                    singleSelectedOption?.display_name !== option?.display_name,
                ),
        }; // REMOVAL LOGIC
    } else {
      isChecked = filters[code]?.display_name === option?.display_name;
      if (type === "check") {
        isChecked =
          Array.isArray(filters[code]) &&
          filters[code]?.find(insurer => insurer.alias === option?.alias);
        updateFilters = { ...filters };
        if (isChecked) {
          updateFilters = {
            ...filters,
            [code]: updateFilters[code]?.filter(
              filter => filter.alias !== option?.alias,
            ),
          };
        } else {
          updateFilters = {
            ...filters,
            [code]: [...updateFilters[code], option],
          };
        }
      } else {
        updateFilters = { ...filters, [code]: option };
        if (isChecked) updateFilters = { ...filters, [code]: null };
      }
    }
    setFilters(updateFilters);
  };

  const clearFilters = () =>
    setFilters({
      others: [],
      popular_filters: [],
      pre_existing_ailments: null,
      no_claim_bonus: null,
    });

  return { filters, updateFilter, clearFilters };
}

export function getAllSelectedFilters(filters, filterSelector) {
  const allFilters = {};

  for (let filter of filters) {
    allFilters[filter] = filterSelector(filter);
  }

  return allFilters;
}

export function FilterModal({ onClose, show }) {
  const { boxShadows, colors } = useTheme();

  const dispatch = useDispatch();

  const { getSelectedFilter } = useFilters();
  const selectedPolicyTypeFilter = getSelectedFilter("plantype");

  const {
    data: {
      premiums,
      plantypes,
      baseplantypes,
      morefilters,
      deductibles,
      settings: {
        pos_nonpos_switch_message,
        restrict_posp_quotes_after_limit,
        multiindividual_visibilty,
      },
    },
    journeyType,
  } = useFrontendBoot();

  const { filterOrder } = useFilterOrder();

  let {
    data: { covers },
  } = useFrontendBoot();

  if (
    localStorage.getItem("SSO_user") &&
    restrict_posp_quotes_after_limit === `${1}`
  ) {
    covers = covers.slice(0, 2);
  }

  const {
    updateFilters,
    resetFilters,
    query: updateFiltersMutation,
  } = useUpdateFilters();

  const { filters, updateFilter, clearFilters } = useFiltersSlot({
    initialFilters: () => {
      return getAllSelectedFilters(
        [
          "premium",
          "tenure",
          "cover",
          "plantype",
          "insurers",
          "deductible",
          "baseplantype",
          ...morefilters.map(filter => filter.code),
        ],
        getSelectedFilter,
      );
    },
  });

  const [customCoverError, setCustomCoverError] = useState("");
  const [customCover, setCustomCover] = useState({});

  const handleCustomCoverChange = (evt, onChange) => {
    let { value: givenCustomCover } = evt.target;

    if (!givenCustomCover) {
      setCustomCover("");
      setCustomCoverError("");
      onChange?.(getSelectedFilter("cover"));
      return;
    }

    givenCustomCover = parseInt(givenCustomCover);

    if (givenCustomCover >= 0) {
      setCustomCover(givenCustomCover);

      const customCoverError = validateCustomCover(givenCustomCover);

      if (customCoverError) {
        setCustomCoverError(customCoverError);
        onChange?.({});

        return;
      }

      setCustomCoverError("");
      onChange?.({
        code: `${givenCustomCover}-${givenCustomCover}`,
        display_name: givenCustomCover,
        custom: `${givenCustomCover}`,
      });
    }
  };

  const handleClearFiltersClick = () => {
    clearFilters();
    resetFilters();
  };

  const handleShowPlansClick = () => {
    updateFilters(filters);
    // eslint-disable-next-line no-unused-expressions
    !filters?.cover?.applicable_on_pos &&
    isSSOJourney() &&
    pos_nonpos_switch_message
      ? dispatch(setPosPopup(true))
      : dispatch(setPosPopup(false));
    onClose?.();
  };

  const NAV = {
    multiyear_option: (
      <FilterNavItem key="tenure" eventKey={"tenure"}>
        Multiyear Options
      </FilterNavItem>
    ),
    policy_type:
      selectedPolicyTypeFilter?.display_name !== "Individual" &&
      journeyType !== "top_up" &&
      +multiindividual_visibilty !== 0 ? (
        <FilterNavItem key={"plantype"} eventKey={"plantype"}>
          Policy type
        </FilterNavItem>
      ) : null,
    plan_type: (
      <FilterNavItem key={"baseplantype"} eventKey={"baseplantype"}>
        Plan type
      </FilterNavItem>
    ),
    cover:
      journeyType === "health" ? (
        <FilterNavItem key={"cover"} eventKey={"cover"}>
          Cover
        </FilterNavItem>
      ) : (
        <FilterNavItem key={"deductible"} eventKey={"deductible"}>
          Deductible
        </FilterNavItem>
      ),
    premium: (
      <FilterNavItem key={"premium"} eventKey={"premium"}>
        Premium
      </FilterNavItem>
    ),
    insurer: (
      <FilterNavItem key={"insurers"} eventKey={"insurers"}>
        Insurers
      </FilterNavItem>
    ),
    more_filter: morefilters.map(filter => (
      <FilterNavItem eventKey={filter.code} key={filter.code}>
        {filter.group_name}
      </FilterNavItem>
    )),
  };

  const RenderFilterOptions = ({ code, options, type, showTooltip }) => (
    <Tab.Pane eventKey={code}>
      <FilterOptions
        code={code}
        options={options}
        currentOption={filters[code]}
        onChange={updateFilter}
        type={type}
        showTooltip={showTooltip}
      />
      {/* {code === "cover" && ( */}
      {false && (
        <CustomInputWrapper className="mt-3">
          <input
            type="number"
            placeholder="Enter your own cover."
            className="w-100"
            autoFocus
            value={customCover}
            onChange={e =>
              handleCustomCoverChange(e, option =>
                updateFilter(code, option, type),
              )
            }
          />
          {customCoverError ? (
            <div className="bottom_msg">{customCoverError}</div>
          ) : null}
        </CustomInputWrapper>
      )}
    </Tab.Pane>
  );

  return (
    <MobileModal onClose={onClose} show={show}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="premium">
        <div
          className="d-flex min-vh-100"
          css={`
            & .nav-link.active {
              background-image: linear-gradient(
                90deg,
                ${colors.primary_shade},
                #fff
              );
            }
            margin-bottom: 3em;
            padding-bottom: 1.5rem;
          `}
        >
          <Nav
            className="flex-column"
            css={`
              flex: 1;
              box-shadow: ${boxShadows.one};
              position: sticky;
            `}
          >
            {filterOrder?.map(filter => NAV[filter])}
          </Nav>

          <Tab.Content
            className="p-3"
            css={`
              flex: 2;
              overflow: auto;
              height: 82vh;
            `}
          >
            <RenderFilterOptions
              showTooltip={false}
              code="premium"
              options={premiums}
            />
            {journeyType === "health" ? (
              <RenderFilterOptions
                showTooltip={false}
                code="cover"
                options={covers}
              />
            ) : (
              <RenderFilterOptions
                showTooltip={false}
                code="deductible"
                options={deductibles}
              />
            )}
            {+multiindividual_visibilty !== 0 && (
              <RenderFilterOptions
                code="plantype"
                options={plantypes.filter(plantype => plantype.code !== "I")}
              />
            )}
            <RenderFilterOptions
              showTooltip={false}
              code="tenure"
              options={tenures}
            />
            <RenderFilterOptions
              // showTooltip={false}
              code="baseplantype"
              options={baseplantypes}
            />
            <Tab.Pane eventKey="insurers">
              <InsurersFilter
                code="insurers"
                onChange={updateFilter}
                currentOptions={filters.insurers}
              />
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

  showTooltip,
  ...props
}) {
  let selectedOption, isSelected;

  const {
    data: {
      data: { section },
    },
  } = useGetEnquiriesQuery();

  //MORE FILTERS CHECK FUNCTIONALITY *MOBILE OR DESKTOP*
  if (availableMoreFilters[code]) {
    selectedOption = currentOption ? [...currentOption] : [];

    isSelected = option =>
      selectedOption.find(
        singleOption => singleOption?.display_name === option?.display_name,
      )
        ? true
        : false;
  } else {
    selectedOption = currentOption;

    isSelected = option => option.display_name === selectedOption?.display_name;
  }

  const handleChange = option => {
    onChange?.(code, option, type);
  };

  return (
    <OptionsWrap {...props}>
      {options
        .filter(opt =>
          opt?.visible_on_sections
            ? opt?.visible_on_sections?.includes(section)
            : true,
        )
        .map(option => (
          <FilterOption
            showTooltip={showTooltip}
            key={option.display_name}
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
          & > *:not(:last-child) {
            margin-bottom: 0.8rem;
          }
        }
        ${css};
      `}
      {...props}
    >
      {children}
    </div>
  );
}

function FilterOption({
  option,
  checked,
  onChange,
  type = "radio",
  showTooltip = true,
  ...props
}) {
  const { colors } = useTheme();

  const handleChange = () => {
    ClickSound();
    onChange?.(option, !checked);
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
        aria-hidden="true"
        className="d-flex align-items-center justify-content-between px-2 py-1"
        css={`
          font-size: 0.79rem;
        `}
        name={option.display_name}
      >
        <FilterDataSet
          name={option.display_name}
          description={option.description}
          tooltip={showTooltip}
        />
        <span
          aria-hidden="true"
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
              <RiCheckboxBlankCircleLine color="#aaa" />
            )
          ) : checked ? (
            <RiCheckboxFill />
          ) : (
            <MdOutlineCheckBoxOutlineBlank fontWeight={"300"} color="#aaa" />
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

function InsurersFilter({ onChange, currentOptions, code }) {
  const { companies } = useCompanies();

  const handleChange = company => {
    // if (evt.target.checked) {
    onChange?.(code, company, "check");
    // }
  };

  return (
    <OptionsWrap>
      {Object.keys(companies).map(companyAlias => (
        <InsurerOption
          key={companyAlias}
          currentOptions={currentOptions}
          companyAlias={companyAlias}
          onChange={handleChange}
          company={companies[companyAlias]}
        />
      ))}
    </OptionsWrap>
  );
}

function InsurerOption({
  companyAlias,
  onChange,
  currentOptions = [],
  company,
  ...props
}) {
  const [checked, setChecked] = useState(
    currentOptions.find(opt => opt.alias === companyAlias),
  );

  const { colors } = useTheme();

  const handleChange = evt => {
    setChecked(evt.target.checked);
    onChange?.(company, evt);
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
        <div className="d-flex align-items-center gap-1">
          <img
            src={company.logo}
            alt={companyAlias}
            css={`
              // width: 6em;
              height: 2em;
              object-fit: contain;
            `}
          />
          <span>{company.short_name}</span>
        </div>
        <span
          css={`
            font-size: 1.6rem;
            color: ${colors.primary_color};
            line-height: 1;
          `}
        >
          {checked ? (
            <RiCheckboxFill />
          ) : (
            <MdOutlineCheckBoxOutlineBlank fontWeight={"300"} color="#aaa" />
          )}
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

function CustomFilterModal({ show, children }) {
  return (
    <div
      css={`
        // display: ${show ? "block" : "none"};
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999;
        background: white;
      `}
    >
      <div
        css={`
          width: 100%;
          height: 100vh;
        `}
      >
        {children}
      </div>
    </div>
  );
}

function MobileModal({ onClose, children, show }) {
  const { colors } = useTheme();
  return (
    show && (
      <CustomFilterModal show={show}>
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
      </CustomFilterModal>
    )
  );
}

function FilterDataSet({ name, description, tooltip, ...props }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  const [innerWidth] = useWindowSize();
  useOutsiteClick(target, () => setShowTooltip(false));

  const toggleTooltip = () => {
    setShowTooltip(prev => !prev);
  };

  const tooltipWrapper =
    innerWidth < 768 ? (
      <div
        css={`
          gap: 3px;
        `}
        className="d-flex align-items-center"
      >
        <div
          style={{ fontWeight: "bold", fontSize: 14 }}
          className="d-flex align-items-center gap-1"
        >
          {name}
        </div>
        <OverlayTrigger
          show={showTooltip}
          placement="bottom"
          overlay={<Tooltip {...props}>{description}</Tooltip>}
        >
          <span aria-hidden="true" ref={target} onClick={toggleTooltip}>
            <IoMdInformationCircleOutline />
          </span>
        </OverlayTrigger>
      </div>
    ) : (
      <div
        css={`
          gap: 3px;
        `}
        className="d-flex align-items-center"
      >
        <div
          style={{ fontWeight: "bold", fontSize: 14 }}
          className="d-flex align-items-center gap-1"
        >
          {name}
        </div>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip {...props}>{description}</Tooltip>}
        >
          <span>
            <IoMdInformationCircleOutline />
          </span>
        </OverlayTrigger>
      </div>
    );

  return tooltip ? (
    <>{tooltipWrapper}</>
  ) : (
    <div style={{ fontWeight: "bold", fontSize: 14 }}>{name}</div>
  );
}
