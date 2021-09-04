import { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import "styled-components/macro";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";

const FilterModal = ({ show, handleClose }) => {



  const dispatch = useDispatch();

  // const insurerOptions = useSelector(
  //   ({ frontendBoot }) => frontendBoot.frontendData.data
  // );

  // const [selectedinsurers, setSelectedinsurers] = useState([]);

  // const handleChange = (code, displayName) => {
  //   if (displayName) {
  //     setSelectedinsurers(displayName);
  //   }
  // };

  // const handleApply = () => {
  //   dispatch(setFilters({ insurers: selectedinsurers }));
  //   handleClose();
  // };


  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 650px;
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
          More Filters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MoreFilterWrapper>
          <OptionWrapper>
            <div className="morefilter_head">
              <span>Popular Filters</span>
            </div>
            <div className="morefilter_options">
              <div
                className="d-flex justify-content-between py-3 mb-2"
                style={{
                  borderBottom: "1px solid #a1b2c8",
                }}
              >
                <div className="morefilter_option">
                  <input type="checkbox" id="No_room_rent_limit" className="d-none" />
                  <label htmlFor="No_room_rent_limit" className="d-flex align-items-center" >
                    <span className="option_name">No room rent limit</span>
                    <div className="custom_checkbox"></div>
                  </label>
                </div>
                <div className="morefilter_option">
                  <input type="checkbox" id="No_room_rent_limit" className="d-none" />
                  <label htmlFor="No_room_rent_limit" className="d-flex align-items-center" >
                    <span className="option_name">No room rent limit</span>
                    <div className="custom_checkbox"></div>
                  </label>
                </div>
              </div>
            </div>
          </OptionWrapper>
        </MoreFilterWrapper>
      </Modal.Body>
      <Modal.Footer className="text-center">
        <ApplyBtn className="btn apply_btn mx-auto h-100 w-100">Apply</ApplyBtn>
      </Modal.Footer>
    </Modal>
  );
};

const MoreFilters = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Filter
        className="filter d-flex flex-column flex-fill"
        onClick={() => setShowModal(true)}
      >
        <span className="filter_head">More Filters</span>
        <span className="filter_sub_head">
          Select Filters <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      <FilterModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default MoreFilters;

const MoreFilterWrapper = styled.div`
  font-weight: 600;

  .morefilter_head {
    color: #0a87ff;
    margin: 10px 0px;
    font-size: 15px;
  }
  .morefilter_option {
    width: 42%;
    cursor: pointer;
    .option_name {
      width: 80%;
    }
  }
`;
