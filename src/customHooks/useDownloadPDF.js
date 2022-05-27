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

export default function useDownloadPDF({ quotes, logo }) {
  const [status, setStatus] = useState(null);
  const [pdfFetchLoading, setPdfFetchLoading] = useState(false);
  const { data } = useFrontendBoot();
  const enquiryData = useUrlQueries();

  async function downloadComparePDF() {
    const pdfBodyContent = JSON.stringify({
      quotes: getLogo(data?.companies, quotes),
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
        const data = await response.json();
        console.log(data);
        setPdfFetchLoading(false);
      } else {
        console.error(response.message);
        setPdfFetchLoading(false);
      }
    } catch (error) {
      console.log(error);
      setPdfFetchLoading(false);
    }
  }

  return { status, pdfFetchLoading, downloadComparePDF };
}
