import { useMemo, useState } from "react";
import { useGetTopUpAddOnsQuery } from "../../../../api/api";
import {
  useAddOns,
  useCompanies,
  useQuoteCard,
  useTheme,
  useToggle,
} from "../../../../customHooks";
import FeatureSection from "../FeatureSection/FeatureSection";
import { MemberText } from "../../../../components";
import CardSkeletonLoader from "../../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import {
  amount,
  getAddOnsTotalPremium,
  getInsuranceType,
  matchQuotes,
} from "../../../../utils/helper";
import { Tab } from "react-bootstrap";
import {
  AddOnCheckButton,
  AddOnDesc,
  AddOnsNav,
  AddOnTabContentWrap,
  Detail,
  EditModal,
} from "./components";
import "styled-components/macro";
import AddOnDetails from "../AddOnDetails/AddOnDetails";
import * as mq from "../../../../utils/mediaQueries";

function AddOnSection({ cartEntry }) {
  const { colors } = useTheme();
  return (
    <div className="mt-3">
      <FeatureSection
        heading="Add-Ons Coverages"
        subHeading="Boost your selected Health plan by adding below Add-on Coverages"
      >
        <AddOnsNav primaryColor={colors.primary_color}>
          <Tab eventKey="top-up" title="Super Top-up">
            <AddOnTabContentWrap>
              <AddOnDesc>
                Increase your cover amount on selected base plan at minimum
                premium
              </AddOnDesc>

              <TopUpAddOns cartEntry={cartEntry} insurance_type="top_up" />
            </AddOnTabContentWrap>
          </Tab>
          <Tab eventKey="ci" title="Critical Illness">
            <AddOnTabContentWrap>
              <AddOnDesc>
                Choose a plan and ensure coverage for listed Critical Illness
                along with you selected base plan
              </AddOnDesc>

              <TopUpAddOns
                cartEntry={cartEntry}
                insurance_type="critical_illness"
              />
            </AddOnTabContentWrap>
          </Tab>
          <Tab eventKey="cancer" title="Cancer">
            <AddOnTabContentWrap>
              <AddOnDesc>
                Choose a plan to be prepared for coverage for various cancer
                stages along with your selected base plan
              </AddOnDesc>

              <TopUpAddOns cartEntry={cartEntry} insurance_type="cancer" />
            </AddOnTabContentWrap>
          </Tab>
        </AddOnsNav>
      </FeatureSection>
    </div>
  );
}

export default AddOnSection;

function TopUpAddOns({ cartEntry, insurance_type }) {
  const { getCompanies } = useCompanies();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const topUpCompanies = useMemo(() => getCompanies(insurance_type), []);

  const {
    isLoading,
    isFetching,
    data: topUpQuotes,
  } = useGetTopUpAddOnsQuery({
    sum_insured: cartEntry?.sum_insured,
    groupCode: cartEntry?.group?.id,
    tenure: 1,
    companies: topUpCompanies,
    insurance_type,
  });

  if (isLoading || isFetching) return <CardSkeletonLoader />;

  return (
    <div
      className="d-flex flex-wrap"
      css={`
        gap: 1em;
        & > div {
          width: calc(50% - 1em);
        }

        ${mq.mobile} {
          & > div {
            width: 95%;
            margin: 0 auto;
          }
        }
      `}
    >
      {topUpQuotes?.map((quotesList, idx1) =>
        quotesList?.map((quotes, idx) => (
          <AddOnCard
            quotesList={quotes}
            key={idx + ":" + idx1 + ""}
            cartEntry={cartEntry}
          />
        )),
      )}
    </div>
  );
}

function getInitialMembers(addOn, cartEntry) {
  if (!addOn) return [];
  const insurance_type = getInsuranceType(addOn);
  if (insurance_type === "top_up") {
    return cartEntry?.group?.members;
  }

  const addOnAdded = cartEntry?.addons?.find(
    addOnAdded => addOnAdded?.product?.id === addOn?.product?.id,
  );

  if (addOnAdded) {
    return addOnAdded?.members;
  }

  return [addOn?.member];
}

function getInitialSumInsured(quotesList, cartEntry) {
  const firstQuote = quotesList[0];
  if (!firstQuote) return;

  const addOnAdded = cartEntry?.addons?.find(
    addOnAdded => addOnAdded?.product.id === firstQuote?.product?.id,
  );

  if (addOnAdded) {
    return addOnAdded?.sum_insured;
  }
  return;
}

