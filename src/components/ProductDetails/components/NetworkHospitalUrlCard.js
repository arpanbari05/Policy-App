import styled from "styled-components";
import { RiExternalLinkFill } from "react-icons/ri";
import { useTheme } from "../../../customHooks/";
export default function NetworkHospitalUrlCard({ url }) {
  const {
    colors: { primary_shade, primary_color },
  } = useTheme();
  return (
    <ExternalLinkCard PrimaryShade={primary_shade}>
      <section className="text">
        <h3>Hospitals Near You</h3>
        <p>Click here to view complete list of cashless network hospital</p>
      </section>
      <section className="action">
        <a
          href={url}
          title="Complete list of cashless network hospital"
          target="#"
        >
          <RiExternalLinkFill size={24} color={primary_color} />
        </a>
      </section>
    </ExternalLinkCard>
  );
}

const ExternalLinkCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 49%;
  margin: 10px 0;
  padding: 20px;
  box-shadow: 0 3px 13px 0 rgb(0 0 0 / 16%);
  margin-top: 60px;
  .text {
    flex: 1;
  }
  .text h3 {
    color: #253858;
    font-weight: 900;
    font-size: 18px;
    line-height: normal;
  }
  .text p {
    color: #253858;
    font-size: 13px;
  }

  .action {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 100%;
    background-color: ${props => props.PrimaryShade};
  }

  @media (max-width: 720px) {
    width: 100%;
    margin-top: 0;
    .text h3 {
      font-size: 16px;
    }

    .text p {
      font-size: 10px;
    }
  }
`;
