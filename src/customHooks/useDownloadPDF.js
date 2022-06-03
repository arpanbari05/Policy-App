import { useState } from "react";
import { numToLakh } from "../pages/ComparePage/useComparePage";
import { useFrontendBoot } from "./index";
import { useUrlQueries } from "./useUrlQuery";

function getQuotesWithLogo(companies, quotes) {
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
      sum_insured: numToLakh(quote.sum_insured),
      cashless_hospitals_count: quote.cashless_hospitals_count,
      company_alias: quote.company_alias,
      deductible: quote.deductible,
      tenure: quote.tenure,
      total_premium: sessionStorage[`premium${quote.product.id}`],
      features: currentProductFeaturesBySumInsures,
      riders: JSON.parse(
        sessionStorage[`${quote.product.id}riders${quote.sum_insured}`],
      ),
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
      quotes: getQuotesWithLogo(data?.companies, newQuotes),
      groupCode: window.location.pathname.split("/")[2],
      broker_name: data?.tenant?.name,
      broker_contact_email: data.tenant.email,
      broker_logo: data?.settings?.logo,
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
        response.json().then(data => {
          if (data) {
            setPdfFetchLoading(false);
            window.open(data.pdf_path, "_blank");
          }
        });
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

  return { pdfFetchLoading, downloadComparePDF };
}
