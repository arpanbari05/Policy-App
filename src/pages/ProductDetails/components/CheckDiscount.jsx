import { useDispatch, useSelector } from "react-redux";
import CardSkeletonLoader from "./../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { useCallback, useEffect, useState } from "react";
import FeatureSection from "./FeatureSection/FeatureSection";
import { useCartProduct } from "../../Cart";
import ErrorMessage from "../../../components/Common/ErrorMessage/ErrorMessage";
import "styled-components/macro";
import { mobile, small } from "../../../utils/mediaQueries";
import { getAdditionalDiscounts } from "../serviceApi";
import { useParams } from "react-router";
import { amount } from "./ReviewCart";
import { AddOnBuyButton } from "./AddOnsCoveragesSection/AddOnsCoveragesSection";
import { getProductDiscount } from "../../quotePage/quote.slice";

const CheckDiscount = ({ groupCode }) => {
  const dispatch = useDispatch();

  const {
    memberGroups,
    proposerDetails: { members: membersWithAge },
  } = useSelector((state) => state.greetingPage);

  const members = memberGroups[groupCode].join(",");

  const [discounts, setDiscounts] = useState([]);
  const [additionalDiscounts, setAdditionalDiscounts] = useState([]);

  const [isLoading, setIsloading] = useState(true);
  const [discountError, setDiscountError] = useState(false);

  const selectedQuotes = useSelector(({ cart }) => cart);

  const { product, sum_insured, tenure } = selectedQuotes[groupCode];

  const fetchDiscount = useCallback(() => {
    if (members) {
      // setIsloading(true);
      setDiscountError(false);
      dispatch(
        getProductDiscount(
          {
            product_id: product.id,
            sum_insured,
            member: members,
            group: groupCode,
          },
          (discounts, err) => {
            setIsloading(false);
            if (err) {
              setDiscountError(err);
              return;
            }
            setDiscounts(discounts);
            setDiscountError(false);
          }
        )
      );
    }
  }, [dispatch, groupCode, members, product.id, sum_insured]);

  const fetchAdditionalDiscounts = useCallback(() => {
    if (members) {
      getAdditionalDiscounts({
        groupCode,
        product_id: product.id,
        sum_insured,
        tenure,
      }).then((res) => setAdditionalDiscounts(res?.data?.data));
    }
  }, [groupCode, members, product.id, sum_insured, tenure]);

  useEffect(() => {
    fetchDiscount();
    fetchAdditionalDiscounts();
  }, [fetchAdditionalDiscounts, fetchDiscount, membersWithAge]);

  const handleDiscountsRetry = () => fetchDiscount();

  const { updateProductRedux, product: cartProduct } =
    useCartProduct(groupCode);

  const selectedTenure = parseInt(cartProduct.tenure);

  const handleTenureClick = (item) => {
    updateProductRedux({
      ...cartProduct,
      tenure: item.tenure,
      total_premium: item.total_premium,
      service_tax: item.tax_amount,
      premium: item.premium,
    });
  };

  return (
    <FeatureSection
      heading="Check Discounts"
      subHeading="Save Upto 20% on your premium"
      id="check-discounts"
    >
      {isLoading ? (
        <CardSkeletonLoader noOfCards={1} />
      ) : (
        <>
          {discountError && (
            <div
              css={`
                padding: 0;
              `}
            >
              <ErrorMessage
                title={
                  <div>
                    <span>Something went wrong while getting Discounts</span>
                    <button onClick={handleDiscountsRetry}>Retry</button>
                  </div>
                }
              />
            </div>
          )}
          {!discountError && (
            <WrapWithTitle title="Choose Multiyear Options">
              <div
                css={`
                  display: flex;
                  justify-content: space-around;
                  align-items: center;

                  ${mobile} {
                    flex-direction: column;
                  }
                `}
              >
                {discounts?.map((item) => {
                  console.log(item,"item")
                  return (
                    <div
                      key={item?.total_premium}
                      style={{ margin: "0" }}
                      onClick={() => handleTenureClick(item)}
                      css={`
                        ${mobile} {
                          width: 100%;
                        }
                      `}
                    >
                      <input
                        type="radio"
                        id={item?.total_premium}
                        name="discout"
                        value={item?.total_premium}
                        defaultChecked={selectedTenure === item.tenure}
                        className="d-none"
                      />
                      <label
                        htmlFor={item?.total_premium}
                        css={`
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: space-around;
                          background: white;
                          border-radius: 15px;
                          padding: 1rem;
                          padding-bottom: 0.7rem;
                          text-align: center;
                          position: relative;
                          width: 218px;
                          border: 2px solid;
                          border-color: ${selectedTenure === item.tenure
                            ? "#0a87ff"
                            : "#e5e5e5"};

                          @media (max-width:768px){
                            width:100% !important;
                            margin:10px 0px;
                          }

                          /* &::after { */
                            
                          

                            /* @media (min-width: 769px) and (max-width: 900px) {
                              left: 50%;
                              right: unset;
                            } */

                            /* ${mobile} {
                              height: 21px;
                              width: 21px;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              padding: 0;
                              font-size: 10px;
                              content: ${selectedTenure === item.tenure
                                ? '"\f00c"'
                                : '""'};
                              background: ${selectedTenure === item.tenure
                                ? "#de9b9e"
                                : "#fff"};
                              box-shadow: ${selectedTenure === item.tenure
                                ? "0px 2px 5px -2px rgb(0 0 0 / 25%)"
                                : "none"};
                              top: 50%;
                              right: 3%;
                              transform: translate(-50%, -50%);
                              border: 1px solid;
                              border-color: ${selectedTenure === item.tenure
                                ? "#fff"
                                : "#ddd"};
                            } */
                          /* } */

                          /* ${mobile} {
                            margin-bottom: 16px;
                            width: 100%;
                          }
                          ${small} {
                            border-radius: 11px;
                          } */
                        `}
                      >{
                        selectedTenure === item.tenure ?
                        (
                          <span css={`
                     font-size: 11px;
                            position: absolute;
                            bottom: 11px;
                            right: 11px;
                            transform: translateX(-50%);
                            height: 30px;
                            width: 30px;
                            line-height: 30px;
                            text-align: center;
                            border-radius: 50%;
                            background: #0a87ff;
                            box-shadow: 0px 2px 5px -2px rgb(0 0 0 / 25%);
                            font-family: "font-awesome";
                            border: 2px solid #fff;
                            color: #fff;
                            border: 2px solid #e4e7ec;
                      `}>
                      <i class="fas fa-check"></i>
                      </span>
                        ):""
                      }
                      
                      {
                        item?.tenure !== 1?(
                          <div
                          css={`
                            width: 100px;
                            height: 22px;
                            background: #ffcb00;
                            border-bottom-left-radius: 300px;
                            border-top-right-radius: 180px;
                            position: absolute;
                            top: -2px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-weight:900;
                            color: #253858;
                            font-size: 10px;
                            right: -2px;
                          `}
                        >
                        {
                          item?.tenure !== 3?"7.5% off":"10% off"
                        }
                         
                        </div>
                        ):<></>
                      }
                        
                        <span
                          css={`
                            font-size: 15px;
                            font-weight: 600;
                            color: #253858;
                            margin-bottom: 8px;
                            @media (max-width:768px){
                              color: #0a87ff;
    background-color: #eff7ff;
    border-radius:20px;
    padding: 2px 5px;
                            }
                          `}
                        >
                          {item?.tenure >= 2
                            ? `${item?.tenure} Years`
                            : `${item?.tenure} Year`}
                        </span>
                        <span
                          className="addon_p_g_r"
                          css={`
                            display: flex;
                            align-items: center;
                            font-size: 19px;
                          `}
                        >
                          <b
                            css={`
                              ${mobile} {
                                font-size: 16px;
                              }
                              @media (min-width: 768px) and (max-width: 900px) {
                                font-size: 23px;
                              }
                            `}
                          >
                            ₹{" "}
                            {parseInt(item?.total_premium).toLocaleString(
                              "en-IN"
                            )}
                          </b>
                          <span
                            css={`
                              display: none;
                              /* ${mobile} {
                                display: inline;
                                font-size: 14px;
                                margin-left: 10px;
                                color: #666;
                              }

                              ${small} {
                                font-size: 11px;
                              } */
                            `}
                          >
                            Premium
                          </span>
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </WrapWithTitle>
          )}
          {additionalDiscounts?.length > 0 ? (
            <WrapWithTitle title="Additional Discount">
              {additionalDiscounts.map((additionalDiscount) => (
                <AdditionalDiscount additionalDiscount={additionalDiscount} />
              ))}
            </WrapWithTitle>
          ) : null}
        </>
      )}
    </FeatureSection>
  );
};

function AdditionalDiscount({ additionalDiscount }) {
  const { name, description, percent, alias } = additionalDiscount;
  const { groupCode } = useParams();
  const { product, updateProductRedux } = useCartProduct(groupCode);

  const { total_premium } = product;

  const discountAmount = (parseInt(total_premium) * parseInt(percent)) / 100;

  const premiumAfterDiscount = parseInt(
    parseInt(total_premium) - discountAmount
  );

  const removeDiscount = () => {
    updateProductRedux({
      ...product,
      discounts: product.discounts.filter(
        (discount) => discount.alias !== alias
      ),
    });
  };

  const handleApply = () => {
    if (
      product.discounts &&
      product.discounts.some((discount) => discount.alias === alias)
    ) {
      removeDiscount();
      return;
    }
    updateProductRedux({
      ...product,
      discounts: product.discounts
        ? [...product.discounts, additionalDiscount]
        : [additionalDiscount],
    });
  };

  return (
    <div
      css={`
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
      `}
    >
      <div>
        <p
          css={`
            font-weight: 900;
            font-size: 18px;

            ${small} {
              font-size: 12px;
              line-height: 14px;
            }
          `}
        >
          {name}
        </p>
        <p
          css={`
            color: #0a87ff;
            background-color: #eff7ff;
            padding: 3px 10px;
            margin-top: 6px;

            ${small} {
              font-size: 9px;
              padding: 3px 6px;
            }
          `}
        >
          {description.replace("{amount}", amount(discountAmount))}
        </p>
      </div>
      <button
        css={`
          background-color: #0a87ff;
          border-radius: 6px;
          padding: 12px 30px;
          color: #fff;
        `}
        onClick={handleApply}
        selected={
          product.discounts &&
          product.discounts.some((discount) => discount.alias === alias)
        }
        className="btn"
      >
        Apply
      </button>
    </div>
  );
}

function WrapWithTitle({ title, children }) {
  return (
    <div
      css={`
        padding: 10px 30px 30px;
        border-radius: 20px;
        border: 1px solid #dfdfdf;
        margin-bottom: 1rem;

        ${mobile} {
          border: none;
          padding: 0;
        }
      `}
    >
      <div
        css={`
          ${mobile} {
            border: none;
            position: relative;
          }
        `}
      >
        <h3
          css={`
            font-size: 17px;
            color: #68758b;
            font-weight: 600;
            margin: auto;
            margin-bottom: 30px;
            text-align: center;

            ${mobile} {
              margin-bottom: 10px;
              position: relative;
              font-size: 16px;
              width: max-content;
              padding: 0 10px;
              background-color: #fff;
              z-index: 10;
            }

            ${small} {
              font-size: 12px;
            }
          `}
        >
          {title}
        </h3>
        <div
          css={`
            display: none;
            ${mobile} {
              display: block;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              height: 1px;
              width: 100%;
              background-color: #ddd;
            }
          `}
        />
      </div>
      {children}
    </div>
  );
}

export default CheckDiscount;
