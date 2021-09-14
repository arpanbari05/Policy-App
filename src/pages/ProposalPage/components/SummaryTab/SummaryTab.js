import React, { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import { renderField } from "../../../../components/FormBuilder/formUtils";
import pencil from "../../../../assets/images/pencil_pro.png";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setActiveIndex } from "../../ProposalSections/ProposalSections.slice";
const convertToFt = value => {
  console.log(value);
  let feet = Math.floor(value / 12);
  let inches = value % 12;
  return `${feet} ft ${inches} in`;
};
const SummaryTab = ({ title, data, values, index }) => {
  console.log('hehe',data)
  console.log('hehe2',values)
  const url = useUrlQuery();
  const enquiryId = url.get("enquiryId");
  const dispatch = useDispatch();
  const history = useHistory();
  const getValueFromCode = useCallback((value, data) => {
    if (data.additionalOptions.options) {
      let filteredOption = data.additionalOptions.options[value];
      return filteredOption;
    }
    if (data.additionalOptions.customOptions) {
      let suffix = data.additionalOptions.customOptions[2];
      return value + " " + suffix;
    }
  }, []);
  console.log('gegege',values)
  const normalRender = useCallback((data, i) => {
    if (data.type === "title") return <TitleWrapper>{data.name}</TitleWrapper>;
    if(data.type === 'date'){
      return (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data.additionalOptions.label}</p>
          <p className="font_sub_p_s">
          {values?.[data.name]}
          </p>
        </Col>
      );
    }
    if (
      !values?.[data.name] &&
      data.type !== "custom_toggle" &&
      data.type !== "custom_medical"
    )
      return <></>;

    if (data.type === "select")
      return (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data.additionalOptions.label}</p>
          <p className="font_sub_p_s">
            {data.name === "town" || data.name === "area"
              ? values[data.name + "__value"]
              : getValueFromCode(values[data.name], data)}
          </p>
        </Col>
      );

    return data.type === "text" || data.type === "checkbox" ? (
      <Col
        md={4}
        sm={4}
        xs={6}
        className="mb-12 text-dark"
        style={{ display: "inline-block" }}
        key={i}
      >
        <p className="font_15_p_s">{data.additionalOptions.label}</p>
        <p className="font_sub_p_s">{values[data.name]}</p>
      </Col>
    ) : (
      data.type === "custom_toggle" && (
        <Col
          md={12}
          key={i}
          style={{ display: "inline-block" }}
          className="details_border_b_p_s"
        >
          <p className="text_b_black_g">{data.additionalOptions.label}</p>
          {values[data.name] instanceof Object &&
          values[data.name].members &&
          Object.keys(values[data.name].members).length ? (
            Object.keys(values[data.name].members).map((item, _i) => {
              if (values[data.name].members[item] === true) {
                return (
                  <div
                    key={_i}
                    class="col-md-2 mb-12"
                    style={{ display: "inline-block" }}
                  >
                    <p class="font_15_p_s medical_details_p_s">{item}</p>
                  </div>
                );
              } else return <></>;
            })
          ) : !data.additionalOptions.showMembers &&
            values[data.name][`is${data.name}`] === "Y" ? (
            <div class="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <p class="font_15_p_s medical_details_p_s">{"Yes"}</p>
            </div>
          ) : (
            <div class="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <p class="font_15_p_s medical_details_p_s">{"No"}</p>
            </div>
          )}
        </Col>
      )
    );
  }, []);
  const objectRender = useCallback((data, i, item, title, schema) => {
    if (
      (!values?.[item]?.[data.name] || title === "Medical Details") &&
      !renderField(data, values?.[item])
    ) {
      return <></>;
    }
    if(data.type === 'date'){
      return (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data.additionalOptions.label}</p>
          <p className="font_sub_p_s">
          {values?.[item]?.[data.name]}
          </p>
        </Col>
      );
    }
    if (data.type === "custom_height") {
      return (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          key={i}
          style={{ display: "inline-block" }}
        >
          <p className="font_15_p_s">{"Height"}</p>
          <p className="font_sub_p_s">{convertToFt(values?.[item]?.[data.name])}</p>
        </Col>
      );
    }
    if (data.type === "custom_medical") {
      return (
        <Col
          md={12}
          key={i}
          style={{ display: "inline-block" }}
          className="details_border_b_p_s"
        >
          <MedicalQuestionWrapper>
            {data.additionalOptions.label}
          </MedicalQuestionWrapper>
          {console.log("gegegedd",values?.[item]?.[data.name])}
          {
          // values?.[item]?.[data.name] instanceof Object &&
          // values?.[item]?.[data.name]?.members &&
          // values?.[item]?.[data.name]?.members.length
          values?.[item]?.[data.name] instanceof Object &&
          values?.[item]?.[data.name]?.members && values?.[item]?.[data.name]?.members
           ? (
            Object.keys(values?.[item]?.[data.name]?.members).map((_item, _i) => {
              return (
                <>
                  <CustomMedicalTitle>{_item}</CustomMedicalTitle>
                  <InnerWrapper>
                    {schema[i + 1].map(additionalQuestion => (
                      <AdditionalWrapper2 className="text-dark">
                        <AdditionalQuestion className="font_15_p_s">
                          {additionalQuestion.additionalOptions.label ||
                            additionalQuestion.additionalOptions.placeholder}
                        </AdditionalQuestion>
                        <AdditionalAnswer className="font_sub_p_s">
                        <p style={{
                          overflowWrap: "break-word"
                        }}>
                          {
                            values?.[item]?.[data.name]?.[_item]?.[
                              additionalQuestion?.name
                            ]
                          }
                          </p>
                        </AdditionalAnswer>
                      </AdditionalWrapper2>
                    ))}
                  </InnerWrapper>
                </>
              );
            })
          ) : (
            <div class="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <MedicalAnswer>No</MedicalAnswer>
            </div>
          )}
        </Col>
      );
    }
    if (data.type === "select")
      return (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data.additionalOptions.label}</p>
          <p className="font_sub_p_s">
            {getValueFromCode(values?.[item]?.[data.name], data)}
          </p>
        </Col>
      );
    return data.type === "text" || data.type === "checkbox" ? (
      <Col
        md={4}
        sm={4}
        xs={6}
        className="mb-12 text-dark"
        key={i}
        style={{ display: "inline-block" }}
      >
        <p className="font_15_p_s">{data.additionalOptions.label}</p>
        <p className="font_sub_p_s">{values?.[item]?.[data.name]}</p>
      </Col>
    ) : (
      data.type === "custom_toggle" && (
        <Col
          md={12}
          key={i}
          style={{ display: "inline-block" }}
          className="details_border_b_p_s"
        >
          <MedicalQuestionWrapper>
            {data.additionalOptions.label}
          </MedicalQuestionWrapper>
          {values?.[item]?.[data.name] instanceof Object &&
          values?.[item]?.[data.name]?.members &&
          Object.keys(values?.[item]?.[data.name]?.members).length ? (
            Object.keys(values?.[item]?.[data.name]?.members).map((_item, _i) => {
              if (values?.[item]?.[data.name]?.members[_item] === true) {
                return (
                  <div
                    key={_i}
                    class="col-md-2 mb-12"
                    style={{ display: "inline-block" }}
                  >
                    <MedicalAnswer>{_item}</MedicalAnswer>
                  </div>
                );
              } else return <></>;
            })
          ) : !data.additionalOptions.showMembers &&
            values?.[item]?.[data.name] &&
            values?.[item]?.[data.name][`is${data.name}`] === "Y" ? (
            <div class="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <MedicalAnswer>Yes</MedicalAnswer>
            </div>
          ) : (
            <div class="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <MedicalAnswer>No</MedicalAnswer>
            </div>
          )}
        </Col>
      )
    );
  }, []);

  return (
    <div className="card_proposal_summary  box-shadow_plan_box_p_s_s_proposal_form_l">
      <EditWrapper
        onClick={() => {
          dispatch(setActiveIndex(index));
          history.push("/proposal?enquiryId=" + enquiryId);
        }}
      >
        {" "}
        <span>Edit</span>
        <img src={pencil} alt="edit"></img>
      </EditWrapper>
      <Row>
        <Col md={11} className="bor_right_m_p_s_title_main">
          <p className="proposal_summary_d_i">{title}</p>
        </Col>
      </Row>
      <br className="hide-on-mobile" />
      <Row>
        {data instanceof Array
          ? data.map(normalRender)
          : Object.keys(data).map((item, index) => (
              <>
                <Border>
                  <InnerTextBorder>
                    <span style={{ textTransform: "capitalize" }}>
                      {item.includes("_")
                        ? item.split("_").slice(1).join(", ")
                        : item}
                    </span>
                  </InnerTextBorder>
                  {data[item].map((_data, index) => {
                    return objectRender(_data, index, item, title, data[item]);
                  })}
                </Border>
              </>
            ))}
      </Row>
    </div>
  );
};

