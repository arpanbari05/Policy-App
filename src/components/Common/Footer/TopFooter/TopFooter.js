import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import logo from "../../../../assets/images/adityaBirlaLogo.png";

const TopFooter = () => {
	return (
		<div className="top-footer">
			<Container>
				<Row style={{ margin: "unset" }}>
					<Col data-aos="fade-up" lg={3} sm={6} xs={12}>
						<span  className="logo">
							<img src={logo} width="150px" />
						</span>
						<span  className="email">
							abc@fyntune.com
						</span>
						<span  className="phone">
							9867554345
						</span>
					</Col>

					<Col data-aos="fade-up" lg={3} sm={6} xs={12}>
						<Title>Insurance</Title>
						<FooterList>
							<li>
								<span>Car</span>
							</li>
							<li>
								<span>Bike</span>
							</li>
							<li>
								<span>Health</span>
							</li>
							<li>
								<span>Travel</span>
							</li>
						</FooterList>
					</Col>
					<Col data-aos="fade-up" lg={3} sm={6} xs={12}>
						<Title>About us</Title>

						<FooterList>
							<li>
								<span>About us</span>
							</li>
							<li>
								<span>Team</span>
							</li>
							<li>
								<span>Plan & Pricing</span>
							</li>
							<li>
								<span>News</span>
							</li>
						</FooterList>
					</Col>
					<Col data-aos="fade-up" lg={3} sm={6} xs={12}>
						<Title>Our Address</Title>
						<Paragraph>
							4th floor, Akshar building, turbhe, Navi mumbai <br />
							Maharastra, India
						</Paragraph>
						<FooterList>
							<SocialList>
								<span>
									<i className="fa fa-facebook" aria-hidden="true"></i>
								</span>
							</SocialList>
							<SocialList>
								<span>
									<i className="fa fa-twitter" aria-hidden="true"></i>
								</span>
							</SocialList>
							<SocialList>
								<span>
									<i className="fa fa-linkedin" aria-hidden="true"></i>
								</span>
							</SocialList>
						</FooterList>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default TopFooter;

const Title = styled.h5`
	font-size: 20px !important;
	color: white !important;
	font-weight: 900;
`;

const Paragraph = styled.p`
	padding: 0 0 30px;
	color: #76797e;
	line-height: 28px;
	// width: 255px;
`;

const FooterList = styled.ul`
	& li span {
		display: block;
		line-height: 38px;
		font-size: 17px;
		color: #76797e !important;
		transition: all 0.3s ease-in-out;
	}

	& span:hover {
		color: #010101 !important;
	}
`;

const SocialList = styled.li`
	width: 40px;
	height: 40px;
	border: 1px solid #dbdbdb;
	border-radius: 50%;
	text-align: center;
	line-height: 40px;
	color: #dbdbdb;
	display: inline-block;
	margin-right: 10px;
	& .fa {
		color: white;
	}
	&:hover {
		background: #c72229 !important;
		border-color: #c72229 !important;
		transition: all 0.3s ease-in-out;
	}
`;
