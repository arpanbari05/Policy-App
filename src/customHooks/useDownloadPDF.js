import { useState } from "react";
import { useFrontendBoot } from "./index";
import { useUrlQueries } from "./useUrlQuery";

function getLogo(companies, quotes) {
  const logoArray = quotes?.map(quote => {
    return {
      ...quote,
      logo: companies[quote.company_alias]?.logo,
    };
  });
  return logoArray;
}

function getFeatures(quotes) {
  const newQuotesWithFeatures = quotes.map(quote => {
    const featureList = JSON.parse(sessionStorage[quote.product.id]);
    const currentProductFeaturesBySumInsures = featureList.map(feature => {
      return {
        feature_name: feature.name,
        content: feature.sum_insureds[quote.sum_insured].features,
      };
    });

    return {
      product: quote.product,
      sum_insured: quote.sum_insured,
      cashless_hospitals_count: quote.cashless_hospitals_count,
      company_alias: quote.company_alias,
      deductible: quote.deductible,
      tenure: quote.tenure,
      total_premium: quote.total_premium,
      features_contnet: currentProductFeaturesBySumInsures,
    };
  });

  return newQuotesWithFeatures;
}

export default function useDownloadPDF({ quotes }) {
  const [pdfFetchLoading, setPdfFetchLoading] = useState(false);
  const { data } = useFrontendBoot();
  const enquiryData = useUrlQueries();

  async function downloadComparePDF() {
    const newQuotes = getFeatures(quotes);
    const pdfBodyContent = JSON.stringify({
      quotes: getLogo(data?.companies, newQuotes),
      groupCode: window.location.pathname.split("/")[2],
    });
    try {
      setPdfFetchLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}compare/share_pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "enquiry-id": enquiryData.enquiryId,
          },
          body: pdfBodyContent,
        },
      );

      if (response.status === 200) {
        setPdfFetchLoading(false);
      } else {
        console.error(response.message);
        setPdfFetchLoading(false);
      }
      setPdfFetchLoading(false);
    } catch (error) {
      console.error(error);
      setPdfFetchLoading(false);
    }
  }

  return { status, pdfFetchLoading, downloadComparePDF };
}
