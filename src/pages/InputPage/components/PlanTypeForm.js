import { useState } from "react";
import { Button } from "../../../components";
import CustomProgressBar from "../../../components/ProgressBar";
import RadioButton from "../../../components/RadioButton";
import {
  useFrontendBoot,
  useTheme,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { Title } from "./FormComponents";
import "styled-components/macro";
import { useHistory } from "react-router-dom";
import { InputFormCta } from ".";

function PlanTypeForm(props) {
  const { colors } = useTheme();

  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  let {
    data: { plantypes },
  } = useFrontendBoot();

  plantypes = plantypes.filter(plantype => plantype.code !== "I");

  const [selectedPlanType, setSelectedPlanType] = useState(plantypes[0]);

  const history = useHistory();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const handleSubmit = () => {
    updateEnquiry({ plan_type: selectedPlanType.code }).then(res => {
      if (res.error || !res.data) return;
      const { groups } = res.data.data;
      const firstGroup = Math.min(...groups.map(group => group.id));
      history.push(getUrlWithEnquirySearch(`/input/location-${firstGroup}`));
    });
  };

  return (
    <div className="p-3" {...props}>
      <div>
        <Title className="w-100">Which plan would you like to opt for?</Title>
        <CustomProgressBar now={3} total={4} />
      </div>

      <div>
        {plantypes.map(plantype => {
          return (
            <div>
              <RadioButton
                onMouseEnter={e => setSelectedPlanType(plantype)}
                onClick={e => setSelectedPlanType(plantype)}
                id={plantype.display_name}
                value={plantype.code}
                checked={selectedPlanType.code === plantype.code}
                label={plantype.display_name}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <h2
          css={`
            font-size: 1rem;
          `}
        >
          What is {selectedPlanType.display_name}?
        </h2>
        <p
          css={`
            font-size: 0.79rem;
            color: ${colors.font.two};
            width: 80%;
          `}
        >
          {selectedPlanType.description}
        </p>
      </div>

      <InputFormCta
        backLink={getUrlWithEnquirySearch(`/input/members`)}
        onContinueClick={handleSubmit}
        loader={updateEnquiryQuery.isLoading}
      />
    </div>
  );
}

export default PlanTypeForm;
