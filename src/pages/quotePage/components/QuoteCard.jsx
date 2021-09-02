import React from 'react'
import "styled-components/macro"
import { maxbupa } from '../../../assets/images'
import { CenterBottomStyle, CenterBottomToggle, EachWrapper, Logo, LogoWrapper, Outer, PlanName, RadioButton, SeeText, SmallLabel, TextWrapper, ValueText } from './QuoteCard.style'

function QuoteCard() {
    return (
        <Outer>
            <div className="col-md-12 d-flex">
                <div className="col-md-3">
                    <EachWrapper>
                        <LogoWrapper>
                            <Logo src={maxbupa} />
                            <PlanName>Reassure Family</PlanName>
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
                                <ValueText>182 </ValueText>
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
                            border: none;
                        `}
                        >2 more plans</SeeText>
                    </CenterBottomToggle>
                </div>
                <div className="col-md-3">
                    <EachWrapper>
                        <LogoWrapper>
                            <RadioButton>
                                <strong>10000/ year</strong>
                            </RadioButton>
                            <PlanName
                                style={{ fontSize: "16px" }}
                            >
                                Cover of: 10000000
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
