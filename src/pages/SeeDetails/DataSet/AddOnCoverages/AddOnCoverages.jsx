import { useEffect, useState,useCallback} from "react";
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
import { getAbhiRiders, getRiders } from "../../SeeDetails";
import "./AddOnCoverage.scss";
import "styled-components/macro"
import RiderCard from "../../../../components/Common/RiderCard/RiderCard";
import CardSkeletonLoader from "../../../../components/Common/card-skeleton-loader/CardSkeletonLoader";
import { useCartProduct } from "../../../Cart";

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
  sum_insured,setRiders,
  // product,
  tenure,
  riders,
  setAddedRiders = () => { },
  selectedAddOns = [],
  addAddOn = () => { },
  addRider = () => { },
}) => {

  console.log(riders,'23g32hg')
  
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
  const { loading } = useSelector(state => state.seeDetails);
  const [isRidersLoading, setIsRidersLoading] = useState(true);
  const [isAbhiRidersLoading, setIsAbhiRidersLoading] = useState(false);
  const [ridersError, setRidersError] = useState(false);
  const [selectedRiders, setSelectedRiders] = useState({});
  const { groupCode } = useParams();
  const { updateProductRedux, product: cartItem } = useCartProduct(
    groupCode,
    product,
  );
  const { health_riders } = cartItem;
  const handleAddRider = riderToAdd =>
    setAddedRiders(prevRiders => [...prevRiders, riderToAdd]);

  const handleRemoveRider = riderToRemove =>
    setAddedRiders(prevRiders =>
      prevRiders.filter(rider => rider.name !== riderToRemove.name),
    );

    const handleRiderChange = ({
      rider,
      isRiderSelected,
      hasOptions = false,
    }) => {
      // const { health_riders } = cartItem;
      // const newRiders =
      //   !hasOptions && isRiderSelected
      //     ? [...health_riders, rider]
      //     : hasOptions && isRiderSelected
      //     ? health_riders.filter(
      //         health_rider => health_rider.rider_id !== rider.rider_id,
      //       )
      //     : health_riders.filter(
      //         health_rider => health_rider.rider_id !== rider.rider_id,
      //       );
  
      let newRiders;
      if (!hasOptions && isRiderSelected) {
        newRiders = [...health_riders, rider];
      } else if (hasOptions && isRiderSelected) {
        console.log("gege3312", rider, hasOptions);
        const temp = health_riders.filter(
          health_rider => health_rider.rider_id !== rider.rider_id,
        );
        newRiders = [
          ...temp,
          {
            ...rider,
            option_selected: {
              [hasOptions.key]: hasOptions.selectedOption,
            },
          },
        ];
        const tempObj = { ...selectedRiders };
        tempObj[hasOptions.key] = hasOptions.selectedOption;
        setSelectedRiders(tempObj);
      } else {
        const temp = health_riders.filter(
          health_rider => health_rider.rider_id !== rider.rider_id,
        );
  
        let temp2 = [];
        temp.forEach(data => {
          if (data.parent_rider) {
            temp.some(data2 => data2.alias === data.parent_rider) &&
              temp2.push(data);
          } else {
            temp2.push(data);
          }
        });
        newRiders = [...temp2];
      }
     
      // updateProductRedux({
      //   ...cartItem,
      //   health_riders: newRiders,
      // });
    };
  
    useEffect(() => {
      const keys = Object.keys(selectedRiders);
      const string = keys.reduce((a, b) => a + `&${b}=${selectedRiders[b]}`, "");
      fetchAbhiRiders(string);
    }, [selectedRiders]);

  // const { selectedGroup } = useSelector(({ quotePage }) => quotePage);






  const fetchAbhiRiders = useCallback(
    string => {
      if (product) {
        // setIsRidersLoading(true);
        setIsAbhiRidersLoading(true);
        setRidersError(false);
        getAbhiRiders(
          {
            productId:  quote?.product?.id,
            sum_insured,
            tenure,
            group: groupCode,
            string,
          },
          (riders, err) => {
            setIsRidersLoading(false);
            if (err) {
              setRidersError(err);
              return;
            }
            //make premium != 0
            setRiders(
              riders.data
                .filter(rider => rider.total_premium !== 0 || rider.options)
                .map(rider => ({ ...rider, rider_id: rider.id })),
            );
            setRidersError(false);
            setIsAbhiRidersLoading(false);
          },
        );
      }
    },
    [groupCode, product, sum_insured, tenure],
  );
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
          <div className="row" >
            {loading ? (
              <SpinLoader />
            ) : (
              <form className="form cf">
                <section className="plan cf plan_cf_g_m">
                  <div className="row"
                   css={`
                   justify-content: space-between
                   `}>
                    {loading ? (
                      <CardSkeletonLoader />
                    ) : riders && riders?.data?.length ? (
                      riders?.data?.map((rider) => (
                        <RiderCard
                        productPage={false}
                        key={rider.name + rider.total_premium}
                        rider={rider}
                        handleRiderChange={handleRiderChange}
                        isMandatory={rider.is_mandatory}
                        isRiderSelected={rider.is_mandatory || health_riders.some(
                          health_rider => health_rider.rider_id === rider.rider_id,
                        )}
                        health_riders={health_riders}
                        selectedRiders={selectedRiders}
                        isAbhiRidersLoading={isAbhiRidersLoading}
                        />
                      ))
                    ) : (
                      <div>No Riders Found</div>
                    )}
                  </div>
                </section>
                {/* <CustomizeYourPlan groupCode={groupCode} product={product} seeDetails={quote.product.id} /> */}
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

// export function RiderCard({
//   id,
//   name,
//   description,
//   net_premium,
//   selected,
//   handleCheckboxChange = () => { },
//   ...props
// }) {
//   const isProductDetailsPage = useRouteMatch("/productdetails");
//   const [isLoading, setIsLoading] = useState(false);
//   const handleChange = evt => {
//     setIsLoading(true);
//     handleCheckboxChange(evt, setIsLoading);
//   };
//   return (
//     <div className="col-md-6" {...props}>
//       {isLoading && isProductDetailsPage ? (
//         <p>Updating...</p>
//       ) : (
//         <>
//           <input
//             type="checkbox"
//             id={name}
//             checked={selected}
//             onChange={handleChange}
//             readOnly
//           />
//           <label
//             className="free-label four col rider-card-label"
//             htmlFor={name}
//           >
           
//             <div className="row">
//               <div className="col-md-7">
//                 <p className=" addon_plan_details_t_c_c">{name}</p>
//                 <p className={`plan_table_add_modal_p text-over`}>
//                   {description}
//                 </p>
//               </div>
//               <div className="col-md-5">
//                 <h4 className="title text-right box_btn mb-4">
//                   <span className="btn p_compare_price_modal p_compare_margin_check btn_addon">
//                     <i className="fa fa-inr"></i> {net_premium}
//                   </span>
//                 </h4>
//               </div>
//             </div>
//           </label>
//         </>
//       )}
//     </div>
//   );
// }

export default AddOnCoverages;
