import { Link, useParams } from "react-router-dom";
import { Title } from "./FormComponents";
import styled from "styled-components/macro";

function JourneyTypeForm() {
  const params = useParams();
  console.log(params);
  return (
    <div
      css={`
        padding: 17px;
        @media (max-width: 480px) {
          padding: 10px !important;
        }
      `}
    >
      <Title>What are you looking for?</Title>
      <div className="mt-3 d-flex flex-column">
        <JourneyLink to="/input/basic-details">Health</JourneyLink>
        <JourneyLink to="/input/basic-details">Top up</JourneyLink>
        <JourneyLink to="/input/renewal-details">Renew policy</JourneyLink>
      </div>
    </div>
  );
}

export default JourneyTypeForm;

const JourneyLink = styled(Link)`
  padding: 1em;
`;
