import React, { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import "styled-components/macro";
import {
  renderField,
  ValueExtractor,
} from "../../../../components/FormBuilder/formUtils";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setActiveIndex } from "../../ProposalSections/ProposalSections.slice";
import Card from "../../../../components/Card";
import { useTheme } from "../../../../customHooks";
import { FaPen } from "react-icons/fa";

const convertToFt = value => {
  let feet = Math.floor(value / 12);
  let inches = value % 12;
  return `${feet} ft ${inches} in`;
};

const SummaryTab = ({
  title,
  data,
  values,
  index,
  getGroupMembers,
  isVersionRuleEngine,
}) => {
  const filterUnderscore = str =>
    str?.includes("_") ? str?.split("_").join(" ") : str;

  const modifyMembersName = name => {
    let EditedName = "";

    if (title === "Insured Details" && name.includes("_")) {
      EditedName = name.replace(/_/g, " ");
    } else if (title !== "Insured Details" && name.includes("_")) {
      let allMembers = getGroupMembers(parseInt(name));
      EditedName = allMembers
        .map(member => member.code)
        .filter(member => name.includes(member))
        .join(", ")
        .split("_")
        .join(" ");
    } else {
      EditedName = name;
    }

    return EditedName;
  };

  const url = useUrlQuery();

  const enquiryId = url.get("enquiryId");

  const dispatch = useDispatch();

  const history = useHistory();

  const { asyncOptions } = useSelector(({ formBuilder }) => formBuilder);

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const SecondaryColor = colors.secondary_color;

  const PrimaryShade = colors.primary_shade;

  const getValueFromCode = useCallback((value, data) => {
    if (asyncOptions[data.name]) {
      return asyncOptions[data.name][value];
    }
    if (data.additionalOptions.options) {
      let filteredOption = data.additionalOptions.options[value];

      return filteredOption;
    }
    if (data.additionalOptions.customOptions) {
      let suffix = data.additionalOptions.customOptions[2];
      return value + " " + suffix;
    }
  }, []);

  const dateFormatter = str => {
    return str
      ? str.split("-").reduce((acc, el, i) => {
          if (i < str.split("-").length - 1) {
            return acc + `${el.padStart(2, "0")}-`;
          } else {
            return acc + `${el.padStart(4, "0")}`;
          }
        }, "")
      : str;
  };

  const normalRender = useCallback((data, i) => {
    if (data.type === "title") {
      return <TitleWrapper>{filterUnderscore(data?.name)}</TitleWrapper>;
    }
    if (data.type === "date" && values?.[data?.name]) {
      return (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data?.additionalOptions?.label}</p>

          <p className="font_sub_p_s" style={{ fontWeight: "900" }}>
            {dateFormatter(values?.[data?.name])}
          </p>
        </Col>
      );
    }
    if (
      !values?.[data?.name] &&
      data?.type !== "custom_toggle" &&
      data?.type !== "custom_medical"
    )
      return <></>;

    if (data?.type === "select")
      return (
        data.name === "town" || data.name === "area"
          ? values[data.name + "__value"]
          : getValueFromCode(values[data.name], data)
      ) ? (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data.additionalOptions.label}</p>
          <p className="font_sub_p_s" style={{ fontWeight: "900" }}>
            {data.name === "town" || data.name === "area"
              ? values[data.name + "__value"]
              : getValueFromCode(values[data.name], data)}
          </p>
        </Col>
      ) : (
        <></>
      );

    return (data.type === "text" || data.type === "checkbox") &&
      values[data?.name] ? (
      <Col
        md={4}
        sm={4}
        xs={6}
        className="mb-12 text-dark"
        style={{ display: "inline-block" }}
        key={i}
      >
        <p className="font_15_p_s">{data.additionalOptions.label}</p>

        <p
          css={`
            word-break: break-all;
          `}
          className="font_sub_p_s"
          style={{ fontWeight: "900" }}
        >
          {values[data.name]}
        </p>
      </Col>
    ) : (
      data.type === "custom_toggle" && (
        <Col
          md={12}
          key={i}
          // style={{ display: "inline-block" }}
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
                    className="col-md-2 mb-12"
                    style={{ display: "inline-block" }}
                  >
                    <p className="font_15_p_s medical_details_p_s">
                      {item ? item : "No"}
                    </p>
                  </div>
                );
              } else return <></>;
            })
          ) : !data.additionalOptions.showMembers &&
            values[data.name][`is${data.name}`] === "Y" ? (
            <div className="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <p className="font_15_p_s medical_details_p_s">{"Yes"}</p>
            </div>
          ) : (
            <div className="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <p className="font_15_p_s medical_details_p_s">{"No"}</p>
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
    if (data.type === "date" && values?.[item]?.[data.name]) {
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
          <p className="font_sub_p_s" style={{ fontWeight: "900" }}>
            {dateFormatter(values?.[item]?.[data.name])}
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
          <p className="font_sub_p_s" style={{ fontWeight: "900" }}>
            {convertToFt(values?.[item]?.[data.name])}
          </p>
        </Col>
      );
    }
    if (data.type === "custom_medical") {
      return (
        <Col
          md={12}
          key={i}
          // style={{ display: "inline-block" }}
          className="details_border_b_p_s"
        >
          <MedicalQuestionWrapper SecondaryColor={SecondaryColor}>
            {data?.additionalOptions?.label}
          </MedicalQuestionWrapper>

          {values?.[item]?.[data.name] instanceof Object &&
          values?.[item]?.[data.name]?.members &&
          Object.keys(values?.[item]?.[data.name]?.members).length ? (
            Object.keys(values?.[item]?.[data.name]?.members).map(_item => {
              return values?.[item]?.[data.name]?.members[_item] ? (
                <>
                  <CustomMedicalTitle>{_item}</CustomMedicalTitle>
                  <InnerWrapper>
                    {schema[i + 1]?.map(
                      additionalQuestion =>
                        values?.[item]?.[data.name]?.[_item]?.[
                          additionalQuestion?.name
                        ] && (
                          <AdditionalWrapper2 className="text-dark">
                            <AdditionalQuestion className="font_15_p_s">
                              {ValueExtractor(
                                additionalQuestion?.additionalOptions?.label,
                                values?.[item],
                                _item,
                              ) ||
                                additionalQuestion.additionalOptions
                                  .placeholder}
                            </AdditionalQuestion>
                            <AdditionalAnswer
                              className="font_sub_p_s"
                              style={{ fontWeight: "900" }}
                            >
                              <p
                                style={{
                                  overflowWrap: "break-word",
                                }}
                              >
                                {
                                  values?.[item]?.[data.name]?.[_item]?.[
                                    additionalQuestion?.name
                                  ]
                                }
                              </p>
                            </AdditionalAnswer>
                          </AdditionalWrapper2>
                        ),
                    )}
                  </InnerWrapper>
                </>
              ) : (
                <></>
              );
            })
          ) : (
            <div className="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <MedicalAnswer>No</MedicalAnswer>
            </div>
          )}
        </Col>
      );
    }
    if (data.type === "select")
      return getValueFromCode(values?.[item]?.[data.name], data) ? (
        <Col
          md={4}
          sm={4}
          xs={6}
          className="mb-12 text-dark"
          style={{ display: "inline-block" }}
          key={i}
        >
          <p className="font_15_p_s">{data.additionalOptions.label}</p>

          <p className="font_sub_p_s" style={{ fontWeight: "900" }}>
            {getValueFromCode(values?.[item]?.[data.name], data)}
          </p>
        </Col>
      ) : (
        <></>
      );
    return data.type === "text" || data.type === "checkbox" ? (
      <>
        {values?.[item]?.[data.name] && (
          <Col
            md={4}
            sm={4}
            xs={6}
            className="mb-12 text-dark"
            key={i}
            style={{ display: "inline-block" }}
          >
            <p className="font_15_p_s">{data.additionalOptions.label}</p>
            <p className="font_sub_p_s" style={{ fontWeight: "900" }}>
              {values?.[item]?.[data.name]}
            </p>
          </Col>
        )}
      </>
    ) : (
      data.type === "custom_toggle" && (
        <Col
          md={12}
          key={i}
          // style={{ display: "inline-block" }}
          className="details_border_b_p_s"
        >
          <MedicalQuestionWrapper SecondaryColor={SecondaryColor}>
            {data.additionalOptions.label}
          </MedicalQuestionWrapper>

          {values?.[item]?.[data.name] instanceof Object &&
          values?.[item]?.[data.name]?.members &&
          Object.keys(values?.[item]?.[data.name]?.members).length ? (
            Object.keys(values?.[item]?.[data.name]?.members).map(
              (_item, _i) => {
                if (values?.[item]?.[data.name]?.members[_item] === true) {
                  return (
                    <div
                      key={_i}
                      className="col-md-2 mb-12"
                      style={{ display: "inline-block" }}
                      css={`
                        font-weight: 900 !important;
                      `}
                    >
                      <MedicalAnswer>{_item}</MedicalAnswer>
                    </div>
                  );
                } else return <></>;
              },
            )
          ) : !data.additionalOptions.showMembers &&
            values?.[item]?.[data.name] &&
            values?.[item]?.[data.name][`is${data.name}`] === "Y" ? (
            <div className="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <MedicalAnswer>Yes</MedicalAnswer>
            </div>
          ) : (
            <div className="col-md-2 mb-12" style={{ display: "inline-block" }}>
              <MedicalAnswer>No</MedicalAnswer>
            </div>
          )}
        </Col>
      )
    );
  }, []);

  if (!Array.isArray(data)) {
    if (
      Object.keys(data).some(item => isVersionRuleEngine(parseInt(item))) &&
      title === "Medical Details"
    )
      return <></>;
  }

  return (
    <>
      <Card
        styledCss={`
  margin-bottom: 20px;
  
  @media screen and (max-width:768px){
    margin-bottom: 10px;
    padding:5px 2px;
}
  `}
      >
        <div className="card_proposal_summary  box-shadow_plan_box_p_s_s_proposal_form_l">
          <EditWrapper
            PrimaryColor={PrimaryColor}
            onClick={() => {
              dispatch(setActiveIndex(index));
              history.push("/proposal?enquiryId=" + enquiryId);
            }}
          >
            {" "}
            {/* <span>Edit</span> */}
            {/* <img src={pencil} alt="edit"></img> */}
            <PencilWrapper
              className="d-flex justify-content-center align-items-center"
              style={{ color: PrimaryColor }}
              data-html2canvas-ignore="true"
            >
              {/* <PencilIcon
          style={{
            color: "#0a87ff",

          }}
          width="15px"
        /> */}
              <FaPen />
            </PencilWrapper>
          </EditWrapper>
          <Row>
            <Col md={11} className="bor_right_m_p_s_title_main">
              <MainTitle
                PrimaryColor={PrimaryColor}
                PrimaryShade={` linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
                bg
              >
                {title}
              </MainTitle>
              {title === "Other Details" && <></>}
            </Col>
          </Row>
          <br className="hide-on-mobile" />
          <Row
            css={`
              margin-left: 10px;
              margin-top: -28px;
            `}
          >
            {data instanceof Array
              ? data?.map(normalRender)
              : Object.keys(data)?.length &&
                Object.keys(data)?.map(item => {
                  return isVersionRuleEngine(parseInt(item)) &&
                    title === "Medical Details" ? (
                    <></>
                  ) : (
                    <>
                      <Border>
                        <TitleWrapper>
                          <span
                            style={{
                              textTransform: "capitalize",
                              wordBreak: "break-all",
                            }}
                          >
                            {modifyMembersName(item)}
                          </span>
                        </TitleWrapper>
                        <div
                          css={`
                            display: flex;
                            flex-wrap: wrap;
                            align-items: flex-start;
                          `}
                        >
                          {data[item]?.length &&
                            data[item]?.map((_data, index) => {
                              return title === "Other Details"
                                ? objectRender(
                                    {
                                      ..._data,
                                      additionalOptions: {
                                        ..._data?.additionalOptions,
                                        label:
                                          _data?.additionalOptions?.label?.includes(
                                            "Nominee's",
                                          )
                                            ? _data?.additionalOptions?.label?.replace(
                                                "Nominee's",
                                                "",
                                              )
                                            : _data?.additionalOptions?.label?.replace(
                                                "Nominee",
                                                "",
                                              ),
                                      },
                                    },
                                    index,
                                    item,
                                    title,
                                    data[item],
                                  )
                                : objectRender(
                                    _data,
                                    index,
                                    item,
                                    title,
                                    data[item],
                                  );
                            })}
                        </div>
                      </Border>
                    </>
                  );
                })}
          </Row>
        </div>
      </Card>
    </>
  );
};

export default SummaryTab;
const Border = styled.div`
  &:not(:last-child) {
    border-bottom: 1px dashed #c1c9d5;
  }
  /* margin-bottom: -15px; */
  /* margin-top: 15px; */
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
  display: flex;
  align-items: center;
  right: 20px;
  top: 40px;
  transform: translateY(-50%);
  border-radius: 31px;
  background-color: #f6f7f9;
  padding: 4px 0px;
  color: ${props => props.PrimaryColor};
  cursor: pointer;
  /* padding-left: 10px; */
  z-index: 50;
  @media (max-width: 767px) {
    top: 24px;
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
const PencilWrapper = styled.div`
  /* background-color: white; */
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0px 5px;
`;

const MedicalQuestionWrapper = styled.p`
  font-size: 15px !important;
  text-align: inherit;
  line-height: 27px !important;
  color: #000000;

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
    background-color: ${props => props.SecondaryColor};
    border-radius: 50px;
  }
`;
const MedicalAnswer = styled.p`
  margin: 0px 0 -15px;
  text-transform: capitalize;
  padding-left: 15px;
  font-size: 15px;
  font-weight: 900;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;
const TitleWrapper = styled.p`
  margin: 15px 0px;
  margin-top: 0px;
  padding-top: 15px;

  color: #69758d !important;
  font-weight: 600 !important;

  font-size: 18px !important;
  width: 95%;
  &:not(:first-child) {
    border-top: 1px dashed #c1c9d5;
  }
  @media (max-width: 767px) {
    margin-bottom: 15px;
    font-size: 15px !important;
  }
`;
const CustomMedicalTitle = styled.div`
  text-transform: capitalize;
  font-size: 20px;
  color: #616e87;
  padding-left: 12px;
  margin-bottom: 12px;
`;
const InnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 12px;
`;

const AdditionalWrapper2 = styled.div`
  min-width: 25%;
  max-width: 257px;
  margin-bottom: 12px;
  text-align: left;
  margin-right: 13px;
`;
const AdditionalQuestion = styled.div``;
const AdditionalAnswer = styled.div``;

const MainTitle = styled.h2`
  margin-left: 3px;
  margin-bottom: ${props => (props.bg ? "15px" : "10")};
  margin-top: ${props => (props.bg ? "15px" : "10")};
  font-weight: 900;

  background: ${props => props.bg && props.PrimaryShade};
  color: ${props => props.bg && props.PrimaryColor};
  font-size: 21px;
  padding: 10px;
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
`;
