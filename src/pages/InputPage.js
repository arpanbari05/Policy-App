import React from "react";
import Card from "../components/Card";
import StyledButton from "../components/StyledButton";
import TextInput from "../components/TextInput";
import "styled-components/macro";
import RadioCapsule from "../components/RadioCapsule";
import { bg } from "../assets/images";
import RadioButton from "../components/RadioButton";
import RoundDD from "../components/RoundDD";
import Checkbox from "../components/Checkbox";
export const InputPage = () => {
  return (
    <div
      css={`
        background-image: url(${bg});
        height: 100vh;
        width: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right top;
      `}
    >
      hello world
      <Card width={`400px`} padding={`0px`}>
        <div
          css={`
            padding: 10px;
          `}
        >
          <TextInput clear={() => console.log("hehee")} />
          <RadioButton label={`sadf`} checked={true} />
          <RadioButton label={`sadf3`} itemsCentered />
          <RadioCapsule label={`tes`} />
          <RadioCapsule label={`tes2`} checked={true} />
          <RadioCapsule label={`tes3`} checked={true} />
          <Checkbox title={"self"} handleChange={()=>{}} code={`g`}/>
          <RoundDD
            list={[{ title: "he" }, { title: "he 2" }]}
            selected={"Select Age"}
          />
        </div>
        <StyledButton
          value={`button`}
          styledCss={`position: absolute;bottom: 0;left: 0; right: 0; margin: 0;`}
        />
      </Card>
    </div>
  );
};
