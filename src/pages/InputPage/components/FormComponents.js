import styled from "styled-components/macro";
import BackButton from "../../../components/BackButton";
import StyledButton from "../../../components/StyledButton";

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 900;
  color: #4a5971;
`;
export const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 900;
`;
export const SubQuestions = styled.h3`
  font-size: 16px;
  font-weight: 900;
`;
export const SubAnswer = styled.h3`
  font-size: 12px;
  font-weight: 900;
  color: #9696b5;
  width: 87%;
`;
export const ErrorMessage = styled.p`
  font-size: 14px;
  color: red;
`;
export function formButtons(handleChange, handleSubmit, currentForm) {
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
      `}
    >
      <BackButton
        value={`Back`}
        onClick={() => handleChange(currentForm - 1)}
        width={`107px`}
        styledCss={`margin: 0;`}
      />
      <StyledButton
        value={`Continue`}
        onClick={handleSubmit}
        width={`173px`}
        styledCss={`margin: 0;`}
      />
    </div>
  );
}
