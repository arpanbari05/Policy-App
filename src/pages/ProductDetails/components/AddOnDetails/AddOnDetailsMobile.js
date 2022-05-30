import { Accordion } from "react-bootstrap";
import "styled-components/macro";
import { useCompanies } from "../../../../customHooks";
import { amount } from "../../../../utils/helper";
import * as mq from "../../../../utils/mediaQueries";
import { CloseButton } from "../../../Cart/components/SidebarCart/SidebarCart";
import { addOnDetailsComponents } from "./AddOnDetails";
import useAddOnDetails, { ErrorMessage } from "./helpers";

function AddOnDetailsMobile({ addOn, handleClose, ...props }) {
  return (
    <div
      css={`
        height: 100vh;
        overflow: auto;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        display: none;
        z-index: 999;
        font-size: min(calc(10 * 100vw / 360), 12px);

        ${mq.mobile} {
          display: block;
        }
      `}
      {...props}
    >
      <Header addOn={addOn} handleClose={handleClose} />
      {/* <AddOnDetailsMobile.Body addOn={addOn}/> */}
    </div>
  );
}

function Header({ handleClose, addOn, ...props }) {
  const {
    product: {
      company: { name: companyName, alias },
    },
    name: addOnName,
    sum_insured,
    total_premium,
  } = addOn;
  const { getCompanyLogo } = useCompanies();

  const logo = getCompanyLogo(alias);
  return (
    <div
      css={`
        background-color: #f1f1f1;
        width: 100%;
        padding: 3em 1.5em 1.5em 1.5em;
      `}
      {...props}
    >
      <CloseButton
        css={`
          position: absolute;
          top: 1em;
          right: 1em;
          height: 3em;
          width: 3em;
        `}
        onClick={handleClose}
      />
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={`
            width: 7em;
          `}
        >
          <img
            src={logo}
            alt={alias}
            css={`
              max-width: 100%;
            `}
          />
        </div>
        <div
          css={`
            font-size: 1.4em;
            margin-left: 0.7em;
            & p {
              line-height: 1.6;
            }
          `}
        >
          <p>{companyName}</p>
          <p
            css={`
              font-weight: normal;
            `}
          >
            {addOnName}
          </p>
        </div>
      </div>
      <div
        css={`
          padding: 1.5em 0;
          margin-top: 1.5em;
          border-radius: 0.6em;
          background-color: #fff;
          display: flex;
        `}
      >
        <HeaderDetails label="Sum Insured" value={amount(sum_insured)} />
        <HeaderDetails
          label="Premium"
          value={`${amount(total_premium)} / Year`}
        />
      </div>
    </div>
  );
}

function HeaderDetails({ label, value, ...props }) {
  return (
    <div
      css={`
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 1.5em;
        font-size: 1.2em;
        &:not(:last-child) {
          border-right: 1px solid #ddd;
        }
      `}
      {...props}
    >
      <div
        css={`
          margin-right: 1em;
        `}
      >
        {label}:
      </div>
      <div
        css={`
          font-weight: 900;
        `}
      >
        {value}
      </div>
    </div>
  );
}

function DetailsTitle({ children, isOpen, eventKey }) {
  return (
    <Accordion.Toggle eventKey={eventKey} as="button" style={{ width: "100%" }}>
      <div
        css={`
          background-color: #fff;
          box-shadow: rgb(134 156 213 / 25%) 0px 10px 20px;
          border-radius: 3em;
          padding: 1em 1.2em;
          font-size: 1.4em;
          font-weight: 900;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 1em;
        `}
      >
        <p
          css={`
            color: var(--abc-red);
          `}
        >
          {children}
        </p>
        <i
          className="fa fa-angle-down"
          css={`
            font-size: 1.6em;
            transform: rotate(${isOpen ? "180deg" : 0});
          `}
        />
      </div>
    </Accordion.Toggle>
  );
}

AddOnDetailsMobile.Body = function Body({ addOn }) {
  const { status, addOnDetails, handleRetry } = useAddOnDetails({ addOn });

  // console.log(downloads,"addOndefects")
  return (
    <div
      css={`
        padding: 2em 1.5em;
      `}
    >
      {status === "loading" || !addOnDetails ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <ErrorMessage handleRetry={handleRetry} />
      ) : status === "success" ? (
        <Accordion>
          {addOnDetails.map(addOnDetail =>
            addOnDetailsComponents[addOnDetail.name] ? (
              <DetailBody addOnDetail={addOnDetail}>
                {addOnDetailsComponents[addOnDetail.name]({
                  addOnDetail,
                  sumInsured: addOn.sum_insured,
                })}
              </DetailBody>
            ) : null,
          )}
          <div>
            <DetailsTitle eventKey={"downloads"}>{"Downloads"}</DetailsTitle>
            <Accordion.Collapse
              eventKey={"downloads"}
              css={`
                font-size: 1.2em;
              `}
            >
              {/* <div>
                <AddOnDetails.Downloads
                  addOn={addOn}
                  setDownloads={setDownloads}
                  downloads={downloads}
                />
              </div> */}
            </Accordion.Collapse>
          </div>
        </Accordion>
      ) : (
        ""
      )}
    </div>
  );
};

function DetailBody({ addOnDetail, children }) {
  const { name } = addOnDetail;
  return (
    <div>
      <DetailsTitle eventKey={name}>{name}</DetailsTitle>
      <Accordion.Collapse
        eventKey={name}
        css={`
          font-size: 1.2em;
        `}
      >
        <div>{children}</div>
      </Accordion.Collapse>
    </div>
  );
}

export default AddOnDetailsMobile;
