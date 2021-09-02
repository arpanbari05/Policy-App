import styled from "styled-components"

export const Outer = styled.div`
margin-top: 13px;

box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
border: solid 1px #dfdfdf;
background-color: #fff;
&:hover{
    border:1px solid #0a87ff;
}
`

export const EachWrapper = styled.div`
width: 100%;
margin:20px 0px 0px;
padding:10px;
height:150px;
border-right: 1px solid #dfdfdf;
`
export const LogoWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const Logo = styled.img`
height:70px;
margin-bottom: 10px;
`
export const PlanName = styled.p`
font-size:20px;
font-weight:bold ;
`
export const RadioButton = styled.button`
margin:20px 0px;
height: 55px;
width:160px;
padding: 10px;
border-radius: 6px;
color:#fff;
font-size:20px;
font-weight:900 !important;
border: none;
background-color: #0a87ff;
display: flex;
justify-content: center;
align-items: center;
`
export const SmallLabel = styled.span`

font-size: 13px;
font-weight: 300;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #808080;
margin-bottom: 6px;
`
export const ValueText = styled.span`

font-size: 15px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #000;
margin-bottom: 16px;
`

export const TextWrapper = styled.div`
display:flex;
flex-direction: column;
min-width:120px;
`
export const SeeText = styled.span`
font-size: 15px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color: #0a87ff;
margin-bottom:5px;
border-bottom: 2px dotted #0a87ff;
`
export const CenterBottomStyle = styled.div`
display: flex;
justify-content: center;
padding-top:10px;
`
export const CenterBottomToggle = styled.div`
display: flex;
justify-content: center;
width:fit-content;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
padding: 13px 20px 0px;
margin: auto;
background-color: #e2f0ff;
`