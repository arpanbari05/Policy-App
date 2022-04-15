import { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components/macro";

import {
  useCompanies,
  useFrontendBoot,
  useMembers,
  useTheme,
} from "../../../customHooks";
import { mobile } from "../../../utils/mediaQueries";
import {
  amount,
  getFirstName,
  getTotalPremium,
  numberToDigitWord,
} from "../../../utils/helper";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { selectAdditionalDiscounts } from "../productDetails.slice";
import {
  useGetCartQuery,
  useGetEnquiriesQuery,
  useDeleteGroupQuery,
} from "../../../api/api";
import { premiumWithAddons } from "../../../../src/utils/helper";
import { skipToken } from "@reduxjs/toolkit/query";
import CardSkeletonLoader from "../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { useRider, useCart } from "../../../customHooks/index";
import { Button } from "../../../components";
import { useEffect } from "react";
import "./ReviewCardPopup.scss";

const tabletMedia = `@media (min-width: 768px) and (max-width: 900px)`;

export function PopUpWithCloseButton({ title, onClose = () => {}, children }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal
      show
      animation={false}
      style={{
        zIndex: "2000",
        border: "none",
      }}
      css={`
        & .modal-dialog {
          max-width: 800px;
          border-radius: 12px;
          ${mobile} {
            margin: 70px auto;
            width: 90%;
          }
          ${tabletMedia} {
            margin: 70px auto;
            width: 90%;
          }
        }
      `}
    >
      <Modal.Header
        style={{ borderRadius: "12px" }}
        css={`
          color: #253858;
          background: #f5f7f9;

          font-weight: 600;
          ${mobile} {
            border: none;
            padding: 10px;
          }
        `}
      >
        {title && (
          <ModalTitle
            css={`
              margin: 10px 9px;
              font-size: 18px;
              @media (max-width: 600px) {
                font-size: 15px;
                margin: 0px;
              }
              @media (max-width: 450px) {
                font-size: 13px;
              }
            `}
          >
            {title}
          </ModalTitle>
        )}
        <i
          onClick={handleClose}
          style={{ cursor: "pointer" }}
          class="fas fa-times"
        ></i>
      </Modal.Header>
      <Modal.Body
        style={{ borderRadius: "12px" }}
        css={`
          ${mobile} {
            padding: 0;
            margin-top: -10px;
          }
        `}
      >
        {children}
      </Modal.Body>
    </Modal>
  );
}

