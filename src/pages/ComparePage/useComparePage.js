import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuotes, setFilters } from "../quotePage/quote.slice";

import {
  getCompare,
  removeFeature,
  requestDownload,
  requestDownloadSuccess,
  sendEmailAction,
  setShouldNotFetch,
  setShoutGetCompare,
  updateQuotes,
} from "../ComparePage/compare.slice";
import { getFeatures, resetFeature } from "./compare.slice";
import { setQuotesForCompare } from "../quotePage/quote.slice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router";
import { removeQuotesForCompare } from "../quotePage/quote.slice";
import { useFrontendBoot } from "../../customHooks";

const useComparePage = () => {
  const dispatch = useDispatch();

  const { groupCode } = useParams();
  const {
    quotesForCompare,
    quotes,
    filterQuotes: QuotesToAdd,
  } = useSelector(state => state.quotePage);

  const {
    loading,
    quotes: mergedQuotes,
    emailStatus,
    discount,
    shoutGetCompare,
    shouldNotFetch,
  } = useSelector(state => state.comparePage);

  const { memberGroups, proposerDetails } = useSelector(
    state => state.greetingPage,
  );

  const [hideCells, setHideCells] = useState([]);
  const [showDiffCbx, setshowDiffCbx] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [show, setShow] = useState(false);

  // state to display/hide mobile card add plan
  const [showM, setShowM] = useState(false);
  const [selectedAddPlan, setSelectedAddPlan] = useState();
  const [mergedCover, setMergedCover] = useState([]);
  const [showBuyNowPopup, setShowBuyNowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const handleDownload = () => {
    dispatch(requestDownload());
    download();
  };

  const imageSend = email => {
    const input = document.getElementById("printCompare");

    html2canvas(input, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      dispatch(sendEmailAction({ email, image: imgData, group_id: groupCode }));
    });
  };

  const imageSendM = email => {
    const input = document.getElementById("printCompareM");

    html2canvas(input, {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      dispatch(sendEmailAction({ email, image: imgData, group_id: groupCode }));
    });
  };

  const download = () => {
    const input = document.getElementById("printCompare");

    html2canvas(
      input,
      { useCORS: true },
      {
        scrollX: 0,
        scrollY: -window.scrollY,
        useCORS: true,
      },
    ).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imgProps.height * width) / imgProps.width;

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save("compare.pdf");
      dispatch(requestDownloadSuccess());
    });
  };

  // reload functionality work
  const { cover, tenure, companies } = useFrontendBoot().data;
  const { filters, fetchFilters } = useSelector(({ quotePage }) => quotePage);
  const { data } = useFrontendBoot();

  const findCode = (fitlerName, fitlerValue) => {
    let code = `${fitlerValue}-${fitlerValue}`;
    data[fitlerName].forEach(data => {
      if (data.display_name === fitlerValue) {
        code = data.code;
      }
    });
    return code;
  };

  useEffect(() => {
    if (shoutGetCompare) {
      let tempfilter;
      fetchFilters.forEach(data => {
        if (`${data.id}` === groupCode) {
          tempfilter = data.extras;
        }
      });

      tempfilter !== null && dispatch(setFilters(tempfilter));
      if (!QuotesToAdd.length) {
        dispatch(
          fetchQuotes(companies, {
            sum_insured:
              tempfilter?.cover !== null
                ? findCode("covers", tempfilter?.cover)
                : cover,
            tenure: tempfilter?.multiYear?.charAt(0) || tenure,
            member: groupCode,
            plan_type:
              memberGroups?.[groupCode]?.length === 1
                ? "I"
                : proposerDetails.plan_type
                ? proposerDetails.plan_type === "M"
                  ? "M"
                  : "F"
                : "F",
          }),
        );
      }
      dispatch(getCompare());
      dispatch(setShoutGetCompare(false));
    }
  }, [fetchFilters]);

  const removePlan2point0 = id => {
    dispatch(setShouldNotFetch(true));
    dispatch(removeQuotesForCompare(id));
    // dispatch(resetFeature());
    dispatch(removeFeature(id));
    setErrors({});
  };

  const removePlan = id => {
    dispatch(setShouldNotFetch(true));
    dispatch(removeQuotesForCompare(id));
    dispatch(resetFeature());
    //dispatch(removeFeature(id))
    setErrors({});
  };

  const handleCompare = () => {
    if (selectedAddPlan !== "") {
      const numberOfPlans = window.matchMedia("(max-width: 1023px)").matches
        ? 2
        : 3;
      dispatch(setQuotesForCompare([selectedAddPlan, numberOfPlans]));
      setSelectedAddPlan("");
    }
  };
  useEffect(() => {
    if (selectedAddPlan) {
      handleCompare();
    }
  }, [selectedAddPlan]);
  useEffect(() => {
    if (!showDiffCbx) {
      setHideCells([]);
    }
  }, [showDiffCbx]);

  useEffect(() => {
    if (selectedQuotes.length > 0) {
      const tempMergedCover = {};

      selectedQuotes?.map((data, i) => {
        quotes?.map(quotedata => {
          const tempArray = [];
          quotedata?.map(quote => {
            if (data?.product.id === quote?.product.id) {
              tempArray.push(quote.sum_insured);
            }
          });
          if (tempArray.length > 0) {
            tempMergedCover[`${data.product.id}${data.sum_insured}`] =
              tempArray;
          }
        });

        dispatch(
          getFeatures(
            data,
            i,
            groupCode,
            discount[`${data.product.id}${data.sum_insured}`],
          ),
        );
      });

      setMergedCover(tempMergedCover);
    }
  }, [selectedQuotes, discount]);

  useEffect(() => {
    const filteredQuotes = [];

    if (!shouldNotFetch) {
      quotes.map(quote => {
        quote.map(data => {
          if (
            quotesForCompare?.includes(
              `${data.product.id}${data.sum_insured}`,
            ) &&
            filteredQuotes.length < 3
          ) {
            filteredQuotes.push(data);
          }
        });
      });
      if (quotesForCompare?.length && quotes?.length) {
        const data = quotesForCompare.map(id => {
          if (typeof id === `string`) {
            return {
              product_id: id,
              group_id: groupCode,
              plan_type: filters.planType,
            };
          }
        });
        dispatch(
          updateQuotes({
            products: data,
          }),
        );
      }
      dispatch(resetFeature());
      setMergedCover([]);
      setSelectedQuotes(filteredQuotes);
    }

    if (shouldNotFetch) {
      dispatch(setShouldNotFetch(false));
    }
  }, [quotesForCompare]);

  return {
    quotesForCompare,
    loading,
    handleDownload,
    mergedCover,
    mergedQuotes,
    showDiffCbx,
    setshowDiffCbx,
    removePlan,
    QuotesToAdd,
    show,
    removePlan2point0,
    setShow,
    showM,
    setShowM,
    selectedAddPlan,
    setSelectedAddPlan,
    handleCompare,
    hideCells,
    setHideCells,
    showBuyNowPopup,
    setShowBuyNowPopup,
    imageSend,
    imageSendM,
    emailStatus,
    numToLakh,
    errors,
    setErrors,
    discount,
  };
};

export default useComparePage;

export const numToLakh = SItoConvert => {
  if (SItoConvert > 9999999) {
    let calculated = Number(SItoConvert) / Number(10000000);
    return `${calculated} ${calculated > 1 ? "Crores" : "Crore"}`;
  } else if (SItoConvert > 99999) {
    let calculated = Number(SItoConvert) / Number(100000);
    return `${calculated} ${calculated > 1 ? "Lakhs" : "Lakh"}`;
  } else {
    return SItoConvert;
  }
};
