import { Modal } from "react-bootstrap";
import { GiCircle } from "react-icons/gi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "styled-components/macro";
import { Button, CircleCloseButton, CircleLoader } from "../../../components";
import {
  useCompanies,
  useGetQuotes,
  useQuoteCard,
  useQuotesCompare,
  useTheme,
} from "../../../customHooks";
import _ from "lodash";
import { useEffect, useState } from "react";
import * as mq from "../../../utils/mediaQueries";

function AddPlansModal({ onClose, compareQuotes = [], ...props }) {
  const handleClose = () => onClose && onClose();

  const { colors } = useTheme();

  const compareList = useQuotesCompare(compareQuotes);

  const { quotes, getUpdateCompareQuotesMutation } = compareList;

  let error;

  if (quotes.length < 2)
    error = `Add ${2 - quotes.length} more plan to compare`;

  const { groupCode } = useParams();

  const [updateCompareQuotesMutation] = getUpdateCompareQuotesMutation(
    parseInt(groupCode),
  );
  const handleCompareClick = () => {
    updateCompareQuotesMutation(quotes).then(handleClose);
  };

  return (
    <Modal
      onHide={handleClose}
      show
      css={`
        & .modal-dialog {
          max-width: 1200px;
        }
        & .modal-content {
          padding: 0 1em 1em;
        }
      `}
      {...props}
    >
      <CircleCloseButton placeOnCorner onClick={handleClose} />
      <div
        className="d-flex align-items-center justify-content-between p-3"
        css={`
          border-bottom: 1px solid ${colors.border.one};
          height: 4.73em;
        `}
      >
        <h1
          className="m-0"
          css={`
            font-weight: 900;
            font-size: 1.37rem;
          `}
        >
          Add upto 3 plans to compare
        </h1>
        {error ? (
          <div
            css={`
              color: red;
              font-size: 0.89rem;
            `}
          >
            {error}
          </div>
        ) : (
          <Button onClick={handleCompareClick}>Compare</Button>
        )}
      </div>
      <div className="p-3">
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            gap: 1em;
            & > div {
              flex: 1 1 calc(33% - 0.5em);
              height: 8em;
            }
          `}
        >
          {quotes.map(quote => (
            <CompareQuoteCard
              key={quote.product.id + quote.sum_insured}
              quote={quote}
              onRemove={compareList.removeQuote}
            />
          ))}
          {Array.from({ length: 3 - quotes.length }).map((_, idx) => (
            <div
              key={idx}
              className="rounded d-flex align-items-center justify-content-center"
              css={`
                background-color: ${colors.secondary_shade};
              `}
            >
              No plans added
            </div>
          ))}
        </div>
        <div
          className="mt-3"
          css={`
            border-bottom: 1px dashed;
          `}
        />
      </div>
      <Quotes compareList={compareList} />
    </Modal>
  );
}

export default AddPlansModal;

function Quotes({ compareList, ...props }) {
  const { data, isLoading } = useGetQuotes();

  if (!data) return null;

  const handleCompareChange = ({ checked, quote }) => {
    if (checked) {
      compareList.addQuote(quote);
      return;
    }

    compareList.removeQuote(quote);
  };

  const getQuoteCardProps = quotes => ({
    icQuotes: quotes,
    compare: {
      checkFn: compareList.isCompareQuote,
      onChange: handleCompareChange,
    },
  });

  return (
    <div
      className="px-3 pb-3 d-flex flex-wrap"
      css={`
        gap: 1em;
        & > div {
          flex: 1;
          max-width: calc(50% - 0.5em);
        }

        ${mq.mobile} {
          flex-direction: column;
          & > div {
            max-width: 100%;
          }
        }
      `}
      {...props}
    >
      {data
        .filter(icQuotes => !!icQuotes.data.data.length)
        .map(icQuotes => (
          <QuoteCard
            key={icQuotes.company_alias}
            {...getQuoteCardProps(icQuotes)}
          />
        ))}
      {isLoading && (
        <div>
          <CircleLoader animation="border" />{" "}
        </div>
      )}
    </div>
  );
}

function getDistinctProducts(quotes) {
  const products = {};
  for (let quote of quotes) {
    products[quote.product.id] = quote.product;
  }
  return Object.values(products);
}

function filterQuotesById(quotes = [], id) {
  return quotes.filter(quote => quote.product.id === id);
}

function QuoteCard({
  icQuotes,
  compare: { checkFn, onChange } = {},
  ...props
}) {
  const { colors } = useTheme();
  const { getCompanyLogo } = useCompanies();

  const quotes = icQuotes.data.data;

  const products = getDistinctProducts(quotes);

  const [product, setProduct] = useState(products[0]);

  const currentQuotes = filterQuotesById(quotes, product.id);

  const { deductibles, sumInsureds } = useQuoteCard({ quotes: currentQuotes });

  const [deductible, setDeductible] = useState(deductibles[0]);

  const [sumInsured, setSumInsured] = useState(sumInsureds[0]);

  const quote = currentQuotes.find(quote =>
    _.every([
      parseInt(quote.product.id) === parseInt(product.id),
      parseInt(quote.sum_insured) === parseInt(sumInsured),
    ]),
  );

  useEffect(() => {
    if (!quote) {
      setSumInsured(sumInsureds[0]);
    }
  }, [sumInsureds, quote]);

  if (!quote) return null;

  const isCompareQuoute = checkFn(quote);

  const handleCompareChange = evt => {
    const { checked } = evt.target;
    onChange && onChange({ checked, quote });
  };

  const logo = getCompanyLogo(quote.company_alias);

  const id = quote.product.id + quote.sum_insured + quote.deductible;

  return (
    <div className="shadow p-3 position-relative" {...props}>
      <label
        htmlFor={id}
        className="position-absolute shadow rounded-circle"
        css={`
          top: 0;
          right: 0;
          transform: translate(30%, -30%);
          line-height: 1;
          cursor: pointer;
          color: ${colors.primary_color};
          & svg {
            height: 1.6em;
            width: 1.6em;
          }
        `}
      >
        {isCompareQuoute ? <IoCheckmarkCircleSharp /> : <GiCircle />}
        <input
          className="visually-hidden"
          type={"checkbox"}
          name={id}
          id={id}
          checked={isCompareQuoute}
          onChange={handleCompareChange}
        />
      </label>
      <div className="d-flex align-items-center">
        <img height={"37"} src={logo} alt={icQuotes.company_alias} />
        <div
          className="mx-3"
          css={`
            font-size: 0.89rem;
            font-weight: 900;
          `}
        >
          {quote.product.company.name}
        </div>
      </div>
      <div
        className="d-flex mt-2"
        css={`
          gap: 1em;
        `}
      >
        <QuoteCardOption title="Product:">
          <select
            css={`
              width: 10em;
            `}
            value={product.id}
            onChange={evt =>
              setProduct(
                products.find(product => product.id === evt.target.value),
              )
            }
          >
            {products.map(product => (
              <option key={product.name} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </QuoteCardOption>
        <QuoteCardOption title="Deductible:">
          <select
            value={deductible}
            onChange={evt => setDeductible(parseInt(evt.target.value))}
          >
            {deductibles.map(deductible => (
              <option key={deductible} value={deductible}>
                {deductible}
              </option>
            ))}
          </select>
        </QuoteCardOption>
        <QuoteCardOption title="Sum Insured:">
          <select
            value={sumInsured}
            onChange={evt => setSumInsured(evt.target.value)}
          >
            {sumInsureds.map(sumInsured => (
              <option key={sumInsured} value={sumInsured}>
                {sumInsured}
              </option>
            ))}
          </select>
        </QuoteCardOption>
      </div>
    </div>
  );
}

function QuoteCardOption({ title = "", children, ...props }) {
  const { colors } = useTheme();
  return (
    <div>
      <div
        css={`
          font-size: 0.79rem;
          color: ${colors.font.three};
          padding-left: 0.3em;
        `}
      >
        {title}
      </div>
      <div
        css={`
          font-size: 0.83rem;
        `}
      >
        {children}
      </div>
    </div>
  );
}

function CompareQuoteCard({ quote, onRemove, ...props }) {
  const { getCompany } = useCompanies();

  if (!quote) return null;

  const { logo } = getCompany(quote.company_alias);

  const handleCloseClick = () => onRemove && onRemove(quote);

  return (
    <div
      className="p-3 shadow rounded position-relative"
      css={`
        flex: 1;
      `}
      {...props}
    >
      <CircleCloseButton placeOnCorner onClick={handleCloseClick} />
      <div className="d-flex align-items-center">
        <img src={logo} height={"37"} alt={quote.company_alias} />
        <h2
          className="mx-3"
          css={`
            font-size: 1rem;
            font-weight: 900;
          `}
        >
          {quote.product.name}
        </h2>
      </div>
      <div
        className="mt-3 d-flex align-items-center justify-content-around"
        css={`
          & > div {
            flex: 1;
          }
        `}
      >
        {quote.deductible ? (
          <QuoteCardOption title="Deductible:">
            {quote.deductible}
          </QuoteCardOption>
        ) : null}
        <QuoteCardOption title="Sum Insured:">
          {quote.sum_insured}
        </QuoteCardOption>
        <QuoteCardOption title="Premium:">
          {quote.total_premium}
        </QuoteCardOption>
      </div>
    </div>
  );
}