function AddOnDetailsCard({
  addOn: {
    product: {
      name,
      company: { alias },
    },
    members,
    total_premium,
    sum_insured,
  },
}) {
  const { getCompanyLogo } = useCompanies();

  const logoSrc = getCompanyLogo(alias);

  function DetailTab({ label = "", value = "" }) {
    return (
      <div
        css={`
          flex: 1;
          color: #000;

          display: flex;
          justify-content: center;
          &:not(:last-child) {
            border-right: 1px solid #ddd;
          }
        `}
      >
        <div>
          <div
            css={`
              font-size: 14px;
            `}
          >
            {label}
          </div>
          <div
            css={`
              font-size: 15px;
              font-weight: 900;
              color: #505f79;
            `}
          >
            {value}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      css={`
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 20px;
        width: 100%;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          width: 40%;
        `}
      >
        <div className="logo_style_common" style={{ marginBottom: "0px" }}>
          <img src={logoSrc} alt={alias} />
        </div>
        <div
          css={`
            margin-left: 10px;
            font-weight: 900;
            width: 65%;
          `}
        >
          {name}
        </div>
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 58%;
        `}
      >
        <DetailTab label="Cover" value={`${amount(sum_insured)} / year`} />
        <DetailTab label="Premium" value={`${amount(total_premium)} / year`} />
        <DetailTab
          label="Insured"
          value={
            <span
              css={`
                text-transform: capitalize;
              `}
            >
              {members.join(", ")}
            </span>
          }
        />
      </div>
    </div>
  );
}

function ProductDetailsCardMobile({ cartItem }) {
  const { companies } = useCompanies();

  const {
    product: {
      name,
      insurance_type,
      company: { alias },
    },
    total_premium,
    premium,
    sum_insured,
    top_up_riders,
    addons,
    group: { id: groupCode },
  } = cartItem;
  const health_riders = useRider(groupCode).getSelectedRiders();
  const logoSrc = companies[alias].logo;

  const { journeyType } = useFrontendBoot();

  const displayRiders =
    journeyType === "top_up" ? top_up_riders : health_riders;

  return (
    <>
      <div
        css={`
          display: none;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          ${mobile} {
            display: block;
          }
        `}
      >
        <div
          css={`
            padding: 10px;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              padding-bottom: 10px;
              width: 100%;
              border-bottom: 1px solid #ddd;
            `}
          >
            <div
              css={`
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <img
                src={logoSrc}
                alt={name}
                css={`
                  width: 100%;
                `}
              />
            </div>
            <span
              css={`
                font-size: 16x;
                margin-left: 1em;
              `}
            >
              {name}
            </span>
          </div>
          <div
            css={`
              display: flex;
              margin-top: 10px;
            `}
          >
            <div
              css={`
                width: 50%;
                padding-right: 10px;
                border-right: 1px solid #ddd;
                margin-right: 10px;
              `}
            >
              <div
                css={`
                  display: flex;
                  gap: 10px;
                  justify-content: center;
                `}
              >
                <div
                  css={`
                    font-size: 10px;
                  `}
                >
                  Cover:
                </div>
                <div
                  css={`
                    font-size: 10px;
                  `}
                >
                  {amount(sum_insured)}
                </div>
              </div>
              {insurance_type.alias === "top_up" ? (
                <div
                  css={`
                    display: flex;
                    font-size: 10px;
                    gap: 10px;
                    justify-content: center;
                  `}
                >
                  <div>Premium:</div>
                  <div>{amount(premium)}</div>
                </div>
              ) : null}
            </div>
            <div
              css={`
                width: 50%;
              `}
            >
              <div
                css={`
                  display: flex;
                  justify-content: space-center;
                  gap: 10px;
                `}
              >
                <div
                  css={`
                    font-size: 10px;
                  `}
                >
                  Premium:
                </div>
                <div
                  css={`
                    font-size: 10px;
                  `}
                >
                  {amount(premium)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          css={`
            background: #f5f7f9;
            display: flex;

            flex-direction: column;
          `}
        >
          {displayRiders.map(rider => (
            <div
              css={`
                /* flex: 1; */
                padding: 3px;
                margin: 3px;
              `}
            >
              <span
                css={`
                  margin-right: 10px;
                  color: #419bf9;
                `}
              >
                <i class="far fa-check-circle"></i>
              </span>
              <span
                css={`
                  font-size: 14px;
                  @media (max-width: 500px) {
                    font-size: 11px;
                  }
                `}
              >
                {rider.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {addons.length > 0 ? (
        <div
          css={`
            margin-top: 37px;
          `}
        >
          <div
            css={`
              border-bottom: 1px solid #d5dce5;
              position: relative;
              margin-bottom: 20px;
            `}
          >
            <div
              css={`
                color: #419bf9;
                border-radius: 15px;
                border: 2px solid #419bf9;
                padding: 5px 10px;
                font-size: 11px;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                left: 50%;

                width: fit-content;
                background: white;
                font-weight: 900;
              `}
            >
              Add-Ons Coverages
            </div>
          </div>
          {addons.map(addon => (
            <div
              css={`
                display: none;
                border: 1px solid #ddd;
                border-radius: 12px;
                overflow: hidden;
                margin-top: 37px;
                ${mobile} {
                  display: block;
                }
              `}
            >
              <div
                css={`
                  padding: 10px;
                `}
              >
                <div
                  css={`
                    display: flex;
                    align-items: center;
                    padding-bottom: 10px;
                    width: 100%;
                    border-bottom: 1px solid #ddd;
                  `}
                >
                  <div
                    css={`
                      width: 50px;
                      height: 50px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <img
                      src={companies[addon.product.company.alias].logo}
                      alt={addon.product.name}
                      css={`
                        max-width: 100%;
                      `}
                    />
                  </div>
                  <span
                    css={`
                      font-size: 15x;
                      margin-left: 1em;
                    `}
                  >
                    {addon.product.name}
                  </span>
                </div>
                <div
                  css={`
                    display: flex;
                    margin-top: 10px;
                  `}
                >
                  <div
                    css={`
                      width: 50%;
                      padding-right: 10px;
                      border-right: 1px solid #ddd;
                      margin-right: 10px;
                    `}
                  >
                    <div
                      css={`
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                      `}
                    >
                      <div>Cover:</div>
                      <div>{amount(addon.sum_insured)}</div>
                    </div>
                    {insurance_type.alias === "top_up" ? (
                      <div
                        css={`
                          display: flex;
                          justify-content: space-between;
                          font-size: 12px;
                        `}
                      >
                        <div>Deductible:</div>
                        <div>{amount(sum_insured)}</div>
                      </div>
                    ) : null}
                  </div>
                  <div
                    css={`
                      width: 50%;
                    `}
                  >
                    <div
                      css={`
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                      `}
                    >
                      <div>Premium:</div>
                      <div>{amount(addon.total_premium)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

function ProductDetailsCard({ cartItem }) {
  const { companies } = useCompanies();

  const {
    colors: { primary_color: PrimaryColor },
  } = useTheme();

  const { journeyType } = useFrontendBoot();

  const {
    product: {
      name,
      company: { alias },
    },
    total_premium,
    premium,
    tenure,
    sum_insured,
    top_up_riders,
    group: { id: groupCode },
  } = cartItem;

  const health_riders = useRider(groupCode).getSelectedRiders();

  const logoSrc = companies[alias].logo;

  const displayRiders =
    journeyType === "top_up" ? top_up_riders : health_riders;

  return (
    <div
      css={`
        border: 1px solid #d5dce5;
        padding: 10px 20px;
        border-radius: 10px;
        ${mobile} {
          display: none;
        }
      `}
    >
      <div
        css={`
          display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
          display: -ms-flexbox; /* TWEENER - IE 10 */
          display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
          display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
          justify-content: space-between !important;
        `}
      >
        <div
          css={`
            width: 40%;
            display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
            display: -ms-flexbox; /* TWEENER - IE 10 */
            display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
            display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
            align-items: center;
          `}
        >
          <div
            css={`
              width: 80%;
              height: 45px !important;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-right: 10px;
              margin-bottom: 0px;

              & img {
                object-fit: contain;
                width: 100%;
                height: 100%;
              }
            `}
          >
            <img src={logoSrc} alt={alias} />
          </div>

          <div>
            <span
              css={`
                margin-top: 0px;
                font-weight: 900;
              `}
            >
              {name}
            </span>
          </div>
        </div>

        <div
          css={`
            width: 60%;
            display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
            display: -ms-flexbox; /* TWEENER - IE 10 */
            display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
            display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
          `}
        >
          <div
            css={`
              display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
              display: -ms-flexbox; /* TWEENER - IE 10 */
              display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
              display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
              align-items: center;
              flex: 1;
              -webkit-flex: 1;
              justify-content: center;
            `}
          >
            <span
              css={`
                color: #000;
                font-size: 11px;
                line-height: 21px;
                @media (max-width: 900px) {
                  font-size: 13px;
                }
                .edit_css_prod {
                  @media (max-width: 900px) {
                    font-size: 13px !important;
                  }
                }

                .si_text {
                  font-size: 15px;
                  font-weight: 900;
                  color: #505f79;
                }
              `}
            >
              Cover
              <br />
              <span className="edit_css_prod si_text">
                {numberToDigitWord(sum_insured)}
              </span>
            </span>
          </div>

          <div
            css={`
              border-left: 1px solid #ddd;
              display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
              display: -ms-flexbox; /* TWEENER - IE 10 */
              display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
              display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
              flex: 1;
              -webkit-flex: 1;
              align-items: center;
              justify-content: center;
            `}
          >
            <div>
              <span
                css={`
                  color: #000;
                  font-size: 11px;
                  line-height: 21px;
                  @media (max-width: 900px) {
                    font-size: 13px;
                  }
                  .edit_css_prod {
                    @media (max-width: 900px) {
                      font-size: 13px !important;
                    }
                  }

                  .si_text {
                    font-size: 15px;
                    font-weight: 900;
                    color: #505f79;
                  }
                `}
              >
                Premium
                <br />
                <span className="edit_css_prod si_text">
                  {amount(premium)} /{" "}
                  {tenure === 1 ? "year" : `${tenure} years`}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {displayRiders.length > 0 ? <hr /> : null}
      <div class="row w-100 flex-row">
        {displayRiders.map((rider, index) => (
          <div
            key={index}
            css={`
              margin: 2px;
              width: fit-content;
              font-size: 14px;
              width: 48% !important;
            `}
          >
            <span
              css={`
                color: ${PrimaryColor};
              `}
            >
              <AiOutlineCheckCircle />
            </span>{" "}
            <span
              css={`
                font-weight: normal !important;
                color: #000;
                font-size: 11px;
                margin-left: 3px;
              `}
            >
              {rider?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCartPopup({ propsoalPageLink, onClose = () => {} }) {
  const {
    colors: { primary_color: PrimaryColor },
  } = useTheme();

  const history = useHistory();

  const {
    data: {
      data: { name },
    },
  } = useGetEnquiriesQuery();
  const firstName = getFirstName(name);

  const { groupCode } = useParams();

  let {
    data: {
      data: { groups },
    },
  } = useGetEnquiriesQuery();

  const currentGroup = groups.find(group => group.id === +groupCode);

  groups = groups.filter(group => group.type === currentGroup.type);

  const { data, isLoading, isUninitialized, isFetching } = useGetCartQuery();

  const cart = data?.data;

  const { getCartTotalPremium } = useCart();

  const allAddons = cart?.map(singleCartEntry => singleCartEntry.addons).flat();

  const getCartEntry = groupId => {
    if (data?.data) {
      return data?.data?.find(cartEntry => cartEntry?.group?.id === groupId);
    }
  };

  const disableButton = groups
    ?.map(group => getCartEntry(group?.id))
    ?.includes(undefined);

  if (isLoading || isUninitialized || isFetching)
    return (
      <PopUpWithCloseButton
        title={
          <div>
            <span
              css={`
                text-transform: capitalize;
                ${mobile} {
                  /* display: none; */
                }
              `}
            >
              Hi {firstName}, take a minute and review your cart before you
              proceed
            </span>
          </div>
        }
        onClose={() => handleCloseClick(PrimaryColor)}
      >
        <CardSkeletonLoader />
      </PopUpWithCloseButton>
    );

  const handleCloseClick = PrimaryColor => {
    onClose();
  };

  const totalPremium = getCartTotalPremium();

  return (
    <PopUpWithCloseButton
      title={
        <div>
          <span
            css={`
              text-transform: capitalize;
              ${mobile} {
                /* display: none; */
              }
            `}
          >
            Hi {firstName}, take a minute and review your cart before you
            proceed
          </span>
        </div>
      }
      onClose={() => handleCloseClick(PrimaryColor)}
    >
      <div
        css={`
          padding: 15px;
          padding-top: 0;
          ${mobile} {
            /* display: none; */
          }
        `}
      >
        {groups.map(groupCode => (
          <ProductCard
            key={groupCode?.id}
            groupCode={groupCode.id}
            group={groupCode}
            onClose={onClose}
            cartEntry={getCartEntry(groupCode.id)}
            link={propsoalPageLink}
          />
        ))}

        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 30px;

            ${mobile} {
              flex-direction: column;
              border-top: 1px dashed #ddd;
              padding-top: 10px;
            }
          `}
        >
          {
            <div
              css={`
                font-weight: 900;

                ${mobile} {
                  display: flex;
                  justify-content: space-between;
                  width: 100%;
                }
              `}
            >
              <div
                css={`
                  color: #505f79;
                  font-size: 13px;
                  ${mobile} {
                    font-size: 16px;
                    font-weight: 600;
                  }
                `}
              >
                Total Premium :
              </div>
              <div
                css={`
                  color: var(--abc-red);
                  font-size: 20px;
                  text-align: left;
                  ${mobile} {
                    font-size: 18px;
                  }
                `}
              >
                {amount(premiumWithAddons(totalPremium, allAddons))}
              </div>
            </div>
          }

          <Button
            disabled={disableButton}
            onClick={() => {
              window.location.href = `${
                window.location.origin + propsoalPageLink
              }`;
            }}
          >
            Proceed to Proposal
          </Button>
        </div>
      </div>
    </PopUpWithCloseButton>
  );
}

export default ReviewCartPopup;

function ProductCard({ groupCode, onClose, cartEntry, group, link }) {
  const product = cartEntry;

  const { getMembersText } = useMembers();

  const reducedAddOns = product?.addons?.reduce((reducedAddOns, addon) => {
    const {
      product: {
        id,
        insurance_type: { alias },
      },
      members,
    } = addon;
    const key = id + alias;
    if (!reducedAddOns[key]) {
      return { ...reducedAddOns, [key]: { ...addon } };
    }
    return {
      ...reducedAddOns,
      [key]: {
        ...reducedAddOns[key],
        members: members.some(member =>
          reducedAddOns[key]["members"].includes(member),
        )
          ? reducedAddOns[key]["members"]
          : [...reducedAddOns[key]["members"], ...members],
      },
    };
  }, {});

  return (
    <>
      <div
        css={`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <GradientTitle title={getMembersText({ id: groupCode })} />
      </div>
      {product ? (
        <div
          css={`
            margin-bottom: 20px;
            ${mobile} {
              margin-top: 10px;
            }
          `}
        >
          <ProductDetailsCard cartItem={product} />
          <ProductDetailsCardMobile cartItem={product} />
        </div>
      ) : (
        <ProceedWithoutPlan handleClose={onClose} link={link} group={group} />
      )}
      {product?.addons.length > 0 && (
        <div
          css={`
            ${mobile} {
              display: none;
            }
          `}
        >
          <GradientTitle title="Add-on Coverages (Valid only 1 year)" />
          <Row
            css={`
              padding: 0 15px;
            `}
          >
            {Object.keys(reducedAddOns).map(addOnKey => (
              <AddOnDetailsCard
                key={addOnKey}
                addOn={reducedAddOns[addOnKey]}
              />
            ))}
          </Row>
        </div>
      )}
    </>
  );
}

function ProceedWithoutPlan({ group, link, handleClose = () => {} }) {
  const {
    colors: { primary_color: PrimaryColor },
  } = useTheme();

  const history = useHistory();

  const [groupId, setGroupId] = useState(skipToken);

  const { isLoading, isSuccess } = useDeleteGroupQuery(groupId);

  const handleContinue = () => {
    setGroupId(group.id);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push(link);
    }
  }, [isSuccess]);

  return (
    <div className="d-flex align-items-center justify-content-between mb-3 mx-1">
      <p className="m-0">
        Are you sure you want to proceed without adding plan?
      </p>
      <div
        className="d-flex"
        css={`
          gap: 1rem;
        `}
      >
        <button
          className="py-1 px-3"
          disabled={isLoading}
          css={`
            border-radius: 2px;
            background-color: ${PrimaryColor};
            color: #fff;
            &:disabled {
              background-color: #ccc;
            }
          `}
          onClick={handleContinue}
        >
          Yes
        </button>
        <button
          className="py-1 px-3"
          css={`
            border-radius: 2px;
            background-color: ${PrimaryColor};
            color: #fff;
          `}
          onClick={handleClose}
        >
          No
        </button>
      </div>
    </div>
  );
}

function GradientTitle({ title = "" }) {
  return (
    <span
      className="text_title_filter p_modal_title_bg_filters_product"
      style={{
        textTransform: "capitalize",
        width: "max-content",
        fontSize: "15px",
        marginBottom: "20px",
        fontWeight: "900",
      }}
      css={`
        @media (max-width: 768px) {
          margin-top: 20px;
          margin-bottom: 10px !important;
        }
      `}
    >
      <span
        css={`
          width: 5px;
          height: 25px;
          position: absolute;
          background-color: #2cd44a;
          border-radius: 5px;
        `}
      ></span>
      <span
        css={`
          margin-left: 10px;
        `}
      >
        {title}
      </span>
    </span>
  );
}

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;

  ${mobile} {
    display: block !important;
  }
`;

const ModalTitle = styled.h5`
  // font-family: "PFEncoreSansProblck";
  margin: 0 17px;
  margin-bottom: 0;
  line-height: 1.5;
  color: #000;
  font-size: 22px;
  font-weight: 900;
  width: 80%;
`;
