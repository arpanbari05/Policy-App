import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setFilters } from "../../quote.slice";
import { getAge } from "../../../InputPage/components/data";
import "styled-components/macro";
import { v4 as uuidv4 } from "uuid";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";
import PencilIcon from "../../../../assets/svg-icons/PencilIcon";

const CustomDropdown = ({ member }) => {
  
  const [showDropDown, setShowDropDown] = useState(false);

  let ageRows = getAge(member.min_age, member.max_age);

  return (
    <div className="position-relative">
      <div
        className="age_select d-flex- align-items-center"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        Select age{" "}
        {showDropDown ? (
          <i class="fas fa-chevron-up mx-2 mt-1"></i>
        ) : (
          <i class="fas fa-chevron-down mx-2 mt-1"></i>
        )}
      </div>
      <div
        className={`age_dropdown position-absolute ${
          showDropDown ? "d-block" : "d-none"
        }`}
      >
        {ageRows.map((year, i) => (
          <div key={i} className="text-center py-2">
            {year.title}
          </div>
        ))}
      </div>
    </div>
  );
};

const FilterModal = ({ show, handleClose }) => {
  const membersData = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data.members
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 660px;
        }

        .modal-footer {
          padding: 0px !important;

          border-top: none !important;
        }
        .modal-footer > * {
          margin: 0px !important;
        }
      `}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f5f7f9",
        }}
      >
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Edit Members
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OptionWrapper>
          <div className="d-flex flex-wrap">
            {membersData ? (
              membersData.map((member, i) => {
                return (
                  <Member className="w-50" key={i}>
                    <input
                      type="checkbox"
                      class="d-none"
                      id={`${member.code}_member`}
                    />
                    <label htmlFor={`${member.code}_member`}>
                      <div className="d-flex align-items-center">
                        <div className="custom_checkbox"></div>
                        <span
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          {member.display_name}
                        </span>
                      </div>

                      <CustomDropdown member={member} />
                    </label>
                  </Member>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </OptionWrapper>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="btn apply_btn mx-auto h-100 w-100">Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const EditMemberFilter = () => {
  const { error } = useSelector((state) => state.greetingPage);
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const { data } = frontendData || [""];
  const { members } = data || [""];
  const dispatch = useDispatch();
  const [membersArray, setMembersArray] = useState([]);
  const [childCount, setChildCount] = useState(0);
  const [ageError, setAgeError] = useState([]);

  // const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState(false);
  // Will contain list of insurer names that are checked
  const [insurerCBXArray, setInsurerCBXArray] = useState([]);
  // Will contain list of insurer Dropdown values if checkbox is checked
  const [insurerDDArray, setInsurerDDArray] = useState([]);

  useEffect(() => {
    if (members?.length > 0) {
      setMembersArray([...members]);
    }
  }, [members]);

  // useEffect(() => {
  //   if (window.matchMedia("(max-width: 767px)")) {
  //     if (!insurerCBXArray.includes("daughter")) {
  //       const tempArray = insurerCBXArray.filter(
  //         (element) => element.slice(0, 8) !== "daughter"
  //       );
  //       setInsurerCBXArray(tempArray);
  //     }
  //     if (!insurerCBXArray.includes("son")) {
  //       const tempArray = insurerCBXArray.filter(
  //         (element) => element.slice(0, 3) !== "son"
  //       );
  //       setInsurerCBXArray(tempArray);
  //     }
  //   }
  // }, [membersArray]);

  useEffect(() => {
    let count = 0;
    insurerCBXArray.forEach((element) => {
      if (element.slice(0, 8) === "daughter" || element.slice(0, 3) === "son") {
        count += 1;
      }
    });

    setChildCount(count);
  }, [insurerCBXArray]);

  const addChild = (name) => {
    const code = name.toLowerCase();
    if (insurerCBXArray.includes(code)) {
      if (childCount < 4) {
        const { max_age, min_age } = membersArray.filter(
          (item) => item.code === code
        )[0];
        setChildCount(childCount + 1);
        const genCode = `${code + uuidv4()}`;
        const tempArray = [...membersArray];
        const index = tempArray.findIndex((x) => x.display_name === name);
        tempArray.splice(index + 1, 0, {
          [`code`]: genCode,
          [`display_name`]: name,
          [`min_age`]: `${min_age}`,
          [`max_age`]: `${max_age}`,
          ["is_primary"]: true,
          ["hasClose"]: true,
        });
        handleinsurerCBXArray(genCode);

        setMembersArray(tempArray);
      }
    }
  };

  const handleinsurerCBXArray = (insurer) => {
    const tempArray = [...insurerCBXArray];

    if (!tempArray.includes(insurer)) {
      tempArray.push(insurer);
    } else {
      const index = tempArray.indexOf(insurer);

      if (index > -1) {
        tempArray.splice(index, 1);
        handleinsurerDDArray(insurer, "Select Age");
      }
    }
    setInsurerCBXArray(tempArray);
  };

  const handleinsurerDDArray = (insurer, value) => {
    const tempArray = [...insurerDDArray];
    var index = tempArray.map((o) => o.insurer).indexOf(insurer);
    if (value !== "Select Age") {
      if (index > -1) {
        tempArray[index].value = value;
        if (!insurerCBXArray.includes(insurer)) {
          handleinsurerCBXArray(insurer);
        }
      } else {
        tempArray.push({ insurer: `${insurer}`, value: `${value}` });
        if (!insurerCBXArray.includes(insurer)) {
          handleinsurerCBXArray(insurer);
        }
      }
    } else if (index > -1) {
      tempArray.splice(index, 1);
    }
    if (tempArray.length > 0) {
      setErrors(false);
    } else {
      setErrors(true);
    }
    setInsurerDDArray(tempArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageErrorArray = [];
    insurerCBXArray.forEach((data) => {
      const hasAge = insurerDDArray.some((item) => item.insurer === data);
      if (!hasAge) {
        ageErrorArray.push(data);
      }
    });

    if (insurerCBXArray.length < 1) {
      setErrors("Select at least one Insured");
    } else if (insurerDDArray.length < 1 || ageErrorArray.length > 0) {
      setErrors("Select age for Insured");
      setAgeError(ageErrorArray);
    } else {
      setErrors(false);
    }
    if (ageErrorArray.length < 1 && !errors && insurerDDArray.length > 0) {
      const dataArray = [];
      insurerDDArray.forEach((data) => {
        const i = membersArray.findIndex((x) => x.code === data.insurer);
        if (membersArray[i]?.is_primary) {
          dataArray.push({
            type: `${membersArray[i].code}`,
            age: data.value.endsWith("months")
              ? `0.${data.value.split(" ")[0]}`
              : `${data.value.split(" ")[0]}`,
          });
        }
      });
      // dispatch(saveForm3UserDetails(dataArray, handleChange));
    }
  };


  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <span
        className="plans_for plans_for_editable d-flex align-items-center"
        onClick={() => setShowModal(true)}
      >
        <div className="yellow_start_line"></div>Plans For
        <PencilWrapper className="d-flex justify-content-center align-items-center">
          <PencilIcon
            style={{
              color: "#0a87ff",
            }}
            width="14px"
          />
        </PencilWrapper>
      </span>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default EditMemberFilter;

const PencilWrapper = styled.div`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0px 5px;
`;

const Member = styled.div`
  padding: 5px;
  label {
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    border: solid 1px #b0bed0;
    background-color: #fff;
    padding: 10px;
    font-size: 14px;
    justify-content: space-between;
  }
  .age_select {
    border-radius: 26px;
    background-color: #f3f5f8;
    padding: 5px 15px;
    font-size: 14px;
    color: #6b7789;
  }
  .age_dropdown {
    width: 100%;
    background: white;
    height: 120px;
    font-size: 12px;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0 3px 9px 0 rgb(193 203 218 / 52%);
    z-index: 999;
    & div:hover {
      background-color: #f3f5f8;
    }
  }
  .custom_checkbox {
    margin-right: 20px;
    font-size: 17px;
  }
`;
