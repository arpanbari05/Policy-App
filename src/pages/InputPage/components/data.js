import Checkbox from "../../../components/Checkbox";
import RoundDD from "../../../components/RoundDD";
import StyledComponent from "styled-components/macro";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
export const age = [];
for (let i = 0; i <= 10; i++) {
  age[i] = { id: i, title: `${24 + i} Years` };
}

export const getAge = (min, max) => {
  console.log(min,max,"+++")
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

export const dataset = (
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
  console.log("hadgs0", title);
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
  console.log("hadgs", title);
  return (
    <>
      <Checkbox
        title={title}
        code={code}
        type={"checkbox"}
        handleChange={handleInput}
        checked={insurerCBXArray.includes(code) && true}
        disabled={
          (title === "Son" || title === "Daughter") &&
          childCount === 4 &&
          !insurerCBXArray.includes(code) &&
          true
        }
      />
      <div
      className='addChild'
        css={`
          ${((title === "Son" && code === "son") ||
            (title == "Daughter" && code === "daughter")) &&
          insurerCBXArray.includes(code)
            ? "display: flex;"
            : "display: none;"}
          align-items: center;
          position: relative;
          left: -50px;
          font-size: 19px;
          color: #000;
        `}
      >
        <a
          onClick={() => {
            addChild(title);
          }}
        >
          <IoAddCircle />
        </a>{" "}
        <span
          css={`
            color: #6b7789;
            margin: 0 12px;
            position: relative;
            font-size: 14px;
            font-weight: 900;
          `}
        >
          {count}
        </span>
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
          <IoRemoveCircle />
        </a>
      </div>
      <RoundDD
        disabled={
          (title === "Son" || title === "Daughter") &&
          childCount === 4 &&
          !insurerCBXArray.includes(code) &&
          true
        }
        redBorder={
          ageError.includes(code) && insurerCBXArray.includes(code) && true
        }
        title={title}
        code={code}
        list={age}
        type={"dropdown"}
        handleChange={handleInput}
        selected={
          insurerDDArray[insurerDDArray.map((o) => o.insurer).indexOf(code)]
            ?.value || "Select Age"
        }
      />
    </>
  );
};
