import React, { useEffect, useState } from "react";
import { Modal, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import { getTermConditions } from "../ProposalPage/serviceApi";

const TermModal = ({
  title,
  show,
  customClass,
 
  content,
  buttonValue,
  handleClick,
  handleClose,
  BtnArrow,
  noFooter,
  showButton = true,
  revised = false,
}) => {
  const [term, setTerm] = useState("");
const getTermConditionData = async (company_id, callback = () => {}) => {
  try {
    const { data } = await getTermConditions(company_id);

    callback(data.company_terms_and_conditions);
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

  const cart = useSelector(state => state.cart);
  const prod_id=Object.keys(cart)[0];
    console.log("hkjm",term);
    useEffect(() => {
      if(cart[prod_id].product.company.id){
      getTermConditionData(cart[prod_id].product.company.id, setTerm);
      }
   },[])

  // console.log("mkmk",term)
  return (
    <Modal
      centered
      //fullscreen
      show={show}
      size="lg"
      onHide={handleClose}
      animation={false}
      //dialogClassName="modal-box"
      style={{
        zIndex: "99999",
        borderRadius: "12px",
        border: "none",
        marginBottom: revised ? "70px" : "0px",
        background: "rgba(0,0,0,0.5)",
      }}
      css={`
      .modal-content{
          position:fixed;
          top:50px;
          left:35px;
          width:95%;
        
        
          @media(max-width: 767px){
              left:10px;
              top:unset !important;
              height:95% !important;
          }
          
      }
      .modal-lg{
          max-width:85% !important;
          height:auto !important;
      }
        @media (min-width: 767px) and (max-width: 990px) {
          .modal-dialog {
            max-width: 700px !important;
          }
        }
        @media (max-width: 767px) {
          .modal-dialog {
            max-width: 100% !important;
          }
          .modal-dialog > div {
            height: 100vh;
            position: fixed;
            top: 0%;
          }
        }
      `}
      className={`${customClass} noselect`}
    >
      <Modal.Header
       
        style={{
          borderBottomColor: !title && "000",
          padding: !title && "28px",
          paddingLeft:"unset",
          borderTopLeftRadius: "14px",
          borderToprightRadius: "14px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
       <ModalTitle className="modal-headerz">Terms and Conditions</ModalTitle>
       <i  onClick={handleClose} style={{cursor: "pointer"}} class="fas fa-times"></i>
      </Modal.Header>
      {/* <CloseButton
        type="button"
        className="btn btn-white recom_close_css "
        style={{ marginTop: "-8px", zIndex: 2500 }}
        onClick={handleClose}
      >
        <i className="fa fa-close"></i>
      </CloseButton> */}
      <Modal.Body
      css={`
       overflow:scroll;
      `}
      >
          {term ?   <Paragraph 
     
        css={`
          color: #253858;
        `}
      
        dangerouslySetInnerHTML={{ __html: term }}
      ></Paragraph>
    : <span>Loading...</span>
    }
          {/* <span
          css={`
              position: absolute;
             
            `}
          >
             <i class="fa fa-check color-orange"></i></span>
          <div
          css={`
          padding-left:20px !important;
          padding-bottom: 20px !important;
          `}
          >
            
              <span
              css={`
              font-size:15px;
              `}
              >I agree that this proposal and the declarations shall be the basis of the contract between me / us and Aditya Birla Health Insurance Company Ltd. I further consent and authorize Aditya Birla Health Insurance Co. Ltd. and / or any of its authorized representatives to seek medical information from any hospital/consultant that I or any person proposed to be insured has attended or may attend in future concerning any disease or illness or injury. The information provided will be the basis of any insurance policy that We may issue. Proposer must disclose all facts relevant to all persons proposed to be insured that may affect our decision to issue a policy or its terms. Non-compliance may result in the avoidance of the policy. I / we, have proposed for this insurance policy with Aditya Birla Health insurance company ltd. I / We have read & understood the full terms, conditions & exclusions of the policy. </span>
          </div>
          <span
          css={`
              position: absolute;
            `}
          >
             <i class="fa fa-check color-orange"></i></span>
          <div
          css={`
          padding-left:20px !important;
          padding-bottom: 20px !important;
          `}
          >
            
            <span
            css={`
            font-size:15px;
            `}
            ><strong>DECLARATION WARRANTY ON BEHALF OF ALL PERSONS PROPOSED TO BE INSURED</strong> <br/> I hereby declare and warrant on my behalf and on behalf of all persons proposed to be insured that the above statements are true and complete in all respects and that there is no other information which is relevant to this application for insurance that has not been disclosed to Aditya Birla Health Insurance Company Ltd. I agree that this proposal and the declarations shall be the basis of the contract between me and all persons to be insured and Aditya Birla Health Insurance Company Ltd. I further consent and authorise Aditya Birla Health Insurance Company Ltd. and/or any of its authorized representatives to seek medical information from any hospital / consultant that I or any person proposed to be insured has attended or may attend in future concerning any disease or illness or injury.</span>
           </div>
           <span
          css={`
              position: absolute;
            `}
          >
             <i class="fa fa-check color-orange"></i></span>
          {/* <div
          css={`
          padding-left:20px !important;
          padding-bottom: 20px !important;
          `}
          > */}
{/*             
            <span
            css={`
            font-size:15px;
            `}
            ><strong>DISCLAIMER</strong> <br/> I agree that this proposal and the declarations shall be the basis of the contract between me / us and Aditya Birla Health Insurance Company Ltd. I further consent and authorize Aditya Birla Health Insurance Co. Ltd. and / or any of its authorized representatives to seek medical information from any hospital / consultant that I or any person proposed to be insured has attended or may attend in future concerning any disease or illness or injury. The information provided will be the basis of any insurance policy that We may issue. Proposer must disclose all facts relevant to all persons proposed to be insured that may affect our decision to issue a policy or its terms. Non-compliance may result in the avoidance of the policy. I / we, have proposed for this insurance policy with Aditya Birla Health insurance company ltd. I / We have read &amp; understood the full terms, conditions &amp; exclusions of the policy.</span>  </div> */}
             </Modal.Body> 
      <Modal.Footer
        style={{
          display: noFooter && "none",
          borderTop: !showButton && "none",
          borderBottomColor: "#fff",
          borderTopLeftRadius: "0px",
          borderToprightRadius: "0px",
          borderBottomRightRadius: "14px",
          borderBottomLeftRadius: "14px",
        }}
      >
  
      </Modal.Footer>
    </Modal>
  );
};

export default TermModal;

const ModalSpan = styled.span`
  & .card-modal {
    width: 1000px;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
`;
const ModalTitle = styled.h5`
  // font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 20px;
  color: #304261;
  font-weight: 900;
  width: 80%;
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 1.3;
  }
  /* &:after {
    content: "";
    height: 37px;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 13px;
    background-color: #fecc28;
    border-radius: 50px;
  } */
`;

const Paragraph = styled.div`
height: 60vh;
    overflow: auto;
& li{
  font-size:15px;
  color:black;
  margin-bottom:20px;
  & ::marker{
    display: none !important;
  }
}
`;
