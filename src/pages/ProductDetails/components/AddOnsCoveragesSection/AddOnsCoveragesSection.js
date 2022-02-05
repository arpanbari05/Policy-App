import { Tab, Tabs } from "react-bootstrap";
import Checkbox from "../../../../pages/ComparePage/components/Checkbox/Checbox";

import FeatureSection from "../FeatureSection/FeatureSection";
import styled from "styled-components/macro";
import Pencil from "../../../../assets/images/pencil_pink.png";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import CardSkeletonLoader from "../../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { amount } from "../../../../utils/helper";
import Modal from "../../../../components/Common/Modal";
import DownArrow from "../../../../assets/images/downarrow.png";
import { useCartProduct } from "../../../Cart";
import {
  getCancerAddonsApi,
  getCriticalIllnessAddOnsApi,
} from "../../serviceApi";
import { mobile, small } from "../../../../utils/mediaQueries";
import AddOnDetails from "../AddOnDetails/AddOnDetails";
import AddOnDetailsMobile from "../AddOnDetails/AddOnDetailsMobile";
import { getTopUpAddOnsApi } from "../../../quotePage/serviceApi";
import GreetingFormDropdown from "../../../../components/RoundDD2";
import { FaPen } from "react-icons/fa";

const tabletMedia = `@media (min-width: 768px) and (max-width: 900px)`;

export const AddOnBuyButton = ({
  selected,
  onClick = () => {},
  children,
  PrimaryColor,
  PrimaryShade,
}) => (
  <button
    css={`
      width: 100%;
      text-align: left;
      background-color: ${PrimaryShade};
      /* height: 39px; */
      position: relative;
      /* border-radius: 12px; */
      border-radius: 6px;
      font-size: 20px;
      color: ${selected ? PrimaryColor : "unset"};
      font-weight: 900;
      text-align: center;
      padding: 10px;

      :hover {
        .premium {
          color: ${PrimaryColor} !important;
        }
      }

      ${mobile} {
        display: flex;
        align-items: center;
        border-radius: 2px;
        width: 100%;
        font-size: 16px;
        font-weight: 900;
      }
      ${small} {
        width: 100%;
        height: 31px;
        padding: 8px 6px;
        font-size: 14px;
      }
      ${tabletMedia} {
        font-size: 16px;
        width: 100%;
      }
    `}
    onClick={onClick}
    className="btn"
  >
    {children}
  </button>
);

const normalizeAddOnsData = (addOnType, addonsdata) => {
  return addonsdata.reduce((normalizedData, addon) => {
    const { id: addOnId } = addon.product;
    const { sum_insured, premium, total_premium, tax_amount, member } = addon;
    if (!normalizedData[addOnId]) {
      return {
        ...normalizedData,
        [addOnId]: {
          product: { ...addon.product, addOnType },
          premium: {
            [sum_insured]: {
              [member || "all"]: { premium, total_premium, tax_amount },
            },
          },
        },
      };
    }
    return {
      ...normalizedData,
      [addOnId]: {
        ...normalizedData[addOnId],
        premium: {
          ...normalizedData[addOnId]["premium"],
          [sum_insured]: {
            ...normalizedData[addOnId]["premium"][sum_insured],
            [member || "all"]: { premium, total_premium, tax_amount },
          },
        },
      },
    };
  }, {});
};

