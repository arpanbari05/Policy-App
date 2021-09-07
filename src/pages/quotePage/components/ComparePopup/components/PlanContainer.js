import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeQuotesForCompare } from "../../../quote.slice";

const PlanContainer = ({ id, customClassName }) => {
  const { quotes } = useSelector((state) => state.quotePage);

  var quoteData;
  quotes?.map((quote) => {
    quote?.map((data) => {
      if (id === `${data.product.id}${data.sum_insured}`) {
        quoteData = data;
      }
    });
  });

  const dispatch = useDispatch();

  const { product, sum_insured: cover, logo: IcLogo } = quoteData || {};

  return (
    <>
      {" "}
      {product?.name ? (
        <div className="quotes_compare_plan_name">
          <div className="quotes_compare_image">
            <img
              src={IcLogo}
              alt={"temp"}
              className="quotes_img_compare1"
              layout="fill"
            />
          </div>
          <div className="quotes_compare_span_plan_name">
            <span className="compare_plan_name2">{product.name}</span>
            <div className="cover_compare">
              <span>
                Cover: <i className="fa fa-inr"></i> {cover}
              </span>
            </div>
          </div>
          <div className="div_remove_compare">
            <span
              className="span_cross plan_add_close_btn"
              onClick={() => dispatch(removeQuotesForCompare(id))}
            >
              x
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`quotes_compare_plan_add ${customClassName}`}
          id="compare_one_cart_item"
        >
          <span className="quotes_compare_span_add_plan">Add a Plan</span>
        </div>
      )}
    </>
  );
};

export default PlanContainer;
