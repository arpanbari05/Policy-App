import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  useFrontendBoot,
  useGetQuotes,
  useTheme,
} from "../../../../customHooks";
import { Filter, FilterHead } from ".";
import { FaTimes } from "react-icons/fa";
import { Button } from "../../../../components";
import {
  FilterOptions,
  getAllSelectedFilters,
  useFiltersSlot,
} from "../../mobile/components/Filters";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "styled-components/macro";
import useUpdateFilters from "./useUpdateFilters";
import useFilters from "./useFilters";
import useQuoteFilter from "./useQuoteFilter";
import { useGetEnquiriesQuery } from "../../../../api/api";

const getDescription = name => {
  switch (name) {
    case "Popular Filters":
      return "Benefits that one should prefer to opt for while securing a health plan.";

    case "Pre existing Ailments":
      return "Select preferred waiting period for Pre-Existing diseases after which the diseases will be covered.";

    case "Others":
      return "Benefits that one could opt for as per requirement while securing a health plan.";

    case "No Claim Bonus":
      return "Select preferred percentage of increase in No Claim Bonus which will increase Sum Insured upto thatcertain amount after claim free years.";

    default:
      break;
  }
};

const renderTooltipOverlay = description => <Tooltip>{description}</Tooltip>;

const renderDescription = name => renderTooltipOverlay(getDescription(name));

function getFlatQuotes(data) {
  return data.map(icQuote => icQuote.data.data)?.flat(Infinity);
}

function FilterModal({ onClose }) {
  const {
    data: { morefilters },
  } = useFrontendBoot();

  const {
    data: {
      data: { section },
    },
  } = useGetEnquiriesQuery();

  const { getSelectedFilter } = useFilters();

  const { filters, updateFilter, clearFilters } = useFiltersSlot({
    initialFilters: getAllSelectedFilters(
      morefilters.map(filter => filter.code),
      getSelectedFilter,
    ),
  });

  const { updateFilters } = useUpdateFilters();

  const handleShowPlansClick = () => {
    updateFilters(filters);
    onClose && onClose();
  };

  const { quotesWithoutMoreFilters } = useGetQuotes();

  const { filterQuotes } = useQuoteFilter({ givenMoreFilters: filters });

  const filteredQuotes = quotesWithoutMoreFilters
    ? filterQuotes(getFlatQuotes(quotesWithoutMoreFilters))
    : [];

  const length = [...new Set(filteredQuotes.map(quote => quote?.product?.name))]
    ?.length;

  // HAVE TO RENDER THESE QUOTES

  return (
    <Modal
      show
      centered
      onHide={() => onClose && onClose()}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 650px;
        }
      `}
    >
      <Modal.Header>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          More Filters
        </Modal.Title>
        <button onClick={() => onClose && onClose()}>
          <FaTimes />
        </button>
      </Modal.Header>
      <div
        className="p-3 pb-0 d-flex flex-column"
        css={`
          gap: 1em;
          // max-height: ${section === "top_up" ? "63vh" : "67vh"};
          // min-height: 60vh;
          // overflow: auto;
        `}
      >
        {morefilters
          ?.filter(filter => {
            if (section === "top_up") {
              return filter.code !== "no_claim_bonus";
            } else return true;
          })
          .map((filter, idx) => (
            <>
              <FilterGroup
                filter={filter}
                key={filter.code + idx}
                currentOption={filters[filter.code]}
                onChange={updateFilter}
              />
            </>
          ))}
      </div>
      <div
        className="pb-2 px-2 d-flex justify-content-between"
        css={`
          padding-top: 7px;
        `}
      >
        <button
          css={`
            width: 50% !important;
          `}
          onClick={clearFilters}
        >
          <span
            css={`
              border-bottom: 3px dotted #777;
            `}
          >
            Clear filters
          </span>
        </button>
        {length ? (
          <Button
            css={`
              width: 50% !important;
            `}
            onClick={handleShowPlansClick}
          >
            Show {length} plans
          </Button>
        ) : (
          <button
            css={`
              width: 50% !important;
              height: 2.8em;
            `}
            disabled
            onClick={clearFilters}
          >
            No plan available
          </button>
        )}
      </div>
    </Modal>
  );
}

function FilterGroup({ filter, currentOption, onChange }) {
  const { colors } = useTheme();

  return (
    <section
      css={`
        :not(:last-child) {
          border-bottom: 1px solid ${colors.border.two};
        }
      `}
    >
      <OverlayTrigger
        placement="right"
        overlay={renderDescription(filter.group_name)}
      >
        <h1
          css={`
            font-size: 1rem;
            color: ${colors.primary_color};
            max-width: max-content;
            font-weight: 900;
          `}
        >
          {filter.group_name}
          <IoMdInformationCircleOutline />
        </h1>
      </OverlayTrigger>
      <div className="d-flex flex-wrap">
        <FilterOptions
          className="flex-row flex-wrap justify-content-between"
          key={filter.code}
          code={filter.code}
          options={filter.options}
          currentOption={currentOption}
          onChange={onChange}
          type={filter.type}
        />
      </div>
    </section>
  );
}

const MoreFilters = () => {
  return (
    <Filter>
      <FilterHead label={"More Filters"}>Select filters</FilterHead>
      <FilterModal show />
    </Filter>
  );
};

export default MoreFilters;
