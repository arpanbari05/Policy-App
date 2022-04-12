import { Modal } from "react-bootstrap";
import { GiCircle } from "react-icons/gi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "styled-components/macro";
import { Button, CircleCloseButton, CircleLoader } from "../../../components";
import {
  useCompanies,
  useFrontendBoot,
  useGetQuotes,
  useQuoteCard,
  useQuotesCompare,
  useTheme,
} from "../../../customHooks";
import _ from "lodash";
import { useEffect, useState } from "react";
import * as mq from "../../../utils/mediaQueries";
import { numToLakh } from "../../../utils/helper";

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

            @media (max-width: 768px) {
              font-size: 1rem;
            }
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
          css={`
            gap: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            @media (min-width: 450px) {
              & > div {
                flex: 1 1 calc(33% - 0.5em);
                height: 8em;
              }
            }

            @media (max-width: 450px) {
              gap: 1rem;
              display: block;

              & > div {
                margin-bottom: 10px;
              }
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

                @media (max-width: 450px) {
                  height: 8em;
                }
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
  const { journeyType } = useFrontendBoot();

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
      className="pb-3"
      css={`
        gap: 20px;
        padding-left: 1rem;
        padding-right: 1rem;
        display: grid;
        grid-template-columns: ${journeyType === "top_up"
          ? "repeat(2, 1fr)"
          : "repeat(3, 1fr)"};
        & > div {
        }

        ${mq.mobile} {
          grid-template-columns: 1fr;
          padding-left: 0;
          padding-right: 0;
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
  const { journeyType } = useFrontendBoot();
  const { colors } = useTheme();
  const { getCompanyLogo } = useCompanies();

  const quotes = icQuotes.data.data;

  const products = getDistinctProducts(quotes);

  const [product, setProduct] = useState(products[0]);

  const currentQuotes = filterQuotesById(quotes, product.id);

  const { deductibles, sumInsureds } = useQuoteCard({ quotes: currentQuotes });

  const [deductible, setDeductible] = useState(deductibles && deductibles[0]);

  const [sumInsured, setSumInsured] = useState(sumInsureds && sumInsureds[0]);

  const quote = currentQuotes.find(quote =>
    _.every([
      parseInt(quote.product.id) === parseInt(product.id),
      parseInt(quote.sum_insured) === parseInt(sumInsured),
    ]),
  );

  useEffect(() => {
    if (!quote) {
      setSumInsured(sumInsureds && sumInsureds[0]);
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
          background-color: rgb(249, 249, 249);
          padding: 8px 10px;
          border-radius: 10px;
          gap: ${journeyType === "top_up" ? "3em" : "2em"};
        `}
      >
        <QuoteCardOption title="Product:">
          <select
            css={`
              width: 12em;

              @media (max-width: 480px) {
                width: 9rem;
                font-size: 13px;
              }
            `}
            title={product.name}
            value={product.id}
            onChange={evt => {
              setProduct(
                products.find(
                  productData => productData.id.toString() === evt.target.value,
                ),
              );
            }}
          >
            {products.map(product => (
              <option
                key={product.name}
                value={product.id}
                title={product.name}
              >
                {product.name}
              </option>
            ))}
          </select>
        </QuoteCardOption>
        {journeyType === "top_up" && (
          <QuoteCardOption title="Deductible:">
            <select
              value={deductible}
              onChange={evt => setDeductible(parseInt(evt.target.value))}
            >
              {deductibles.map(deductible => (
                <option key={deductible} value={deductible}>
                  {numToLakh(deductible)}
                </option>
              ))}
            </select>
          </QuoteCardOption>
        )}
        <QuoteCardOption title="Sum Insured:">
          <select
            value={sumInsured}
            onChange={evt => setSumInsured(evt.target.value)}
          >
            {sumInsureds.map(sumInsured => (
              <option key={sumInsured} value={sumInsured}>
                {numToLakh(sumInsured)}
              </option>
            ))}
          </select>
        </QuoteCardOption>
      </div>
    </div>
  );
}

function QuoteCardOption({ title = "", children, ...props }) {
  return (
    <div>
      <div
        css={`
          color: rgb(80, 95, 121);
          font-size: 14px;
          @media (max-width: 480px) {
            font-size: 13px;
          }
        `}
      >
        {title}
      </div>
      <div
        css={`
          font-weight: 900;
          font-size: 14px;
          @media (max-width: 480px) {
            font-size: 13px;
          }
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
        <img src={logo} height={"32"} alt={quote.company_alias} />
        <h2
          className="mx-3"
          css={`
            font-size: 0.85rem;
            font-weight: 900;
            word-break: break-all;
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
          {numToLakh(quote.sum_insured)}
        </QuoteCardOption>
        <QuoteCardOption title="Premium:">
          {quote.total_premium} / Year
        </QuoteCardOption>
      </div>
    </div>
  );
}
