import {
  FooterContainer,
  BottomContainer,
  TopContainer,
} from "./footer-stylesheet";
import { useFrontendBoot } from "../../../customHooks";
import sriyah_brokerImg from "../../../assets/logos/sriyah_broker_logo.png";

const Footer = () => {
  const {
    query: { isLoading },
    ...frontendBoot
  } = useFrontendBoot();
  const { email, mobile } = frontendBoot?.data?.settings;
  const { alias } = frontendBoot?.data?.tenant;
  return alias === "sriyah" ? (
    <FooterContainer>
      <TopContainer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="f_widget about-widget pl_40">
                {" "}
                <h3 className="f-title f_600 f_size_18 mb_40">
                  Insurances
                </h3>{" "}
                <ul className="list-unstyled f_list">
                  {" "}
                  <li>
                    <a
                      href="https://uatmotor.nammacover.com/car/lead-page"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Car Insurance
                    </a>
                  </li>{" "}
                  <li>
                    <a href="#">Health Insurance</a>
                  </li>{" "}
                  <li>
                    <a href="#">Super Top Up Insurance</a>
                  </li>{" "}
                </ul>{" "}
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              {" "}
              <div className="f_widget about-widget">
                {" "}
                <h3 className="f-title f_600 f_size_18 mb_40">
                  At a glance
                </h3>{" "}
                <ul className="list-unstyled f_list">
                  {" "}
                  <li>
                    <a
                      href="https://uat.nammacover.com/about_us"
                      target="_blank"
                      rel="noreferrer"
                    >
                      About Us
                    </a>
                  </li>{" "}
                  <li>
                    <a
                      rel="noreferrer"
                      href="https://uat.nammacover.com/terms_of_use"
                      target="_blank"
                    >
                      Terms Of Use
                    </a>
                  </li>{" "}
                  <li>
                    <a
                      href="https://uat.nammacover.com/grievance_policy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Grievance policy
                    </a>
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
            </div>
            <div className="col-lg-6 col-md-6">
              {" "}
              <div className="f_widget company_widget">
                {" "}
                <a href="https://uat.nammacover.com/" className="f-logo">
                  <img src={sriyah_brokerImg} className="logo_ic" alt="" />
                </a>{" "}
                <div className="widget-wrap">
                  {" "}
                  <p
                    className="color_grey_f"
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Sriyah Insurance Brokers Pvt. Ltd. is an Insurance
                    Regulatory & Development Authority of India (IRDAI) approved
                    direct insurance brokers.
                  </p>{" "}
                  <p className="f_400 f_p f_size_15 mb-0 l_height34 color_grey_f">
                    <span>Email:</span>{" "}
                    <a href={`mailto:${email}`} className="f_400">
                      {email}
                    </a>
                  </p>{" "}
                  <p className="f_400 f_p f_size_15 mb-0 l_height34 color_grey_f">
                    <span>Phone:</span>{" "}
                    <a
                      href={`tel:${mobile.split(" ").join("")}`}
                      className="f_400"
                    >
                      {mobile}
                    </a>
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          </div>
        </div>
      </TopContainer>

      <BottomContainer>
        <div className="container">
          <div classname="row align-items-center">
            <div className="col-lg-12 col-md-5 col-sm-6 text-center">
              <p class="mb-0 f_400 color_grey">
                Licenced by Registration No. 203 | License valid till :
                26/08/2024 | Category : Direct Broker | CIN :
                U66010KA2003PTC031462 <br />
                Member of Insurance Brokers Association of India (IBAI).
                Insurance is the subject matter of solicitation. <br />
                For a seamless experience, use the latest version of Chrome,
                Firefox or Edge <br />
                <br /> Copyright 2022 Sriyah Insurance Brokers Pvt. Ltd.
              </p>
            </div>
          </div>
        </div>
      </BottomContainer>
    </FooterContainer>
  ) : (
    <></>
  );
};

export default Footer;
