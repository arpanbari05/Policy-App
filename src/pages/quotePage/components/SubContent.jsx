import React, { useEffect, useState } from "react";
import "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import SecureLS from "secure-ls";
import Checkbox from "../../../components/Checkbox";
import {
  removeQuotesForCompare,
  saveSelectedPlan,
  setQuotesForCompare,
  setQuotesOnCompare,
} from "../quote.slice";
import CustomDropDown from "./filters/CustomDropdown";
import {
  CenterBottomStyle,
  EachWrapper,
  Logo,
  LogoWrapper,
  Outer,
  PlanName,
  RadioButton,
  RadioInput,
  RadioLabel,
  SeeText,
  SmallLabel,
  TextWrapper,
  ValueText,
} from "./QuoteCard.style";
import useQuoteCard from "./useQuoteCard";
import useCartProduct from "../../Cart/hooks/useCartProduct";

// function SubContent({ item, handleSeeDetails }) {
//     console.log("ssssssss1", item);
//     // const {
//     //     dispatch,
//     //     show,
//     //     setShow,
//     //     checked,
//     //     mergedQuotes,
//     //     quotesForCompare,
//     //     // activeCover,
//     //     // setActiveCover,
//     // } = useQuoteCard({ item });
//     // console.log("merge1dquotes", mergedQuotes);
//     const [check, setCheck] = useState(false);
//     const [activeCover, setActiveCover] = useState(0);
//     const { multiYear } = useSelector(state => state.quotePage.filters);
//     console.log("active cover: " + activeCover)
// console.log("dfeature", mergedQuotes[0]?.features[activeCover])

// let additionalPremium = 0;

// mergedQuotes[0]?.mandatory_riders[activeCover]?.forEach(element => {
//     additionalPremium += element.total_premium;
// });

// const handleSeeDetailsClick = clickedFrom => {
//     handleSeeDetails(
//         {
//             quote: mergedQuotes[0],
//             activeSum: activeCover,
//         },
//         clickedFrom,
//     );
//     const selectedPlan = {
//         company_alias: mergedQuotes[0]?.company_alias,
//         logo: mergedQuotes[0]?.logo,
//         product: mergedQuotes[0]?.product,
//         total_premium: mergedQuotes[0]?.total_premium[activeCover],
//         premium: mergedQuotes[0]?.premium[activeCover],
//         sum_insured: mergedQuotes[0]?.sum_insured[activeCover],
//         tax_amount: mergedQuotes[0]?.tax_amount[activeCover],
//         tenure: mergedQuotes[0]?.tenure[activeCover],
//     };

//     dispatch(saveSelectedPlan({
//         ...selectedPlan,
//         product_id: selectedPlan.product?.id,
//     }));
// };

// const tenure = parseInt(multiYear) === 1 ? "" : parseInt(multiYear);