export default SummaryTab;
const Border = styled.div`
  &:not(:last-child) {
    border-bottom: 1px dashed #c1c9d5;
  }
  /* margin-bottom: -15px; */
  margin-top: 15px;
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 0px;
    &:not(:last-child) {
      border-bottom: unset;
    }
  }
`;
const EditWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 40px;
  transform: translateY(-50%);
  border-radius: 31px;
  background-color: #f6f7f9;
  padding-top: 2px;
  cursor: pointer;
  padding-left: 10px;
  z-index: 50;
  @media (max-width: 767px) {
    top: 30px;
  }
  & span {
    text-align: left;
    display: inline-block;
    padding: 6px 0 0;
    font-weight: 400;

    font-size: 18px;
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
  & img {
    float: right;
    height: 40px;
    width: 40px;
    @media (max-width: 767px) {
      height: 30px;
      width: 30px;
    }
  }
  &:after {
    display: none;
  }
`;
const InnerTextBorder = styled.div`
  margin-bottom: 12px;
  color: #69758d !important;
  font-weight: 600 !important;
  font-size: 18px;
  margin-left: 14px;

  @media (max-width: 767px) {

    margin-bottom: 0;
    margin-top: 12px;
    font-size: 14px;
  }
`;
const MedicalQuestionWrapper = styled.p`
  font-size: 18px !important;
  text-align: inherit;
  line-height: 27px !important;
  color: #000000;
  
  font-weight: 400 !important;
  position: relative;
  padding-left: 12px;
  width: 78%;
  margin-bottom: 13px !important;
  margin-top: 25px;

  @media (max-width: 767px) {
    margin-top: 12px;
    width: 100%;
    font-size: 12px !important;
    margin-bottom: 0px !important;

    line-height: 16px !important;
  }
  &::after {
    content: "";
    height: 100%;
    width: 6px;
    position: absolute;
    left: -4px;
    top: -2px;
    background-color: #ffc60a;
    border-radius: 50px;
  }
`;
const MedicalAnswer = styled.p`
  margin: 0px 0 -15px;
  text-transform: capitalize;
  
  font-size: 18px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;
const TitleWrapper = styled.p`
  margin-bottom: 12px;
  color: #69758d !important;
  font-weight: 600 !important;
  
  font-size: 18px !important;
  width: 100%;
  &:not(:first-child) {
    border-top: 1px dashed #c1c9d5;
  }
  @media (max-width: 767px) {
    margin-bottom: 0;
  }
  margin-left: 14px;
`;
const CustomMedicalTitle = styled.div`
  font-family: "pf_handbook_probold";
  text-transform: capitalize;
  font-size: 20px;
  color: #616e87;
  padding-left: 12px;
  margin-bottom: 12px;
`;
const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-left: 12px;
`;
const AdditionalWrapper = styled.div`
  min-width: 25%;
  max-width: 100%;
  margin-bottom: 12px;
`;
const AdditionalWrapper2 = styled.div`
min-width: 25%;
max-width: 257px;
margin-bottom: 12px;
text-align: left;
margin-right: 13px;
`;
const AdditionalQuestion = styled.div``;
const AdditionalAnswer = styled.div`
  font-family: "pf_handbook_probold";
`;
