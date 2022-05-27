import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProposalCheckBox from "../../../components/Common/ProposalSummary/summaryCheckBox";
const OtherTable = ({
  members = ["Self", "Spouse"],
  questions = [
    {
      label:
        "Have insured ever filled / applied a claim with their current / previous insurer?",
      name: "hello",
    },
  ],
  onChange,
}) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    onChange(values);
  }, [values]);
  return (
    <>
      <Header>Check the box if the answer is yes</Header>
      <Table>
        <TableHeader>
          <Col width={33.3}>Type</Col>
          {members.map((item, index) => (
            <Col key={index} width={66.7 / members.length}>
              {item}
            </Col>
          ))}
        </TableHeader>
        {questions.map((item, index) => (
          <TableRow key={index}>
            <Col width={33.3}>{item.label}</Col>
            {members.map((innerItem, index) => (
              <Col key={index} width={66.7 / members.length}>
                <ProposalCheckBox
                  title={item.name + innerItem}
                  value={values[innerItem] && values[innerItem][item.name]}
                  onChange={e =>
                    setValues({
                      ...values,
                      [innerItem]: {
                        ...values[innerItem],
                        [item.name]: e.target.checked,
                      },
                    })
                  }
                />
              </Col>
            ))}
          </TableRow>
        ))}
      </Table>
    </>
  );
};

export default OtherTable;
const Header = styled.p`
  font-size: 16px !important;

  margin-bottom: 23px;
  text-align: justify;
  line-height: 18px;
  color: #000000;
  font-weight: 400;
`;
const Table = styled.ul`
  border: 1px solid #dfe5eb;
  padding: 10px;
`;
const TableHeader = styled.li`
  background-color: #f2f4f7;
  font-size: 15px;
  text-transform: initial;

  color: #57667e;

  border-radius: 3px;
  padding: 25px 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const Col = styled.div`
  flex-basis: 50%;
  max-width: ${props => props.width}% !important;
  color: #565454;

  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px; ;
`;
const TableRow = styled.li`
  background-color: #ffffff;
  box-shadow: none;
  border-bottom: 1px solid #cacaca;
  border-radius: 3px;
  padding: 25px 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
