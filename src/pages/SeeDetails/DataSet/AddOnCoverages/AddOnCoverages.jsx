import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";
//import AddOnsCoveragesSection from "../../../ProductDetails/components/AddOnsCoveragesSection/AddOnsCoveragesSection";
import CustomizeYourPlan from "../../../ProductDetails/components/CustomizeYourPlan";
// import {
//   addSelectedRider,
//   removeSelectedRider,
//   updateCartItem,
// } from "../../../../QuotesPage/quotePage.slice";
// import { getRidersApi } from "../../../../QuotesPage/ServiceApi/serviceApi";
import { getRiders } from "../../SeeDetails";
import "./AddOnCoverage.scss";
import "styled-components/macro"

/* eslint-disable jsx-a11y/anchor-is-valid */

// export const getRiders = async (
//   { productId, sum_insured },
//   callback = () => {},
// ) => {
//   try {
//     const response = await getRidersApi({ productId, sum_insured });
//     callback(response.data);
//   } catch (error) {
//     alert(error);
//     console.error(error);
//   }
// };

const AddOnCoverages = ({
  ActiveMainTab,
  // riders,
  quote,
  sum_insured,
  // product,
  tenure,
  riders,
  setAddedRiders = () => { },
  selectedRiders = [],
  selectedAddOns = [],
  addAddOn = () => { },
  addRider = () => { },
}) => {
  const { loading } = useSelector(state => state.seeDetails);

  const handleAddRider = riderToAdd =>
    setAddedRiders(prevRiders => [...prevRiders, riderToAdd]);

  const handleRemoveRider = riderToRemove =>
    setAddedRiders(prevRiders =>
      prevRiders.filter(rider => rider.name !== riderToRemove.name),
    );

  useEffect(() => { }, [riders]);

  // const { selectedGroup } = useSelector(({ quotePage }) => quotePage);

  const { groupCode } = useParams();

  const sumInsuredIndex = quote.sum_insured.indexOf(sum_insured);

  const product = {
    premium: quote.premium[sumInsuredIndex],
    sum_insured: sum_insured,
    tax_amount: quote.tax_amount[sumInsuredIndex],
    tenure: quote.tenure[sumInsuredIndex],
    total_premium: quote.total_premium[sumInsuredIndex],
    product: {
      ...quote.product,
      company: {
        alias: quote.company_alias,
      },
    },
    health_riders: [],
    addons: [],
  };

  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{
        position: "relative",
        display: ActiveMainTab ? "flex" : "none",
        left: ActiveMainTab ? "0px" : "1296px",
        top: "0px",
        padding: "0 70px",
      }}
      css={`justify-content: center;`}
    >
      <div className="col-12 box_shadow_box_without"
        css={`
             @media (max-width: 767px) {
               display: block;
               padding:0px;
             }
           `}
      >
        <div className="product-showcase">
          {/* <div className="plan_a_t_addon">
            <h2 className="title_h4 title_h4_title ">Customize Your Plan</h2>
          </div> */}
          {/* <p className="color_gray_sub mb-15 title_h4_title">
            Save Upto 20% on your premium
          </p> */}
          <div className="row">
            {loading ? (
              <SpinLoader />
            ) : (
              <form className="form cf">
                {/* <section className="plan cf plan_cf_g_m">
                  <div className="row">
                    {loading ? (
                      <CardSkeletonLoader />
                    ) : riders && riders.length ? (
                      riders.map(rider => (
                        <RiderCard
                          {...rider}
                          key={rider.name}
                          handleCheckboxChange={evt => {
                            if (evt.target.checked) {
                              handleAddRider(rider);
                            } else {
                              handleRemoveRider(rider);
                            }
                          }}
                        />
                      ))
                    ) : (
                      <div>No Riders Found</div>
                    )}
                  </div>
                </section> */}
                <CustomizeYourPlan groupCode={groupCode} product={product} seeDetails={quote.product.id} />
                {/* <AddOnsCoveragesSection
                  groupCode={groupCode}
                  product={product}
                /> */}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function RiderCard({
  id,
  name,
  description,
  net_premium,
  selected,
  handleCheckboxChange = () => { },
  ...props
}) {
  const isProductDetailsPage = useRouteMatch("/productdetails");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = evt => {
    setIsLoading(true);
    handleCheckboxChange(evt, setIsLoading);
  };
  return (
    <div className="col-md-6" {...props}>
      {isLoading && isProductDetailsPage ? (
        <p>Updating...</p>
      ) : (
        <>
          <input
            type="checkbox"
            id={name}
            checked={selected}
            onChange={handleChange}
            readOnly
          />
          <label
            className="free-label four col rider-card-label"
            htmlFor={name}
          >
           
            <div className="row">
              <div className="col-md-7">
                <p className=" addon_plan_details_t_c_c">{name}</p>
                <p className={`plan_table_add_modal_p text-over`}>
                  {description}
                </p>
              </div>
              <div className="col-md-5">
                <h4 className="title text-right box_btn mb-4">
                  <span className="btn p_compare_price_modal p_compare_margin_check btn_addon">
                    <i className="fa fa-inr"></i> {net_premium}
                  </span>
                </h4>
              </div>
            </div>
          </label>
        </>
      )}
    </div>
  );
}

export default AddOnCoverages;
