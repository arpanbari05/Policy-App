import React from 'react'
import styled from "styled-components"

import wrong from "../../../../assets/images/Care_Health.png";

import wron from "../../../../assets/images/cross.png";
import { RemoveCross } from "../../ComparePage.style";

function PlanComparer() {
    return (<>

        <Container>




            <>
                <ImageLogo
                    src={wrong}
                    alt=""
                // className="margin_12_t img_IC_width"
                />
                <p style={{ textAlign: "center", fontSize: "16px" }}>Care Health</p>
                <Button>
                    <i className="fa fa-inr" style={{ margin: "0px", padding: "0px", fontSize: "12px", marginRight: "5px" }}></i>
                    3000/year
                </Button>


            </>
        </Container></>
    )
}

const Container = styled.div`
width:124px;
height:100px;
margin-top: 10px;
margin-left: auto;

box-shadow: 0 10px 20px 0 rgb(143 143 143 / 16%);
`
const ImageLogo = styled.img`
  border-radius: unset !important;
 
  height: 40px;
  width: 40px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top:15px;
  
`;
const Button = styled.div`
  width: 84px;
  display: flex;

height: 30px;
margin:0 auto;
font-size:12px;
padding: 10px 15px ;
align-items: center;
background-color: #c7222a;
color: #fff;


`
const RemoveCross1 = styled.div`
position: relative;

border-radius: 50%;
width:fit-content;
background-color:#fff;
transform: translate(50%,-50%);
right: 0px ;
top: 0px;
padding: 0 !important;
& span {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`




export default PlanComparer
