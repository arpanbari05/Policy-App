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
import { amount, isAddOnPresent } from "../../../../utils/helper";
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

function AddOnSection({ cartEntry }) {
  const { colors } = useTheme();
  return (
    <div className="mt-3">
      <FeatureSection
        heading="Add-Ons Coverages"
        subHeading="Boost your selected Health plan by adding below Add-on Coverages"
      >
        <AddOnsNav PrimaryColor={colors.primary_color}>
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
    sum_insured: cartEntry.sum_insured,
    groupCode: cartEntry.group.id,
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
      `}
    >
      {topUpQuotes.map((quotesList, idx1) =>
        quotesList.map((quotes, idx) => (
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

function AddOnCard({ quotesList = [], cartEntry }) {
  const { boxShadows, colors } = useTheme();

  const editToggle = useToggle(false);

  const { quote, handleSumInsuredChange, handleDeductibleChange } =
    useQuoteCard({
      quotes: quotesList,
    });

  const { addAddOn, removeAddOn } = useAddOns(cartEntry.group.id);

  const { getCompanyLogo } = useCompanies();

  const [members] = useState(cartEntry.group.members);

  const handleUpdate = data => {
    handleSumInsuredChange({ value: data.sumInsured });
    handleDeductibleChange({ value: data.deductible });
  };

  if (!quote) return null;

  const logo = getCompanyLogo(quote.company_alias);

  const handleChange = (quote, checked) => {
    if (checked) {
      addAddOn(quote, members);
      return;
    }
    removeAddOn(quote, members);
  };

  const checked = isAddOnPresent(quote, members, cartEntry);

  return (
    <div
      className="p-3"
      css={`
        box-shadow: ${boxShadows.one};
        border-radius: 1em;
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
          alt={quote.company_alias}
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
            title={quote.product.name}
          >
            {quote.product.name}
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
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {quote.deductible ? (
          <Detail label={"Deductible"} onClick={editToggle.on}>
            {amount(quote.deductible)}
          </Detail>
        ) : null}
        <Detail label={"Cover Amount"} onClick={editToggle.on}>
          {amount(quote.sum_insured)}
        </Detail>
        <Detail
          label={"Insured"}
          onClick={editToggle.on}
          editable={!quote.deductible}
        >
          <MemberText>{members.join(", ")}</MemberText>
        </Detail>
      </div>

      <AddOnCheckButton
        className="mt-3"
        quote={quote}
        onChange={handleChange}
        checked={checked}
      />

      <EditModal
        show={editToggle.isOn}
        onClose={editToggle.off}
        quotes={quotesList}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