function Detail({ label, children }) {
  return (
    <div
      css={`
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 1px solid #b0bed0;
        padding: 0px 10px;

        & .GreetingDD__Wrapper {
          left: 0;
          top: 0;
        }

        & .GreetingDD__Lists {
          margin: 0;

          ${mobile} {
            width: 130px !important;
          }
        }

        & .GreetingDD__Header {
          margin: 0;
        }

        & label {
          margin: 0;
        }

        ${mobile} {
          display: none;
        }
      `}
    >
      <div
        css={`
          font-size: 15px;
          font-weight: 600;
          color: #000;
        `}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function DetailDropDown({ options = [], selected, onChange = () => {} }) {
  return (
    <GreetingFormDropdown
      list={options.map((option, idx) => ({ id: idx, title: option }))}
      selected={selected}
      handleChange={(_, value) => onChange(value)}
      noBorder={true}
    />
  );
  // return (
  //   <select
  //     className="form-control_input"
  //     value={selected}
  //     onChange={onChange}
  //     css={`
  //       background: url(${DownArrow}) no-repeat 94% 53% !important;
  //       &:hover {
  //         margin-bottom: initial;
  //       }
  //     `}
  //   >
  //     {options.map(option => (
  //       <option key={option}>{option}</option>
  //     ))}
  //   </select>
  // );
}

function EditDetailsPopup({
  covers = [],
  deductables = [],
  members = [],
  onClose = () => {},
  onUpdate = () => {},
  details: { cover, member, deductable },
  addOnType,
}) {
  const [selectedCover, setSelectedCover] = useState(cover || covers[0]);
  const [selectedMember, setSelectedMember] = useState(member || members[0]);
  const [selectedDeductable, setSelectedDeductable] = useState(
    deductable || deductables[0],
  );

  const handleUpdate = () => {
    onUpdate({ selectedCover, selectedMember, selectedDeductable });
    onClose();
  };

  return (
    <Modal style={{ backgroundColor: "#000", opacity: "0.5" }}>
      <div
        css={`
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
        `}
      >
        <div
          css={`
            background: #fff;
            max-width: 600px;
            width: 100%;
            border-radius: 12px;
            padding: 16px 26px;
            position: relative;
          `}
        >
          <div
            css={`
              display: flex;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              padding: 10px 25px;

              align-items: center;
              justify-content: space-between;
              background: #f5f7f9;
            `}
          >
            <span
              css={`
                font-size: 20px;
                font-weight: 900;
                color: #344563;
              `}
            >
              Edit Details
            </span>
            <i class="fas fa-times" onClick={onClose}></i>
          </div>
          <div
            css={`
              border-radius: 12px;

              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              margin-top: 50px;
              margin-bottom: 40px;
              width: 100%;
              flex-direction: column;
              ${mobile} {
                border: none;
                flex-direction: column;
              }
            `}
          >
            <div
              css={`
                display: none;
                ${mobile} {
                  display: block;
                  & .GreetingDD__List {
                    width: 130px !important;
                  }
                }
              `}
            >
              <div
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  flex: 1;
                  margin-bottom: 20px;

                  & .GreetingDD__Header {
                    margin: 0;
                  }

                  & .GreetingDD__Wrapper {
                    left: 0;
                    top: 0;
                  }

                  & .GreetingDD__List {
                    left: -2px !important;
                  }

                  & label {
                    margin: 0;
                    line-height: normal;
                  }
                `}
              >
                <div>Cover</div>
                <GreetingFormDropdown
                  list={covers.map((option, idx) => ({
                    id: idx,
                    title: option,
                  }))}
                  selected={selectedCover}
                  handleChange={(_, val) => setSelectedCover(val)}
                />
              </div>
              <div
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  flex: 1;

                  & .GreetingDD__Header {
                    margin: 0;
                  }

                  & .GreetingDD__Wrapper {
                    left: 0;
                    top: 0;
                  }

                  & .GreetingDD__List {
                    left: -2px !important;
                  }

                  & label {
                    margin: 0;
                    line-height: normal;
                  }
                `}
              >
                <div>Members</div>
                <GreetingFormDropdown
                  list={members.map((option, idx) => ({
                    id: idx,
                    title: option,
                  }))}
                  selected={selectedMember}
                  handleChange={(_, e) => setSelectedMember(e)}
                />
              </div>
            </div>

            <Detail label="Cover">
              <DetailDropDown
                options={covers}
                selected={selectedCover}
                onChange={e => setSelectedCover(e)}
              />
            </Detail>
            <Detail label="Members">
              <DetailDropDown
                options={members}
                selected={selectedMember}
                onChange={e => setSelectedMember(e)}
              />
            </Detail>
            {addOnType === "top_up" ? (
              <Detail label="Deductable">
                <DetailDropDown
                  options={deductables}
                  selected={selectedDeductable}
                  onChange={e => setSelectedDeductable(e)}
                />
              </Detail>
            ) : null}
          </div>
          <button
            css={`
              background: #0a87ff;
              color: #fff;
              padding: 10px 12px;
              width: 100%;
              position: absolute;
              bottom: 0px;
              border-radius: 8px;
              font-size: 18px;
              font-weight: 400;
              margin: auto;
              left: 0;
              margin-top: 20px;
              :hover {
                color: white !important;
              }
            `}
            onClick={handleUpdate}
            className="btn"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}

async function getTopUps({
  groupCode,
  company_alias,
  sum_insured,
  tenure = 1,
}) {
  const response = await getTopUpAddOnsApi({
    company_alias,
    sum_insured,
    groupCode,
    tenure,
  });
  return response;
}

async function getCriticalIllness({ groupCode, company_alias, tenure = 1 }) {
  const response = await getCriticalIllnessAddOnsApi({
    companyAlias: company_alias,
    groupCode,
    tenure,
  });
  return response;
}

async function getCancerAddons({ groupCode, company_alias, tenure = 1 }) {
  const response = await getCancerAddonsApi({
    companyAlias: company_alias,
    groupCode,
    tenure,
  });
  return response;
}

const AddOnTabContentWrap = styled.div`
  /* background-color: #fff; */
  padding: 18px 0 36px 0;
  margin-top: 20px;

  ${mobile} {
    background-color: #eff7ff;
    border-radius: 19px;

    padding-bottom: 14px;
  }
`;

function AddOnCardContent({ label, value, onEditClick = () => {} }) {
  return (
    <div
      css={`
        justify-content: space-between;
        padding: 0 10px 6px 0px;
        margin-left: 10px;
        margin-top: 10px;
        font-size: 14px;
        font-weight: 900;
        display: flex;
        align-items: center;
        /* width: 48%; */

        color: #505f79;
        justify-content: space-between;

        /* ${mobile} {
          flex: 1;
          justify-content: center;
          padding-bottom: 0;
        }

        ${small} {
          margin-left: 0;
          &:not(:first-child) {
            padding-left: 10px;
          }
        } */
      `}
    >
      <div
        css={`
          ${mobile} {
            font-size: 14px;
          }
          ${small} {
            font-size: 11px;
          }
          ${tabletMedia} {
            font-size: 14px;
          }
        `}
      >
        {label}
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          font-weight: 900;
          font-size: 17px;
          text-transform: capitalize;

          ${mobile} {
            font-size: 14px;
          }

          ${small} {
            font-size: 13px;
            line-height: 1.23;
          }

          ${tabletMedia} {
            font-size: 16px;
          }
        `}
      >
        {value}
        <button
          css={`
            display: inline-block;
            font-size: 14px;
            margin: 0 6px;
            cursor: pointer;

            ${mobile} {
              width: 16px;
            }

            ${small} {
              width: 17px;
            }
          `}
          onClick={onEditClick}
          className="btn"
        >
          <FaPen />
        </button>
      </div>
    </div>
  );
}

function AddOnCard({
  handleBuyNow = () => {},
  selected = [],
  addOnData: { premium = [], product: addOn = {} },
  handleDataChange,
}) {
  const [showviewDetailMbile, setShowViewDetailMbile] = useState(false);
  const sumInsuredList = Object.keys(premium);

  const [sumInsured, setSumInsured] = useState(
    selected[0] ? selected[0].sum_insured : sumInsuredList[0],
  );
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const membersList = Object.keys(premium[sumInsured]);

  const [member, setMember] = useState(
    addOn.insurance_type.alias === "top_up"
      ? "All"
      : selected.length
      ? selected.length > 1
        ? "All"
        : selected[0].members[0]
      : membersList[0],
  );

  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );

  const companyLogoSrc = companies[addOn.company.alias].logo;

  const { groupCode } = useParams();

  const cart = useSelector(state => state.cart[groupCode]);

  const { sum_insured: deductable, group } = cart ?? {};

  const [editPopup, setEditpopup] = useState(false);

  const displayPremium = premium[sumInsured]
    ? member === "All"
      ? amount(
          membersList?.reduce((totalPremium, member) => {
            return (
              totalPremium +
              parseInt(premium?.[sumInsured]?.[member]?.total_premium)
            );
          }, 0),
        )
      : amount(premium?.[sumInsured]?.[member]?.total_premium)
    : 0;

  const handleUpdate = ({ selectedCover, selectedMember }) => {
    setSumInsured(selectedCover);
    setMember(selectedMember);
  };

  const handleEditClick = () => setEditpopup(true);

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetailsShow = () => {
    setShowDetails(!showDetails);
  };

  const memberGroups = useSelector(state => state.greetingPage.memberGroups);

  const getSendData = () => {
    const sendData =
      addOn.insurance_type.alias === "top_up"
        ? [
            {
              deductible: deductable,
              members: memberGroups[groupCode],
              premium: premium[sumInsured]["all"].premium,
              product_id: addOn.id,
              sum_insured: sumInsured,
              tax_amount: premium[sumInsured]["all"].tax_amount,
              tenure: "1",
              total_premium: premium[sumInsured]["all"].total_premium,
              product: addOn,
            },
          ]
        : member === "all" || member === "All"
        ? membersList.map(member => {
            const {
              premium: basePremium,
              total_premium,
              tax_amount,
            } = premium[sumInsured][member];
            return {
              deductible: deductable,
              members: [member],
              premium: basePremium,
              product_id: addOn.id,
              sum_insured: sumInsured,
              tax_amount,
              tenure: "1",
              total_premium,
              product: addOn,
            };
          })
        : [
            {
              deductible: deductable,
              members: [member],
              premium: premium[sumInsured][member]["premium"],
              product_id: addOn.id,
              sum_insured: sumInsured,
              tax_amount: premium[sumInsured][member]["tax_amount"],
              tenure: "1",
              total_premium: premium[sumInsured][member]["total_premium"],
              product: addOn,
            },
          ];

    return sendData;
  };

  const handleBuy = () => {
    handleBuyNow(!!selected.length, getSendData());
  };

  const initRef = useRef(true);

  useEffect(() => {
    if (selected.length && !initRef.current)
      handleDataChange(selected, getSendData());
    initRef.current = false;
  }, [sumInsured, member]);

  const AddOnDetailsTabs = () => (
    <>
      <AddOnCardContent
        label="Cover"
        value={amount(sumInsured)}
        onEditClick={handleEditClick}
      />
      <AddOnCardContent
        label="Insured"
        value={member}
        onEditClick={handleEditClick}
      />
      {addOn.insurance_type.alias === "top_up" ? (
        <AddOnCardContent
          label="Deductable"
          value={amount(deductable)}
          onEditClick={handleEditClick}
        />
      ) : null}
    </>
  );

  const AddOnName = () => (
    <>
      <div
        css={`
          width: 60px;
          margin-right: 15px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          @media (max-width: 768px) {
            width: 40px;
            height: 40px;
          }
        `}
      >
        <img
          css={`
            width: 100%;
            height: 100%;
            object-fit: contain;
          `}
          src={companyLogoSrc}
          alt={"company"}
        />
      </div>
      <div
        className="flex-fill"
        css={`
          ${mobile} {
            border: none;
            padding: 0;
            margin-right: auto;
          }
        `}
      >
        <div
          css={`
            color: #253858;
            /* width: 160px; */
            font-weight: 900;
            white-space: nowrap;
            overflow: hidden;

            @media (max-width: 768px) {
              white-space: break-spaces;
              font-size: 13px !important;
            }

            /* ${mobile} {
              text-overflow: ellipsis;
              width: max-content;
            } */

            /* @media (max-width: 460px) {
              width: 160px;
            }
            @media (max-width: 412px) {
              width: 139px;
            }
            @media (max-width: 390px) {
              width: 100px;
            } */
            ${small} {
              font-size: 11px;
              font-weight: 900;
            }
          `}
          title={addOn.name}
        >
          {addOn.name}
        </div>
        <button
          className="btn"
          css={`
            font-size: 12px;
            font-weight: 900;
            color: #7b7b7b;
            background: ${PrimaryShade};
            color: ${PrimaryColor};
            border-radius: 50px;
            ${mobile} {
              font-size: 11px;
              color: #000;
            }
          `}
          onClick={() => toggleDetailsShow()}
        >
          View Details
        </button>
      </div>
    </>
  );

  const AddOnCardMobile = () => (
    <>
      <div
        css={`
          display: none;
          /* ${mobile} {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding-bottom: 6px;
            width: 100%;
            align-items: center;
          } */
        `}
      >
        <AddOnName />
        <AddOnBuyButton
          onClick={handleBuy}
          selected={selected.length}
          PrimaryColor={PrimaryColor}
          PrimaryShade={PrimaryShade}
        >
          {displayPremium}
        </AddOnBuyButton>
      </div>
      <div
        css={`
          display: none;
          justify-content: space-between;
          width: 100%;
          padding-top: 6px;
          /* ${mobile} {
            display: flex;
          } */
        `}
      >
        <AddOnDetailsTabs />
      </div>
    </>
  );

  return (
    <>
      {showDetails ? (
        <>
          <AddOnDetails
            addOn={{
              ...addOn,
              sum_insured: sumInsured,
              total_premium:
                addOn.insurance_type.alias === "top_up"
                  ? premium[sumInsured]["all"]["total_premium"]
                  : premium[sumInsured][member]["total_premium"],
            }}
            handleClose={toggleDetailsShow}
            show={showDetails}
          />
        </>
      ) : null}

      {/* {showviewDetailMbile ? (
        <AddOnDetailsMobile
          addOn={{
            ...addOn,
            sum_insured: sumInsured,
            total_premium:
              addOn.insurance_type.alias === "top_up"
                ? premium[sumInsured]["all"]["total_premium"]
                : premium[sumInsured][member]["total_premium"],
          }}
          handleClose={() => setShowViewDetailMbile(false)}
        />
      ) : null} */}
      <div
        css={`
          border: 1px solid var(--addon-card-border-gray);
          box-shadow: rgb(0 75 131 / 15%) 0px 3px 6px 0px;
          background-color: var(--addon-card-gray);
          padding: 20px 10px;
          width: 95%;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          &:hover {
            background-color: #fff;
          }
          @media (max-width: 768px) {
            width: 100%;
            background: white;
          }

          /* ${mobile} {
            border-radius: 8px;
            padding: 10px;
            flex-direction: column;
            min-width: 260px;
            background-color: #fff;
            box-shadow: 0 3px 6px 0 #dbe1ee;
            border: none;
          }

          ${tabletMedia} {
            padding: 16px 12px;
          } */
        `}
      >
        {editPopup && (
          <EditDetailsPopup
            covers={sumInsuredList}
            members={
              addOn.insurance_type.alias === "top_up"
                ? ["All"]
                : ["All", ...membersList]
            }
            deductables={[deductable]}
            onClose={() => setEditpopup(false)}
            onUpdate={handleUpdate}
            details={{
              cover: sumInsured,
              member,
              deductable,
            }}
            addOnType={addOn.insurance_type.alias}
          />
        )}
        <div
          css={`
            display: flex;
            width: 100%;

            align-items: center;
          `}
        >
          <AddOnName />
        </div>
        <div
          css={`
            width: 100%;
          `}
        >
          <AddOnDetailsTabs />
        </div>
        <div
          css={`
            width: 100%;
            /* margin-right: 15px; */
          `}
          className="mt-4"
        >
          <AddOnBuyButton
            onClick={handleBuy}
            selected={selected.length}
            PrimaryColor={PrimaryColor}
            PrimaryShade={PrimaryShade}
          >
            <div className="d-flex align-items-center w-100 justify-content-center">
              <span className="premium">{displayPremium}</span>{" "}
              <span
                css={`
                  font-size: 9px;
                  margin-left: 10px;
                  height: 23px;
                  width: 23px;
                  line-height: 30px;
                  text-align: center;
                  border-radius: 50%;
                  background: ${selected.length ? PrimaryColor : "white"};
                  box-shadow: ${selected.length
                    ? "0px 2px 5px -2px rgb(0 0 0 / 25%)"
                    : ""};
                  font-family: "font-awesome";

                  color: #fff;
                  justify-content: center;
                  align-items: center;
                  display: flex;
                `}
              >
                <i class="fas fa-check"></i>
              </span>
            </div>
          </AddOnBuyButton>
        </div>
        <AddOnCardMobile />
      </div>
    </>
  );
}

function AddOns({ addOns = {} }) {
  const { groupCode } = useParams();
  const { product, updateProductRedux } = useCartProduct(groupCode);

  const addAddOn = addOns => {
    let newAddOns = [...product.addons];
    const addOnTypeExist = product.addons.some(addon =>
      addOns.some(addOn => {
        const sameAddOnType =
          addOn.product.insurance_type.alias ===
          addon.product.insurance_type.alias;
        const sameMember = addOn.members.some(addOnMember =>
          addon.members.includes(addOnMember),
        );
        return sameAddOnType && sameMember;
      }),
    );
    if (addOnTypeExist) {
      newAddOns = newAddOns.filter(
        newAddOn =>
          !addOns.some(
            addOn =>
              addOn.product.insurance_type.alias ===
                newAddOn.product.insurance_type.alias &&
              addOn.members.some(member => newAddOn.members.includes(member)),
          ),
      );
    }
    updateProductRedux({
      ...product,
      page: "product details",
      addons: [...newAddOns, ...addOns],
    });
  };

  const removeAddOn = addOnId => {
    updateProductRedux({
      ...product,
      page: "product details 2",
      addons: product.addons.filter(addon => addon.product.id !== addOnId),
    });
  };

  const updateAddOn = addOns => {
    let newAddOns = product.addons.filter(addon =>
      addOns.some(addOn => addOn.product.id !== addon.product.id),
    );
    const addOnTypeExist = product.addons.some(addon =>
      addOns.some(addOn => {
        const sameAddOnType =
          addOn.product.insurance_type.alias ===
          addon.product.insurance_type.alias;
        const sameMember = addOn.members.some(addOnMember =>
          addon.members.includes(addOnMember),
        );
        return sameAddOnType && sameMember;
      }),
    );
    if (addOnTypeExist) {
      newAddOns = newAddOns.filter(
        newAddOn =>
          !addOns.some(
            addOn =>
              addOn.product.insurance_type.alias ===
                newAddOn.product.insurance_type.alias &&
              addOn.members.some(member => newAddOn.members.includes(member)),
          ),
      );
    }
    updateProductRedux({
      ...product,
      addons: [...newAddOns, ...addOns],
      page: "product details 4",
    });
  };

  const handleBuyNow = (selected, addons) => {
    if (!selected) addAddOn(addons);
    else removeAddOn(addons[0].product.id);
  };

  const handleUpdate = (selected, addOns) => {
    if (selected) updateAddOn(addOns);
  };

  return (
    <>
      <div
        css={`
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: ${Object.keys(addOns).length > 1
            ? "flex-start"
            : "flex-start"} !important;
        `}
      >
        {Object.keys(addOns).map(addOnId => (
          <div
            css={`
              width: 48%;
              @media (max-width: 500px) {
                width: 100%;
              }
              &:not(:last-child) {
                margin-bottom: 30px;
                ${mobile} {
                  margin-bottom: 10px;
                }
              }
            `}
            key={addOnId}
          >
            <AddOnCard
              selected={product.addons
                .filter(addon => addon.product.id === parseInt(addOnId))
                .map(addon =>
                  addon.members.length > 1
                    ? { ...addon, members: ["all"] }
                    : addon,
                )}
              addOnData={addOns[addOnId]}
              handleBuyNow={handleBuyNow}
              handleDataChange={handleUpdate}
            />
          </div>
        ))}
      </div>
    </>
  );
}

const AddOnsNav = styled(Tabs)`
  /* justify-content: space-around; */
  border: none;
  color: #5b5e64 !important;

  @media (max-width: 400px) {
    .nav-item {
      font-size: 12px !important;
      margin-right: 0px !important;
      color: #383b3f;
    }
  }
  & .nav-item {
    position: relative;
    width: max-content;
    background: none;
    color: #383b3f !important;
    padding: 0;
    font-size: 16px;
    font-weight: 900;

    border: none !important;
    margin-right: 10px;
    &::after {
      content: "";
      position: absolute;
      top: 110%;
      left: 0%;
      width: 100%;
      height: 4px;
      background: var(--dark-pink);
      border-radius: 20px;
      transform: scale(0, 1);
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
    .nav-link {
      color: #383b3f !important;
      border: none !important;
      border-radius: 50px !important;
      :hover {
        border: none;
        border-radius: 50px;
      }
    }
    .nav-link.active {
      border-color: #0a87ff;
      background: ${props => props.PrimaryColor};
      color: white !important;
      border-radius: 50px;
      &::after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

const addOnsFetch = {
  top_up: getTopUps,
  critical_illness: getCriticalIllness,
  cancer: getCancerAddons,
};

function AddOnCoveragesSection() {
  const [topUps, setTopUps] = useState({});
  const [criticalIllnessList, setCriticalIllnessList] = useState({});
  const [cancerAddOns, setCancerAddOns] = useState({});
  const [loaders, setLoaders] = useState([
    "top_up",
    "critical_illness",
    "cancer",
  ]);
  const { groupCode } = useParams();
  const cart = useSelector(state => state.cart[groupCode]);
  const { sum_insured } = cart;

  const companies = useSelector(
    state => state.frontendBoot.frontendData.data.companies,
  );

  const companyAliasList = Object.keys(companies);
  const { theme } = useSelector(state => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const getCompanies = insuranceType =>
    companyAliasList.filter(companyAlias =>
      companies[companyAlias].insurance_types.includes(insuranceType),
    );

  const removeLoader = loaderToRemove =>
    setLoaders(loaders => loaders.filter(loader => loader !== loaderToRemove));

  const getAddOns = (addOnType, callback) => {
    const companies = getCompanies(addOnType);
    const fetchAddOns = addOnsFetch[addOnType];
    return Promise.allSettled(
      companies.map(company_alias =>
        fetchAddOns({
          company_alias,
          sum_insured,
          groupCode,
        })
          .then(response => {
            if (response.data.data.length > 0) {
              const { data: addOns } = response.data;
              callback(normalizeAddOnsData(addOnType, addOns));
            }
          })
          .catch(err => console.log({ err })),
      ),
    ).finally(() => removeLoader(addOnType));
  };

  const updateAddOns = (addOnData, callback) =>
    callback(prevAddOns => ({ ...prevAddOns, ...addOnData }));

  const {
    proposerDetails: { members: membersWithAge },
  } = useSelector(state => state.greetingPage);

  useEffect(() => {
    setTopUps({});
    setCriticalIllnessList({});
    setCancerAddOns({});
    getAddOns("top_up", topUpsData => updateAddOns(topUpsData, setTopUps));
    getAddOns("critical_illness", criticalIllnessData =>
      updateAddOns(criticalIllnessData, setCriticalIllnessList),
    );
    getAddOns("cancer", cancerData =>
      updateAddOns(cancerData, setCancerAddOns),
    );
  }, [membersWithAge, groupCode]);

  const loadingTopUps = loaders.includes("top_up");
  const loadingCriticalIllness = loaders.includes("critical_illness");
  const loadingCancer = loaders.includes("cancer");

  return (
    <FeatureSection
      heading="Add-on Coverages"
      id="add-on-coverages"
      subHeading="Boost your selected Health plan by adding below Add-on Coverages"
    >
      <div
        css={`
          ${small} {
            section > & {
              padding: 0;
          
          }
        `}
      >
        <AddOnsNav
          id="addon-coverages-tabs"
          transition={false}
          PrimaryColor={PrimaryColor}
        >
          {hasKeys(topUps) ? (
            <Tab eventKey="top-up" title="Super Top-up">
              <AddOnTabContentWrap>
                <AddOnDesc>
                  Increase your cover amount on selected base plan at minimum
                  premium
                </AddOnDesc>

                <AddOns addOns={topUps} />
                {loadingTopUps && <CardSkeletonLoader />}
              </AddOnTabContentWrap>
            </Tab>
          ) : null}
          {hasKeys(criticalIllnessList) ? (
            <Tab eventKey="ci" title="Critical Illness">
              <AddOnTabContentWrap>
                <AddOnDesc>
                  Choose a plan and ensure coverage for listed Critical Illness
                  along with you selected base plan
                </AddOnDesc>

                <AddOns addOns={criticalIllnessList} />
                {loadingCriticalIllness && <CardSkeletonLoader />}
              </AddOnTabContentWrap>
            </Tab>
          ) : null}
          {hasKeys(cancerAddOns) ? (
            <Tab eventKey="cancer" title="Cancer">
              <AddOnTabContentWrap>
                <AddOnDesc>
                  Choose a plan to be prepared for coverage for various cancer
                  stages along with your selected base plan
                </AddOnDesc>
                <AddOns addOns={cancerAddOns} />
                {loadingCancer && <CardSkeletonLoader />}
              </AddOnTabContentWrap>
            </Tab>
          ) : null}
        </AddOnsNav>
      </div>
    </FeatureSection>
  );
}

function hasKeys(obj = {}) {
  return Object.keys(obj).length;
}

const AddOnDesc = styled.p`
  margin-top: -10px;
  margin-bottom: 1rem;

  ${mobile} {
    padding: 0px 12px;
    margin-bottom: 10px;
    margin-top: 0;
  }

  ${small} {
    padding-left: 11px;
    font-size: 11px;
    line-height: 1.67;
  }
`;

export default AddOnCoveragesSection;
