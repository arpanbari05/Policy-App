import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setFilters, premiumFilterCards } from "../../quote.slice";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose, existingPremium, filters }) => {
  const premiumOptions = useSelector(({ frontendBoot }) => frontendBoot.frontendData.data)
  const dispatch = useDispatch();

  const [selectedPremium, setSelectedPremium] = useState({
    code: "",
    displayName: ""
  });

  console.log(selectedPremium, "selectedPremium")

  const handleChange = (code, displayName) => {
    if (displayName) {
      setSelectedPremium({ code, displayName });
    }
  };

  const handleApply = () => {
    dispatch(setFilters({ premium: selectedPremium }));
    // dispatch(premiumFilterCards(selectedPremium));
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          margin: 0px !important;
          max-width: 440px;
        }
        .modal-content {
          top: 248px;
          left: 8.5vw;
          @media(min-width: 1400px){
            left:5.5vw;
          }
          @media(min-width: 1550px){
            left:9.5vw;
          }
          @media(min-width: 1700px){
            left:13.5vw;
          }
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
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Premium
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <OptionWrapper>

            {
              premiumOptions ? premiumOptions.premiums.map((option, i) => {
                return (
                  <li className="option d-flex align-items-center justify-content-between" key={i}>
                    <label htmlFor={option.code}>{option.display_name}</label>
                    <input
                      type="radio"
                      id={option.code}
                      name="select_premium"
                      onChange={() => handleChange(option.code, option.display_name)}
                    />
                  </li>
                )
              }) : ""
            }


          </OptionWrapper>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn
          className=" apply_btn mx-auto h-100 w-100"
          onClick={() => handleApply()}
        >
          Apply
        </ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const PremiumFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const filters = useSelector(({ quotePage }) => quotePage.filters);

  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">Premium</span>
        <span className="filter_sub_head">
          {filters.premium ? filters.premium.displayName : "Select Premium"}{" "}
          <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        existingPremium={filters.premium}
        filters={filters}
      />
    </>
  );
};

export default PremiumFilter;