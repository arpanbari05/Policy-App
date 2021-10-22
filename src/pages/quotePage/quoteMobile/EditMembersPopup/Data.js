import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import Form3CheckBox from "./CheckBox";
import addChildImage from "../../../../assets/images/addChild.png";
import removeChildImage from "../../../../assets/images/removeChild.png";
import GreetingFormDropdown from "./DropDown";
import "styled-components/macro";
export const age = [];
for (let i = 0; i <= 10; i++) {
  age[i] = { id: i, title: `${24 + i} Years` };
}

export const getAge = (min, max) => {
  const age = [];
  const checkMin = Number(min) >= 1 ? min : `${Number(min?.split(".")[0]) + 1}`;
  const checkMinMonths = Number(min) < 1 && min?.split(".")[1];
  if (Number(min) < 1) {
    for (let i = Number(checkMinMonths); i <= Number(11); i++) {
      age.push({ id: i, title: `${i} months` });
    }
  }

  for (let i = Number(checkMin); i <= Number(max); i++) {
    age.push({ id: i, title: `${i} ${i === 1 ? "Year" : "Years"}` });
  }
  return age;
};
// dataSet will add a group of check box and dropdown(eg. Insurer Checkbox and their Age)
export const dataSet = (
  title,
  list,
  insurerCBXArray,
  insurerDDArray,
  handleInput,
  hasClose,
  code,
  ageError,
  childCount,
  addChild
) => {
  const age = [{ id: -1, title: "Select Age" }, ...list];
  let removeChild = false;
  let count = 1;

  if (title === "Son" || title === "Daughter") {
    insurerCBXArray.forEach((element) => {
      if (
        title === "Son" &&
        element.slice(0, 3) === "son" &&
        element !== "son"
      ) {
        count += 1;
        removeChild = element;
      } else if (
        title === "Daughter" &&
        element.slice(0, 8) === "daughter" &&
        element !== "daughter"
      ) {
        count += 1;
        removeChild = element;
      }
    });
  }
  return (
    <Col
      lg={6}
      md={12}
      key={uuidv4()}
      className={"proposal_members__member"}
      css={`
        @media (max-width: 767px) {
          padding-right: 10px;
        }
      `}
    >
      <Row>
        <Col>
          <Row>
            <Col
              md={6}
              xs={6}
              css={`
                @media (max-width: 767px) {
                  ${(title === "Son" || title == "Daughter") &&
                  "display: flex; flex-direction: column;"}
                }
              `}
            >
              <span
                css={`
                  @media (max-width: 767px) {
                    ${(title === "Son" || title == "Daughter") &&
                    "display: flex; flex-direction: row; "}
                  }
                `}
              >
                <Form3CheckBox
                  title={title}
                  code={code}
                  type={"checkbox"}
                  handleChange={handleInput}
                  checked={insurerCBXArray.includes(code) && true}
                  childCount={childCount}
                  disabled={
                    (title === "Son" || title === "Daughter") &&
                    childCount === 4 &&
                    !insurerCBXArray.includes(code) &&
                    true
                  }
                  form3
                />
                <div
                  css={`
                    display: none;
                    @media (max-width: 767px) {
                      ${((title === "Son" && code === "son") ||
                        (title == "Daughter" && code === "daughter")) &&
                      insurerCBXArray.includes(code)
                        ? "display: flex;"
                        : "display: none;"}
                      align-items: center;
                      margin-right: -17px;
                      align-items: flex-end;
                      // position: relative;
                      // left: 16px;
                    }
                  `}
                >
                  <a
                    onClick={() => {
                      removeChild &&
                        handleInput(
                          removeChild,
                          insurerCBXArray.includes(removeChild) && true,
                          "checkbox"
                        );
                    }}
                  >
                    <img
                      css={`
                        width: 35px;
                        @media (max-width: 767px) {
                          width: 18px;
                        }
                      `}
                      src={removeChildImage}
                    />
                  </a>
                  <span
                    css={`
                      color: black;
                      margin: 0 4px;
                      font-size: 20px;
                      @media (max-width: 767px) {
                        font-size: 15px;
                      }
                    `}
                  >
                    {count}
                  </span>
                  <a
                    onClick={() => {
                      addChild(title);
                    }}
                  >
                    <img
                      src={addChildImage}
                      css={`
                        width: 35px;
                        @media (max-width: 767px) {
                          width: 18px;
                        }
                      `}
                    />
                  </a>
                </div>
              </span>
              {/* {hasClose && <a onClick={() => handleCount(title)}>x</a>}{" "} */}
            </Col>
            <Col
              md={6}
              xs={6}
              css={`
                @media (max-width: 767px) {
                     display: flex;
                     justify-content: flex-end;
                }
                }
              `}
            >
              <GreetingFormDropdown
                redBorder={
                  ageError.includes(code) &&
                  insurerCBXArray.includes(code) &&
                  true
                }
                disabled={
                  (title === "Son" || title === "Daughter") &&
                  childCount === 4 &&
                  !insurerCBXArray.includes(code) &&
                  true
                }
                title={title}
                code={code}
                list={age}
                type={"dropdown"}
                handleChange={handleInput}
                selected={
                  insurerDDArray[
                    insurerDDArray.map((o) => o.insurer).indexOf(code)
                  ]?.value || "Select Age"
                }
                // disabled={!insurerCBXArray.includes(code) && true}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
export const familyMember = [
  "Self",
  "Spouse",
  "Son",
  "Daughter",
  "Father",
  "Mother",
];
export const modalFamilyMember = [
  "Brother",
  "Sister",
  "Father-In-Law",
  "Mother-In-Law",
  "Grand Father",
  "Grand Mother",
];
