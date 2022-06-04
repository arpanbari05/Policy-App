import styled from "styled-components";
export const StyledWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-width: ${props => props.imageSize || "450px"};
    width: 100%;
  }

  h1 {
    font-size: ${props => props.h1Size || "2rem"};
    font-weight: 900;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
    color: #989898;
  }

  @media (max-width: 700px) {
    img {
      max-width: 300px;
    }
    h1 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;
