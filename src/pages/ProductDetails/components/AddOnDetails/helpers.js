import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import * as mq from "../../../../utils/mediaQueries";
import { getProductBrochureAPI } from "../../../SeeDetails/serviceApi";
import { getAddOnDetails } from "../../serviceApi";
import DownloadIcon from "../../../../assets/images/download.png";

export function useAddOnDetails({ addOn = {} }) {
  const [addOnDetails, setAddonDetails] = useState(null);

  const [downloads, setDownloads] = useState(null);

  const [status, setStatus] = useState("idle");

  const fetchAddOnDetails = useCallback(() => {
    setStatus("loading");
    getAddOnDetails({ productId: addOn.id })
      .then(res => {
        if (res.data) {
          setAddonDetails(res.data);
          setStatus("success");
          return;
        }
        setStatus("error");
      })
      .catch(e => {
        setStatus("error");
        console.error(e);
      });
  }, [addOn.id]);

  useEffect(() => {
    fetchAddOnDetails();
  }, [fetchAddOnDetails]);

  const handleRetry = () => fetchAddOnDetails();

  return {
    status,
    addOnDetails,
    setAddonDetails,
    handleRetry,
    downloads,
    setDownloads,
  };
}

// console.log("addOnDetailsaddOnDetails2222", addOnDetails);

export function useFetchDownloads({ addOn, setDownloads }) {
  const [status, setStatus] = useState("idle");

  const fetchDownloads = useCallback(() => {
    setStatus("loading");
    getProductBrochureAPI({ productId: addOn.id })
      .then(res => {
        if (res.data) {
          setDownloads(res.data);
          setStatus("success");
          return;
        }
        setStatus("error");
      })
      .catch(e => {
        setStatus("error");
        console.error(e);
      });
  }, [addOn.id, setDownloads]);

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const handleRetry = () => fetchDownloads();

  return { status, handleRetry };
}

export function ErrorMessage({ handleRetry }) {
  return (
    <div>
      <p>
        An unexpected error occured while fetching addon details
        <button
          onClick={handleRetry}
          css={`
            color: var(--abc-red);
          `}
        >
          Retry
        </button>
      </p>
    </div>
  );
}

export const ListItem = styled.div`
  position: relative;
  padding-left: 1em;
  font-weight: 900;
  margin: 1em 0;
  color: #505f79;
  :before {
    position: absolute;
    content: "•";
    color: #2cd44a;
    left: 0;
  }
  /* &::before {
    content: "";
    left: 0;
    top: -0.1em;
    background-color: var(--yellow-one);
    border-radius: 0 10px 10px 0;
    width: 0.39em;
    height: 1.6em;
    position: absolute;
  } */

  ${mq.mobile} {
  }
`;

export function DownloadButton({ title, url }) {
  return (
    <div
      css={`
        min-width: 43%;
        padding: 10px;
        box-shadow: rgb(134 156 213 / 25%) 0px 10px 20px;
        margin: 1rem;
        ${mq.mobile} {
          padding: 1em;
          margin: 0;
          margin-bottom: 1em;
          flex: calc(50% - 0.5em) 0 0;
        }
      `}
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        css={`
          width: 100%;
        `}
      >
        <div
          css={`
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            ${mq.mobile} {
              padding: 0;
            }
          `}
        >
          <p
            css={`
              font-size: 18px;
              color: #000;

              ${mq.mobile} {
                font-size: 1em;
              }
            `}
          >
            {title}
          </p>
          <img
            src={DownloadIcon}
            alt="download"
            css={`
              width: 37px;
            `}
          />
        </div>
      </a>
    </div>
  );
}

export default useAddOnDetails;