const SubContent = ({
  quoteCardData,
  quotesForCompare,
  handleClick,
  handleSeeDetails,
  addProduct,
}) => {
  const {
    product: { name, id },
    premium,
    total_premium,
    logo,
    insurance_id,
    cashlessHospitalsCount,
    sum_insured,
    tax_amount,
    company_alias,
    mandatory_riders,
    features,
    tenure,
  } = quoteCardData;
  const dispatch = useDispatch();
  const history = useHistory();
  const ls = new SecureLS();
  const [isLoading, setIsLoading] = useState(false);
  const [activeCover, setActiveCover] = useState(0);
  const [check, setCheck] = useState(false);
  const { multiYear } = useSelector((state) => state.quotePage.filters);

  // const tenure = parseInt(multiYear) === 1 ? 1 : parseInt(multiYear);
  const { selectedGroup, cartItems } = useSelector((state) => state.quotePage);

  const { memberGroups } = useSelector((state) => state.greetingPage);

  const members = memberGroups[selectedGroup];

  let additionalPremium = 0;

  mandatory_riders[activeCover]?.forEach((element) => {
    additionalPremium += element.total_premium;
  });

  const handleSeeDetailsClick = (clickedFrom) => {
    handleSeeDetails(
      {
        quote: quoteCardData,
        activeSum: activeCover,
      },
      clickedFrom
    );
    const selectedPlan = {
      company_alias: company_alias,
      logo: logo,
      product: { name, id },
      total_premium: total_premium[activeCover],
      premium: premium[activeCover],
      sum_insured: sum_insured[activeCover],
      tax_amount: tax_amount[activeCover],
      tenure: tenure[activeCover],
    };
    dispatch(saveSelectedPlan(selectedPlan));
  };

  const handleBuyNowClick = () => {
    setIsLoading(true);
    const selectedPlan = {
      // company_alias: mergedQuotes[0]?.company_alias,
      // logo: mergedQuotes[0]?.logo,
      product: { name, id },
      total_premium: total_premium[activeCover],
      // premium: premium[activeCover],
      sum_insured: sum_insured[activeCover],
      tax_amount: tax_amount[activeCover],
      tenure: tenure,
    };

    addProduct({
      ...selectedPlan,
      product_id: selectedPlan.product?.id,
      premium: selectedPlan.total_premium,
      group_id: parseInt(selectedGroup),
      service_tax: selectedPlan.tax_amount,
    }).then(handleClick);
    setIsLoading(false);
  };
  const [checked, setChecked] = useState(
    quotesForCompare.includes(`${id}${sum_insured}`) ? true : false
  );

  // const plansData = [
  //   ...features?.[activeCover].filter(i => i.is_featured_on_card),
  //   {
  //     name: "Cashless Hospital",
  //     value: cashlessHospitalsCount[activeCover],
  //     description:
  //       "A specific percent of claim amount is paid by the Insured person in case the treatment is taken at a hospital not mentioned in the Network Hospitals list.",
  //     icon: cashless,
  //   },
  // ];

  useEffect(() => {
    if (quotesForCompare.includes(`${id}${sum_insured[activeCover]}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [quotesForCompare, checked, activeCover]);

  return (
    <div>
      <Outer
        css={`
          border: none;
          box-shadow: none;
          &:hover {
            border: none;
          }
        `}
      >
        <div className="col-md-12 d-flex">
          <div className="col-md-3">
            <EachWrapper>
              <LogoWrapper>
                <Logo src={logo} />
                <PlanName>{name}</PlanName>
              </LogoWrapper>
            </EachWrapper>
            <CenterBottomStyle>
              <SeeText onClick={handleSeeDetailsClick}>See Details</SeeText>
            </CenterBottomStyle>
          </div>
          <div className="col-md-6">
            <EachWrapper
              css={`
                padding: 20px 25px !important;
                @media (max-width: 810px) {
                  padding-left: 8px !important;
                }
              `}
            >
              <div className="d-flex justify-content-start">
                {features[activeCover].map((item, i) => {
                  return (
                    <>
                      {item.name === "Room Rent" && (
                        <TextWrapper>
                          <SmallLabel>Room Rent</SmallLabel>
                          <ValueText>{item.value}</ValueText>
                        </TextWrapper>
                      )}
                      {item.name === "No Claim Bonus" && (
                        <TextWrapper>
                          <SmallLabel>No Claim Bonus</SmallLabel>
                          <ValueText>{item.value}</ValueText>
                        </TextWrapper>
                      )}
                    </>
                  );
                })}

                <TextWrapper>
                  <SmallLabel>Cashless Hospitals</SmallLabel>
                  <ValueText onClick={() => handleSeeDetailsClick(4)}>
                    {cashlessHospitalsCount[activeCover]}
                    <span>
                      {" "}
                      <i class="fas fa-chevron-right "></i>
                    </span>
                  </ValueText>
                </TextWrapper>
              </div>
              <div className="d-flex justify-content-start">
                {features[activeCover].map((item, i) => {
                  return (
                    <>
                      {item.name === "Co-Payment" && (
                        <TextWrapper>
                          <SmallLabel>Co-Payment</SmallLabel>
                          <ValueText>{item.value}</ValueText>
                        </TextWrapper>
                      )}
                      {item.name === "Pre Existing Disease" && (
                        <TextWrapper>
                          <SmallLabel>Pre Existing Disease</SmallLabel>
                          <ValueText>{item.value}</ValueText>
                        </TextWrapper>
                      )}
                    </>
                  );
                })}
              </div>
            </EachWrapper>
            {/* <CenterBottomToggle
                    >
                        <SeeText
                            css={`
                            border-bottom: none !important;
                        `}
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            {!show ? (
                                <>
                                    <span>2 more plans </span>
                                    <i class="fas fa-chevron-down"></i>
                                </>
                            ) :
                                (<>
                                    <span>hide plans </span>
                                    <i class="fas fa-chevron-up"></i>
                                </>
                                )}
                        </SeeText>
                    </CenterBottomToggle> */}
          </div>
          <div className="col-md-3">
            <EachWrapper>
              <LogoWrapper>
                <RadioButton onClick={() => handleBuyNowClick()}>
                  <strong>
                    ₹{" "}
                    {parseInt(
                      total_premium[activeCover] + additionalPremium
                    ).toLocaleString("en-In")}
                    <span>
                      / {tenure?.[activeCover]}{" "}
                      {tenure?.[activeCover] > 1 ? "years" : "year"}
                    </span>
                  </strong>
                </RadioButton>
                <PlanName
                  css={`
                    font-size: 13px;
                    display: flex;
                  `}
                >
                  <span
                    css={`
                      position: relative;
                      left: 6px;
                    `}
                  >
                    Cover of: ₹
                  </span>
                  {/* <select
                                    onChange={e => setActiveCover(e.target.value)}
                                >
                                    {mergedQuotes[0]?.sum_insured.map((data, i) => {
                                        return (
                                            <option value={i} key={i}>
                                                {parseInt(data).toLocaleString("en-In")}
                                            </option>
                                        );
                                    })}
                                </select> */}
                  {sum_insured && (
                    <CustomDropDown
                      option={sum_insured}
                      handleChange={(e) => {
                        setActiveCover(e);
                      }}
                    />
                  )}
                </PlanName>
              </LogoWrapper>
            </EachWrapper>
            <CenterBottomStyle
              css={`
                padding: 5px;
              `}
            >
              <div>
                {/* <input type="checkbox" css={`
                                border-radius:50px;
                            `} /> */}
                {/* <Checkbox title="Compare"
                                    checked={check}
                                    onClick={() => { setCheck(true) }}
                                /> */}
                {/* <SeeText
                                css={`
                            color: black !important;
                            border:none !important;
                            padding:0px 20px !important;
                        `}
                            >Compare</SeeText> */}
                <RadioInput
                  type="checkbox"
                  id={`compare_${id}${sum_insured[activeCover]}`}
                  className="compare-checkbox"
                  checked={checked}
                  onChange={() => {
                    dispatch(setQuotesOnCompare());

                    if (!checked) {
                      const numberOfPlans = window.matchMedia(
                        "(max-width: 1023px)"
                      ).matches
                        ? 2
                        : 3;
                      dispatch(
                        setQuotesForCompare([
                          `${id}${sum_insured[activeCover]}`,
                          numberOfPlans,
                        ])
                      );
                    } else {
                      dispatch(
                        removeQuotesForCompare(
                          `${id}${sum_insured[activeCover]}`
                        )
                      );
                    }
                  }}
                />

                <RadioLabel
                  //dynamic id
                  htmlFor={`compare_${id}${sum_insured[activeCover]}`}
                  css={`
                    color: #808080;
                  `}
                >
                  Compare
                </RadioLabel>
              </div>
            </CenterBottomStyle>
          </div>
        </div>
      </Outer>
    </div>
  );
};

export default SubContent;
