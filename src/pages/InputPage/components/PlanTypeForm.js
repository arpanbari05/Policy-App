import { useState } from "react";
import CustomProgressBar from "../../../components/ProgressBar";
import RadioButton from "../../../components/RadioButton";
import {
  useFrontendBoot,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { Title } from "./FormComponents";
import "styled-components/macro";
import { useHistory } from "react-router-dom";
import { InputFormCta } from ".";

function PlanTypeForm(props) {
  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  let {
    data: { plantypes },
  } = useFrontendBoot();

  plantypes = plantypes.filter(plantype => plantype.code !== "I");

  const [selectedPlanType, setSelectedPlanType] = useState(plantypes[0]);
  const [onHoverPlanType, setOnHoverPlanType] = useState(plantypes[0]);

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
    <div className="p-3 pb-5" {...props}>
      <div>
        <Title className="w-100">Which plan would you like to opt for?</Title>
        <CustomProgressBar now={3} total={4} />
      </div>

      <div>
        {plantypes.map(plantype => {
          return (
            <div>
              <RadioButton
                onMouseEnter={e => setOnHoverPlanType(plantype)}
                onMouseOut={e => setOnHoverPlanType(selectedPlanType)}
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

      <div
        className="mt-3"
        css={`
          margin-bottom: 59px;
          min-height: 80px;
          line-height: 1.2;
        `}
      >
        <h2
          css={`
            font-size: 1rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
          `}
        >
          What is {onHoverPlanType.display_name}?
        </h2>
        <p
          css={`
            font-size: 12px;
            font-weight: 900;
            color: rgb(150, 150, 181);
            width: 97%;
          `}
        >
          {onHoverPlanType.description}
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
