import { useState } from "react";
import {
  Accordion,
  Col,
  Nav,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
} from "react-bootstrap";
import Modal from "../../../../components/Common/Modal";
import { CloseButton } from "../../../Cart/components/SidebarCart/SidebarCart";
import { amount } from "../../../../utils/helper";
import { mobile } from "../../../../utils/mediaQueries";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { selectCompany } from "../../../../FrontendBoot/reducer/frontendBoot.slice";
import AddOnDetailsMobile from "./AddOnDetailsMobile";
import {
  DownloadButton,
  ErrorMessage,
  ListItem,
  useFetchDownloads,
} from "./helpers";

import useAddOnDetails from "./helpers";

const renderTooltipDesc = ({ props, desc }) => (
  <Tooltip {...props}>{desc}</Tooltip>
);

function AddOnDetails({ addOn, handleClose }) {
  return (
    <Modal>
      <AddOnDetailsMobile addOn={addOn} handleClose={handleClose} />
      <div
        css={`
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
          z-index: 999;
          ${mobile} {
            display: none;
          }
        `}
      >
        <div
          css={`
            position: relative;
            z-index: 999;
            height: 100vh;
            width: 100vw;
            overflow: auto;
          `}
        >
          <div
            css={`
              max-width: 1000px;
              background-color: #fff;
              border-radius: 10px;
              margin: 100px auto;
            `}
          >
            <AddOnDetails.Header addOn={addOn} handleClose={handleClose} />
            <AddOnDetails.Body addOn={addOn} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

AddOnDetails.Body = function Body({ addOn = {} }) {
  const { status, addOnDetails, handleRetry, downloads, setDownloads } =
    useAddOnDetails({ addOn });

  return (
    <div
      css={`
        padding: 15px 20px;
      `}
    >
      {status === "loading" || status === "idle" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <ErrorMessage handleRetry={handleRetry} />
      ) : (
        <Tab.Container
          id="add-on-details-body"
          defaultActiveKey={addOnDetails[0].name}
        >
          <Row>
            <AddOnDetails.Nav
              navItems={addOnDetails.map(addOnDetail => addOnDetail.name)}
            />
            <AddOnDetails.NavBody
              addOn={addOn}
              addOnDetails={addOnDetails}
              sumInsured={addOn.sum_insured}
              downloads={downloads}
              setDownloads={setDownloads}
            />
          </Row>
        </Tab.Container>
      )}
    </div>
  );
};

AddOnDetails.PlanHighlights = function PlanHighlights({
  addOnDetail = {},
  sumInsured,
}) {
  const { features } = addOnDetail.sum_insureds[sumInsured] || {};

  return (
    <div>
      {features ? (
        <ul style={{ listStyle: "none" }}>
          {features.map(feature =>
            feature.feature_value
              ? feature.feature_value.split("\n").map(item =>
                  item ? (
                    <li
                      css={`
                        margin: 1.6em 0;
                        margin-top: 1em;
                      `}
                    >
                      {" "}
                      <ListItem> {item.replace("•", "")} </ListItem>
                    </li>
                  ) : null,
                )
              : null,
          )}
        </ul>
      ) : null}
    </div>
  );
};

function CriticalIllnessList({ feature }) {
  const { feature_value } = feature;
  const criticalIllnessList = feature_value.split("\n");
  const criticalIllnessCount = criticalIllnessList[0].match(/\d+/g)[0];
  return (
    <div
      css={`
        width: 100%;
      `}
    >
      <Accordion>
        <div
          css={`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <ListItem>Covered Critical Illnesses :</ListItem>
          <Accordion.Toggle eventKey="critical-illness-accordion">
            Covers {criticalIllnessCount} Critical Illnesses
            <i
              className="fa fa-angle-down"
              css={`
                font-size: 21px;
                margin-left: 0.3em;
              `}
            />
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey="critical-illness-accordion">
          <ul
            css={`
              display: flex;
              flex-wrap: wrap;
              max-height: 10em;
              overflow: auto;
            `}
          >
            {criticalIllnessList.slice(1).map(criticalIllness => (
              <li
                css={`
                  min-width: 50%;
                `}
              >
                <Description
                  css={`
                    margin: 0;
                  `}
                >
                  {criticalIllness}
                </Description>
              </li>
            ))}
          </ul>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}

AddOnDetails.WhatItCovers = function WhatItCovers({
  addOnDetail = {},
  sumInsured,
}) {
  const { features } = addOnDetail.sum_insureds[sumInsured] || {};
  console.log("ddd", features);
  return (
    <div
      css={`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {features.map(feature =>
        feature.feature_value ? (
          feature.code === "covered_critical_illnesses" ? (
            <CriticalIllnessList feature={feature} />
          ) : (
            <div
              css={`
                min-width: 50%;
              `}
            >
              <FeatureDetail
                title={feature.title}
                description={feature.feature_value}
                shortDesc={feature.short_description}
              />
            </div>
          )
        ) : null,
      )}
    </div>
  );
};

const Description = styled.p`
  padding-left: 1em;
  color: var(--font-gray-two);
  font-weight: normal;
  margin-top: -0.7em;
`;

function FeatureDetail({ title, description = "", shortDesc = "" }) {
  if (!description) return null;
  return (
    <div
      css={`
        width: max-content;
      `}
    >
      <OverlayTrigger
        placement={"right"}
        overlay={renderTooltipDesc({
          desc: shortDesc,
        })}
      >
        <span>
          <ListItem>{title} :</ListItem>
          {description.includes("\n") ? (
            <ul>
              {description.split("\n").map(item => (
                <li
                  css={`
                    margin-bottom: 1em;
                  `}
                >
                  {" "}
                  <Description>{item}</Description>
                </li>
              ))}
            </ul>
          ) : (
            <Description>{description}</Description>
          )}
        </span>
      </OverlayTrigger>
    </div>
  );
}

AddOnDetails.Downloads = function Downloads({
  addOn,
  downloads,
  setDownloads,
}) {
  const { status, handleRetry } = useFetchDownloads({ addOn, setDownloads });

  if (status === "loading" || status === "idle") return <p>Loading...</p>;
  if (status === "error")
    return (
      <p>
        An unexpected error occured while getting downloads
        <button
          onClick={handleRetry}
          css={`
            color: var(--abc-red);
          `}
        >
          Retry
        </button>
      </p>
    );

  const { brochure_url, policy_wording_url, claim_url } = downloads[0];

  return (
    <div
      css={`
        display: flex;
        flex-wrap: wrap;

        ${mobile} {
          justify-content: space-between;
        }
      `}
    >
      <DownloadButton title="Policy Brochure" url={brochure_url} />
      <DownloadButton title={"Terms & Conditions"} url={policy_wording_url} />
      <DownloadButton title="Claim Form" url={claim_url} />
    </div>
  );
};

export const addOnDetailsComponents = {
  "Plan Highlights": AddOnDetails.PlanHighlights,
  "What it Covers": AddOnDetails.WhatItCovers,
  "Points to remember": AddOnDetails.WhatItCovers,
  "What it does not cover": AddOnDetails.PlanHighlights,
  Downloads: AddOnDetails.Downloads,
};

AddOnDetails.NavBody = function NavBody({
  addOnDetails = [],
  sumInsured,
  addOn = {},
  downloads,
  setDownloads,
}) {
  return (
    <Col lg={9}>
      <Tab.Content>
        {addOnDetails.map(addOnDetail => (
          <Tab.Pane eventKey={addOnDetail.name}>
            {addOnDetailsComponents[addOnDetail.name]
              ? addOnDetailsComponents[addOnDetail.name]({
                  addOnDetail,
                  sumInsured,
                })
              : null}
          </Tab.Pane>
        ))}
        {/* <Tab.Pane eventKey="downloads">
          <AddOnDetails.Downloads
            addOn={addOn}
            downloads={downloads}
            setDownloads={setDownloads}
          />
        </Tab.Pane> */}
      </Tab.Content>
    </Col>
  );
};

AddOnDetails.Nav = function Nav({ navItems = [] }) {
  const [currentItem, setCurrentItem] = useState(navItems[0]);
  const navItemPosition = [...navItems, "downloads"].indexOf(currentItem);

  const handleNavClick = itemName => setCurrentItem(itemName);

  const NavItemWithClick = props => (
    <NavItem {...props} onClick={handleNavClick} />
  );

  return (
    <Col
      lg={3}
      css={`
        border-right: 1px solid #ddd;
        position: relative;
        height: calc(60px * ${navItems.length + 1});
      `}
    >
      {/* <div
        css={`
          position: absolute;
          height: 100%;
          width: 8px;
          background-color: #f1f1f1;
          border-radius: 10px;
        `}
      >
        <div
          css={`
            height: calc(100% / ${navItems.length + 1});
            background-color: var(--abc-red);
            border-radius: 10px;
            transition: all 0.33s cubic-bezier(0.38, 0.8, 0.32, 1.07);
            transform: translateY(calc(100% * ${navItemPosition}));
          `}
        />
      </div> */}
      <Nav
        className="flex-column"
        css={`
          padding-left: 20px;
          height: 100%;
        `}
      >
        {navItems.map(navItem => (
          <NavItemWithClick key={navItem} eventKey={navItem}>
            {navItem}
          </NavItemWithClick>
        ))}
        <NavItemWithClick eventKey="downloads">Downloads</NavItemWithClick>
      </Nav>
    </Col>
  );
};

function NavItem({ eventKey, children, onClick = () => {} }) {
  const handleClick = () => onClick(eventKey);
  return (
    <Nav.Item
      css={`
        flex: 1;
        display: flex;
        align-items: center;
      `}
    >
      <Nav.Link
        onClick={handleClick}
        css={`
          font-weight: normal;
          color: #000;
          &:hover {
            color: #0e89ff;
          }
          &.active {
            border-left: 4px solid #0a87ff;
            color: #0e89ff;
            background-image: linear-gradient(89deg, #e2f0ff 44%, #fff 89%);
            font-weight: 900;
          }
        `}
        eventKey={eventKey}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}

AddOnDetails.Header = function Header({ addOn = {}, handleClose = () => {} }) {
  const {
    sum_insured,
    total_premium,
    company: { alias, name: companyName },
    name: addOnName,
  } = addOn;

  const { logo: logoSrc } = useSelector(selectCompany(alias));

  const handleCloseClick = () => {
    handleClose();
  };

  return (
    <div
      css={`
        background-color: #f5f7f9;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        padding: 20px 70px 20px 20px;
        position: relative;
        min-height: 90px;
      `}
    >
      <CloseButton
        css={`
          position: absolute;
          top: 1.2rem;
          right: 1rem;
          color: #485467;
        `}
        onClick={handleCloseClick}
      />
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={`
            width: 65px;
            display: flex;
            height: 65px;
            background: white;
            margin-right: 1rem;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
          `}
        >
          <img
            css={`
              width: 100%;
            `}
            src={logoSrc}
            alt={alias}
          />
        </div>
        <div>
          <span
            css={`
              font-size: 18px;
              font-weight: 900;
              color: #364865;
            `}
          >
            {companyName}
          </span>
          <br />
          <span>{addOnName}</span>
        </div>
      </div>
      <div
        css={`
          background-color: #fff;
          border-radius: 10px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #ddd;
        `}
      >
        <Detail title="Sum Insured" value={amount(sum_insured)} />
        <Detail title="Premium" value={`${amount(total_premium)} / Year`} />
      </div>
    </div>
  );
};

function Detail({ title, value }) {
  return (
    <div
      css={`
        display: flex;
        padding: 0 1rem;
        &:not(:last-child) {
          border-right: 1px solid #ddd;
        }
      `}
    >
      <span
        css={`
          margin-right: 1rem;
          font-weight: normal;
          font-size: 15px;
        `}
      >
        {title}:
      </span>
      <span style={{ fontWeight: "900" }}>{value}</span>
    </div>
  );
}

export default AddOnDetails;
