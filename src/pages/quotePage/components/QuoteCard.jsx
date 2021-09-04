import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import "styled-components/macro"
import { maxbupa } from '../../../assets/images'
import { CenterBottomStyle, CenterBottomToggle, EachWrapper, Logo, LogoWrapper, Outer, PlanName, RadioButton, SeeText, SmallLabel, TextWrapper, ValueText } from './QuoteCard.style'
import useQuoteCard from './useQuoteCard';

function QuoteCard({ id, item }) {
    const {
        dispatch,
        show,
        setShow,
        checked,
        mergedQuotes,
        quotesForCompare,
        // activeCover,
        // setActiveCover,
    } = useQuoteCard({ item });
    console.log("mergedquotes", mergedQuotes)
    const [activeCover, setActiveCover] = useState(0);
    const { multiYear } = useSelector(state => state.quotePage.filters);
    console.log("active cover: " + activeCover)

    let additionalPremium = 0;

    mergedQuotes[0]?.mandatory_riders[activeCover]?.forEach(element => {
        additionalPremium += element.total_premium;
    });

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
                        <SeeText>See Details</SeeText>
                    </CenterBottomStyle>
                </div>
                <div className="col-md-6">
                    <EachWrapper
                        css={`
                        padding:20px 25px;
                    `}>
                        <div className="d-flex justify-content-start">
                            <TextWrapper>
                                <SmallLabel>Room Rent</SmallLabel>
                                <ValueText>No Sub-Limit</ValueText>
                            </TextWrapper>
                            <TextWrapper>
                                <SmallLabel>No Claim Bonus</SmallLabel>
                                <ValueText>Up To 100%</ValueText>
                            </TextWrapper>
                            <TextWrapper>
                                <SmallLabel>Cashless Hospitals</SmallLabel>
                                <ValueText>{mergedQuotes[0]?.cashlessHospitalsCount[activeCover]}</ValueText>
                            </TextWrapper>
                        </div>
                        <div className="d-flex justify-content-start">
                            <TextWrapper>
                                <SmallLabel>Co-Payment</SmallLabel>
                                <ValueText>No </ValueText>
                            </TextWrapper>
                            <TextWrapper>
                                <SmallLabel>Pre-existing diseases</SmallLabel>
                                <ValueText>3 years</ValueText>
                            </TextWrapper>

                        </div>

                    </EachWrapper>
                    <CenterBottomToggle

                    >
                        <SeeText
                            css={`
                            border-bottom: none !important;
                        `}
                        >2 more plans  <i class="fas fa-chevron-down"></i></SeeText>
                    </CenterBottomToggle>
                </div>
                <div className="col-md-3">
                    <EachWrapper>
                        <LogoWrapper>
                            <RadioButton>
                                <strong>₹{" "}
                                    {parseInt(
                                        mergedQuotes[0]?.total_premium[activeCover] + additionalPremium,
                                    ).toLocaleString("en-In")}
                                    <span>
                                        /{tenure} {tenure > 1 ? "years" : "year"}
                                    </span></strong>
                            </RadioButton>
                            <PlanName
                                style={{ fontSize: "16px" }}
                            >
                                <span>Cover of: </span><select
                                    onChange={e => setActiveCover(e.target.value)}
                                >
                                    {mergedQuotes[0]?.sum_insured.map((data, i) => {
                                        return (
                                            <option value={i} key={i}>
                                                {parseInt(data).toLocaleString("en-In")}
                                            </option>
                                        );
                                    })}
                                </select>

                            </PlanName>
                        </LogoWrapper>
                    </EachWrapper>
                    <CenterBottomStyle>
                        <div>
                            <input type="checkbox" css={`
                                border-radius:50px;
                            `} />
                            <SeeText
                                css={`
                            color: black;
                            border:none;
                            padding:0px 20px;
                        `}
                            >Compare</SeeText>
                        </div>
                    </CenterBottomStyle>

                </div>
            </div>
        </Outer>
    )
}

export default QuoteCard
