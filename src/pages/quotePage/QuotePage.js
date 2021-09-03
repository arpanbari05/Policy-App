import React from "react";
import styled from "styled-components";
import UpperModifier from "./components/UpperModifier";
import LowerModifier from "./components/LowerModifier";
import QuoteCard from "./components/QuoteCard";
import { MenuWrapper, SortByButton, TextLabel } from "./Quote.style";

function QuotePage() {
  return (
    <div>
      <UpperModifier />
      <LowerModifier />

      <div className="container">
        <div className="col-md-12 d-flex">
          <div className="col-md-8" style={{ padding: "0px 5px" }}>
            <div className=" d-flex justify-content-between align-items-center">
              <TextLabel> Showing Family Floater Plan</TextLabel>
              <SortByButton>
                Sort By: relevance <i class="fas fa-chevron-down mx-2"></i>
              </SortByButton>
            </div>
            <QuoteCard />
          </div>
          <div className="col-md-4" style={{ padding: "0px 5px" }}>
            <div className="d-flex justify-content-between align-items-center ">
              <TextLabel className="my-2">
                All Premium Plans are GST Inclusive
              </TextLabel>
            </div>
            <AssistantCard>
              <span className="head">Health Insurance Assistance</span>
              <p className="my-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu
                nisl a lorem auctor ultrices auctor vel elit. Aliquam quis
                consequat tellus. Aliquam pellentesque ligula massa, aliquet
                fermentum nisl varius ac.
              </p>
              <button className="talk_to_us my-2">Talk to us</button>
            </AssistantCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotePage;

const AssistantCard = styled.div`
  background: #eef1f4;
  margin-top: 10px;
  padding: 25px;
  .head {
    font-weight: 600;
  }
  p{
      color:#565758;
      font-size: 14px;
  }
  .talk_to_us{
      font-weight: 600;
      color: #0c88ff;
      border:2px solid #0c88ff;
      background: white;
      font-size: 18px;
      padding: 10px 20px;
      border-radius: 5px;
  }
`;
