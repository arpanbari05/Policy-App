import React, { useState } from 'react'
import { Col, Collapse, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "styled-components/macro"
import { maxbupa } from '../../../assets/images'
import { useParams } from "react-router";
import CheckBox from "../../ComparePage/components/Checkbox/Checbox"
import { removeQuotesForCompare, saveSelectedPlan, setQuotesForCompare, setQuotesOnCompare } from '../quote.slice';
import CustomDropDown from './filters/CustomDropdown';
import { CenterBottomStyle, CenterBottomToggle, EachWrapper, Logo, LogoWrapper, Outer, PlanName, RadioButton, RadioInput, RadioLabel, SeeText, SmallLabel, TextWrapper, ValueText } from './QuoteCard.style'
import SubContent from './SubContent';
import useQuoteCard from './useQuoteCard';
import useCartProduct from "../../Cart/hooks/useCartProduct"

function QuoteCard({ id, item, handleSeeDetails, handleClick }) {
    const {
        dispatch,
        show,
        setShow,
        checked,
        setChecked,
        mergedQuotes,
        quotesForCompare,
        // activeCover,
        // setActiveCover,
    } = useQuoteCard({ item });
    console.log("mergedquotes", mergedQuotes);
    const [check, setCheck] = useState(false);
    const { groupCode: selectedGroup } = useParams();
    const { addProduct, isCartProductLoading } = useCartProduct(selectedGroup);
    const  [isLoading,setIsLoading] = useState(false);
    const [activeCover, setActiveCover] = useState(0);
    const { multiYear } = useSelector(state => state.quotePage.filters);
    console.log("active cover: " + activeCover)
    console.log("dfeature", mergedQuotes[0]?.features[activeCover])

    let additionalPremium = 0;

    mergedQuotes[0]?.mandatory_riders[activeCover]?.forEach(element => {
        additionalPremium += element.total_premium;
    });

    const handleBuyNowClick = () => {
        setIsLoading(true);
        const selectedPlan = {
          // company_alias: mergedQuotes[0]?.company_alias,
          // logo: mergedQuotes[0]?.logo,
          product: mergedQuotes[0]?.product,
          total_premium: mergedQuotes[0]?.total_premium[activeCover],
          // premium: mergedQuotes[0]?.premium[activeCover],
          sum_insured: mergedQuotes[0]?.sum_insured[activeCover],
          tax_amount: mergedQuotes[0]?.tax_amount[activeCover],
          tenure: mergedQuotes[0]?.tenure[activeCover],
        };

        addProduct({
          ...selectedPlan,
          product_id: selectedPlan.product?.id,
          premium: selectedPlan.total_premium,
          group_id: parseInt(selectedGroup),
          service_tax: selectedPlan.tax_amount,
          riders: mergedQuotes[0]?.mandatory_riders[activeCover].map((rider) => ({
            ...rider,
            rider_id: rider.id,
          })),
        }).then(handleClick);
        setIsLoading(false);
      };

    const handleSeeDetailsClick = clickedFrom => {
        handleSeeDetails(
            {
                quote: mergedQuotes[0],
                activeSum: activeCover,
            },
            clickedFrom,
        );
        const selectedPlan = {
            company_alias: mergedQuotes[0]?.company_alias,
            logo: mergedQuotes[0]?.logo,
            product: mergedQuotes[0]?.product,
            total_premium: mergedQuotes[0]?.total_premium[activeCover],
            premium: mergedQuotes[0]?.premium[activeCover],
            sum_insured: mergedQuotes[0]?.sum_insured[activeCover],
            tax_amount: mergedQuotes[0]?.tax_amount[activeCover],
            tenure: mergedQuotes[0]?.tenure[activeCover],
        };

        dispatch(saveSelectedPlan({
            ...selectedPlan,
            product_id: selectedPlan.product?.id,
        }));
    };

    const tenure = parseInt(multiYear) === 1 ? "" : parseInt(multiYear);

    return (
        <Outer>
            <div className="col-md-12 d-flex">
                <div className="col-md-3">
                    <EachWrapper>
                        <LogoWrapper>
                            <Logo src={mergedQuotes[0]?.logo} />
                            <PlanName>{mergedQuotes[0]?.product.name}</PlanName>
                        </LogoWrapper>
                    </EachWrapper>
                    <CenterBottomStyle>
                        <SeeText onClick={handleSeeDetailsClick}>See Details</SeeText>
                    </CenterBottomStyle>
                </div>
                <div className="col-md-6">
                    <EachWrapper
                        css={`
                        padding:20px 25px;
                    `}>
                        <div className="d-flex justify-content-start">
                            {mergedQuotes[0]?.features[activeCover].map((item, i) => {
                                return (
                                    <>
                                        {item.name === "Room Rent" && (<TextWrapper>
                                            <SmallLabel>Room Rent</SmallLabel>
                                            <ValueText>{item.value}</ValueText>
                                        </TextWrapper>)}
                                        {item.name === "No Claim Bonus" && (<TextWrapper>
                                            <SmallLabel>No Claim Bonus</SmallLabel>
                                            <ValueText>{item.value}</ValueText>
                                        </TextWrapper>)}

                                    </>
                                )
                            })}

                            <TextWrapper>
                                <SmallLabel>Cashless Hospitals</SmallLabel>
                                <ValueText>{mergedQuotes[0]?.cashlessHospitalsCount[activeCover]}</ValueText>
                            </TextWrapper>
                        </div>
                        <div className="d-flex justify-content-start">
                            {mergedQuotes[0]?.features[activeCover].map((item, i) => {
                                return (
                                    <>
                                        {item.name === "Co-Payment" && (<TextWrapper>
                                            <SmallLabel>Co-Payment</SmallLabel>
                                            <ValueText>{item.value}</ValueText>
                                        </TextWrapper>)}
                                        {item.name === "Pre Existing Disease" && (<TextWrapper>
                                            <SmallLabel>Pre Existing Disease</SmallLabel>
                                            <ValueText>{item.value}</ValueText>
                                        </TextWrapper>)}

                                    </>
                                )
                            })}
                        </div>

                    </EachWrapper>
                    <CenterBottomToggle

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
                    </CenterBottomToggle>
                </div>
                <div className="col-md-3">
                    <EachWrapper>
                        <LogoWrapper>
                            <RadioButton onClick={() => handleBuyNowClick()}>
                                <strong>₹{" "}
                                    {parseInt(
                                        mergedQuotes[0]?.total_premium[activeCover] + additionalPremium,
                                    ).toLocaleString("en-In")}
                                    <span>
                                        /{tenure} {tenure > 1 ? "years" : "year"}
                                    </span></strong>
                            </RadioButton>
                            <PlanName
                                css={`
                                    font-size:13px;
                                    display:flex;
                                    
                                `}
                            >
                                <span>Cover of: </span>
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
                                {mergedQuotes[0]?.sum_insured && <CustomDropDown option={mergedQuotes[0]?.sum_insured} handleChange={(e) => { setActiveCover(e) }} />}

                            </PlanName>
                        </LogoWrapper>
                    </EachWrapper>
                    <CenterBottomStyle
                        css={`
                        padding:5px;
                    `}
                    >
                        <div>
                            {/* <input type="checkbox" css={`
                                border-radius:50px;
                            `} /> */}

                            {/* <SeeText
                                css={`
                            color: black !important;
                            border:none !important;
                            padding:0px 20px !important;
                        `}
                            >Compare</SeeText> */}
                            <RadioInput
                                type="checkbox"
                                id={`compare_${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`}
                                className="compare-checkbox"
                                checked={checked}
                                onChange={() => {
                                    dispatch(setQuotesOnCompare());

                                    if (!checked) {
                                        const numberOfPlans = window.matchMedia(
                                            "(max-width: 1023px)",
                                        ).matches
                                            ? 2
                                            : 3;
                                        dispatch(
                                            setQuotesForCompare([
                                                `${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`,
                                                numberOfPlans,
                                            ]),
                                        );
                                    } else {
                                        dispatch(
                                            removeQuotesForCompare(
                                                `${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`,
                                            ),
                                        );
                                    }
                                }}
                            />

                            <RadioLabel
                                //dynamic id
                                htmlFor={`compare_${mergedQuotes[0]?.product.id}${mergedQuotes[0]?.sum_insured[activeCover]}`}
                            >
                                Compare
                            </RadioLabel>
                        </div>
                    </CenterBottomStyle>

                </div>
            </div>
            <Collapse in={show}>
                <div id="collapseOne">
                    <div className="card-body card_body_padding margin_bottom_more_plan_card"
                        css={`
                    margin-top:0px;
                    `}
                    >
                        <Col md={12}>
                            {/* plans will be clubbed here */}
                            {mergedQuotes?.slice(1).map((item, index) => (
                                <>
                                    {console.log("ssssssss3", item)}
                                    {item && <SubContent
                                        // addProduct={addProduct}
                                        key={index}
                                        id={index}
                                        quoteCardData={item}
                                        quotesForCompare={quotesForCompare}
                                        // // handleClick={handleClick}
                                        handleSeeDetails={handleSeeDetails}
                                    />}
                                </>
                            ))}
                        </Col>
                    </div>

                </div>
            </Collapse>
        </Outer>
    )
}

export default QuoteCard