function getInitialDeductible(quotesList, cartEntry) {
  const firstQuote = quotesList[0];
  if (!firstQuote) return;

  const addOnAdded = cartEntry?.addons?.find(
    addOnAdded => addOnAdded?.product?.id === firstQuote?.product?.id,
  );

  if (addOnAdded) {
    return addOnAdded?.deductible;
  }
  return;
}

function AddOnCard({ quotesList = [], cartEntry }) {
  const { boxShadows, colors } = useTheme();

  const editToggle = useToggle(false);
  const detailsToggle = useToggle(false);

  let { quote, handleSumInsuredChange, handleDeductibleChange } = useQuoteCard({
    quotes: quotesList,
    defaultValues: {
      sumInsured: getInitialSumInsured(quotesList, cartEntry),
      deductible: getInitialDeductible(quotesList, cartEntry),
    },
  });

  const { addAddOns, removeAddOns } = useAddOns(cartEntry?.group?.id);

  const { getCompanyLogo } = useCompanies();

  const [members, setMembers] = useState(() =>
    getInitialMembers(quote, cartEntry),
  );

  const handleUpdate = data => {
    handleSumInsuredChange({ value: data?.sumInsured });
    handleDeductibleChange({ value: data?.deductible });
    setMembers(
      data?.member === "all" ? cartEntry?.group?.members : [data?.member],
    );
  };

  if (quote && members?.length === 1) {
    quote = quotesList.find(
      addOn => matchQuotes(addOn, quote) && addOn?.member === members[0],
    );
  }

  if (!quote) return null;

  const currentQuotes =
    members?.length > 1
      ? quotesList.filter(addOn => matchQuotes(addOn, quote))
      : [quote];

  let totalPremium = getAddOnsTotalPremium(currentQuotes);

  const logo = getCompanyLogo(quote?.company_alias);

  const handleChange = (quote, checked) => {
    if (checked) {
      addAddOns(currentQuotes);
      return;
    }
    removeAddOns(currentQuotes);
  };

  const checked = currentQuotes.every(quote =>
    cartEntry?.addons?.some(addOn => addOn?.product?.id === quote?.product?.id),
  );

  return (
    <div
      className="p-3"
      css={`
        box-shadow: ${boxShadows?.one};
        border-radius: 1em;
        background: #fff;
      `}
    >
      <div
        className="d-flex align-items-center"
        css={`
          gap: 1em;
        `}
      >
        <img
          src={logo}
          alt={quote?.company_alias}
          css={`
            width: 65px;
            height: 35px;
            object-fit: contain;
          `}
        />
        <div
          css={`
            font-weight: 900;
          `}
        >
          <div
            css={`
              color: #253858;
            `}
            title={quote?.product?.name}
          >
            {quote?.product?.name}
          </div>
          <div>
            <button
              className="p-2"
              css={`
                background-color: ${colors.primary_shade};
                color: ${colors.primary_color};
                border-radius: 1em;
                font-size: 12px;
                font-weight: 900;
              `}
              onClick={detailsToggle.on}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {quote?.deductible ? (
          <Detail label={"Deductible"} onClick={editToggle.on}>
            {amount(quote?.deductible)}
          </Detail>
        ) : null}
        <Detail label={"Cover Amount"} onClick={editToggle.on}>
          {amount(quote?.sum_insured)}
        </Detail>
        <Detail
          label={"Insured"}
          onClick={editToggle.on}
          editable={!quote?.deductible}
        >
          <MemberText>{members.join(", ")}</MemberText>
        </Detail>
      </div>

      <AddOnCheckButton
        className="mt-3"
        quote={quote}
        onChange={handleChange}
        checked={checked}
        totalPremium={totalPremium}
      />

      <EditModal
        show={editToggle.isOn}
        onClose={editToggle.off}
        quotes={quotesList}
        onUpdate={handleUpdate}
        currentQuote={quote}
        cartEntry={cartEntry}
      />
      {detailsToggle.isOn ? (
        <AddOnDetails addOn={quote} handleClose={detailsToggle.off} />
      ) : null}
    </div>
  );
}
