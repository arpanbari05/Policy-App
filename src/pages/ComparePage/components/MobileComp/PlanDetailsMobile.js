import React from 'react'
import styled from "styled-components";
import PlanComparer from "./PlanComparer"

// import wrong from "../../../../assets/images/add_btn.png";
function PlanDeatilsMobile() {
    return (
        <div>


            <OuterBox>
                <PlanComparer />

                <div
                    className="IC_product_compare_card blank"
                    style={{
                        height: "100px",
                        width: "124px",

                        marginLeft: "20px",
                        marginTop: "10px",
                        marginRight: "auto",
                        paddingTop: "0px"


                    }}
                // modal on Click
                >
                    <div className="cross" style={{ position: "relative", top: "50px", left: "40px", marginBottom: "15px" }}>
                        <i className="fa fa-plus"></i>
                    </div>
                    <div
                        style={{ fontWeight: "900" }}
                        className="add-compare text-center"
                    >
                        Add plans
                    </div>
                </div>

            </OuterBox>
            <Plans>
                <Thead>
                    <Head>
                        sum insured
                    </Head>

                </Thead>

                <TBody>
                    <TBody1>
                        <div >
                            <select style={{ fontSize: "16px" }} >
                                <option  >400000</option>
                                <option >500000</option>
                            </select>
                        </div>

                    </TBody1>
                    <TBody2>
                        <div >
                            <select style={{ fontSize: "16px" }} >
                                <option  >400000</option>
                                <option >500000</option>
                            </select>
                        </div>
                    </TBody2>
                </TBody>

                <Thead>
                    <Head>
                        sum insured
                    </Head>

                </Thead>

                <TBody>
                    <TBody1>
                        covered
                    </TBody1>
                    <TBody2>
                        covered
                    </TBody2>
                </TBody>

            </Plans>
        </div>
    )
}

const OuterBox = styled.div`
  width: 100vw;

height: 120px;

margin: 30px 0 11px;

padding: 0px 20px;

box-shadow: 0 3px 6px 0 #dbe1ee;

margin-top:5px;
display: flex;

background-color: #ffffff;
`

const Plans = styled.div`
  width: 96vw;

height: fit-content;

margin: 11px 6px 0 7px;
margin-left: auto;
margin-right: auto;
padding: 4px 4px 10.6px 0;

box-shadow: 0 3px 6px 0 #dbe1ee;

background-color: #ffffff;
`
const Thead = styled.div`
  width: 92vw;

height: 26px;

margin: 0 6px 2px 6px;
margin-left: auto;
margin-right: auto;


background-color: #f9f4ec;
`
const Head = styled.p`
  margin: 2px 0.5px 2px 0;

width:fit-content;
font-size: 16px;
padding: 2px 4px ;

font-weight: bold;

font-weight: bold;

font-stretch: normal;

font-style: normal;
/* padding-left: 10px; */
margin-left: 10px;
padding-top: 3px;
/* padding-bottom: 3px; */

letter-spacing: normal;
/* text-decoration: underline dashed; */

text-align: left;

font-stretch: normal;

font-style: normal;

line-height: 1.31;

letter-spacing: normal;

text-align: left;

color: #3e593c;
/* 
border-bottom: 0.75px dashed #3e593c; */
`

const TBody = styled.div`
  width: 92vw;

height: 26px;
display: flex;
margin: 0 6px 2px 6px;
margin-left: auto;
margin-right: auto;
`

const TBody1 = styled.div`
width:50%;
border-right: 1px solid #dbe1ee;
font-size: 16px;

font-weight: bold;

font-stretch: normal;

font-style: normal;
padding-left: 10px;
padding-top: 3px;
padding-bottom: 3px;
letter-spacing: normal;

text-align: left;
`
const TBody2 = styled.div`
width:50%;
font-size: 16px;

font-weight: bold;

font-stretch: normal;

font-style: normal;
padding-left: 10px;
padding-top: 3px;
padding-bottom: 3px;
letter-spacing: normal;

text-align: left;
`
// const AddPlan = styled.div`
//   border-radius: 7px;

// border: solid 1px #de9b9e;
// background-color: #fff5f5;

// `

export default PlanDeatilsMobile
