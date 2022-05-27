import Modal from "../../../../components/Common/Modal";
import RemoveIcon from "../../../../assets/images/remove_m.png";
import AddIcon from "../../../../assets/images/add_btn.png";
import { amount } from "../../../../utils/helper";
import useCartProduct from "../../hooks/useCartProduct";
import { useSelector } from "react-redux";
import { selectCompany } from "../../../../FrontendBoot/reducer/frontendBoot.slice";
import { useHistory } from "react-router";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import { useTotalPremium, useFirstGroupCodeWithProduct } from "../../";
import "styled-components/macro";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function SidebarCart({ handleClose = () => {} }) {
  const firstName = "User";
  const memberGroups = useSelector(state => state.greetingPage.memberGroups);

  const { totalPremium } = useTotalPremium();

  const { firstGroupCodeWithProduct } = useFirstGroupCodeWithProduct();

  const urlQueries = useUrlQuery();

  const enquiryId = urlQueries.get("enquiryId");

  return (
    <Modal>
      <div
        css={`
          z-index: 999;
          position: fixed;
          right: 0;
          top: 0;
          min-width: 480px;
          background-color: #fff;
          height: 100vh;
          box-shadow: 1px 1px 0.3px 0.6px rgba(0, 0, 0, 0.6);
        `}
      >
        <div
          css={`
            position: relative;
            border: 1px solid transparent;
            border-left: none;
          `}
        >
          <CloseButton
            css={`
              position: absolute;
              top: 10px;
              right: 10px;
            `}
            onClick={handleClose}
          />
          <p
            css={`
              font-size: 18px;
              margin-top: 26px;
              position: relative;
              padding-left: 20px;
              width: calc(100% - 60px);
              line-height: 1.5;
              font-weight: 400;

              &::before {
                content: "";
                height: 26px;
                width: 7px;
                background-color: var(--yellow-one);
                position: absolute;
                left: 0;
                top: 0;
                border-radius: 20px;
              }
            `}
          >
            Hey {firstName}, Take a minute and review your cart before you
            proceed
          </p>
          <div
            css={`
              padding: 15px;
              margin-top: 10px;
            `}
          >
            {Object.keys(memberGroups).map((groupCode, index) => (
              <CartProduct
                key={index}
                groupCode={groupCode}
                handleAddPlanClick={handleClose}
              />
            ))}
          </div>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: #f8f8fb;
              border-radius: 8px;
              margin: 20px 15px 0;
              padding: 12px 20px;
            `}
          >
            <p
              css={`
                font-size: 17px;
              `}
            >
              Total Premium
            </p>
            <p
              css={`
                font-size: 24px;
                color: var(--abc-red);
              `}
            >
              {amount(totalPremium)}
            </p>
          </div>
          {totalPremium !== 0 ? (
            <div
              css={`
                margin-top: 20px;
                display: flex;
                justify-content: center;
              `}
            >
              <Link
                to={`/productdetails/${firstGroupCodeWithProduct}?enquiryId=${enquiryId}`}
                css={`
                  background-color: var(--abc-red);
                  color: #fff;
                  width: calc(100% - 30px);
                  padding: 12px 0;
                  border-radius: 8px;
                  font-size: 20px;
                  text-align: center;
                  &:hover {
                    color: #fff;
                  }
                `}
                onClick={handleClose}
              >
                Contine
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

function CartProduct({ groupCode = "", handleAddPlanClick = () => {} }) {
  const history = useHistory();
  const members = useSelector(
    state => state.greetingPage.memberGroups[groupCode],
  );
  const membersTitle = members.join(" + ").replace("_", "-");

  const { product, deleteProduct } = useCartProduct(groupCode);

  const urlQuries = useUrlQuery();

  const enquiryId = urlQuries.get("enquiryId");

  const handleAddPlan = () => {
    history.push(`/quotes/${groupCode}?enquiryId=${enquiryId}`);
    handleAddPlanClick();
  };

  return (
    <div
      css={`
        &:not(:last-child) {
          margin-bottom: 30px;
        }
      `}
    >
      <TitleWithDelete
        title={membersTitle}
        showDelete={!!product}
        handleDelete={deleteProduct}
      />
      <div
        css={`
          margin-top: 10px;
        `}
      >
        {!product ? (
          <AddButton onClick={handleAddPlan}>Add Plan</AddButton>
        ) : (
          <ProductDetailsCard product={product} />
        )}
      </div>
    </div>
  );
}

function ProductDetailsCard({
  product: {
    sum_insured = "120000",
    total_premium = "3700",
    tenure = "3",
    product: {
      name = "Care advantage",
      company: { alias },
    },
  },
}) {
  const { logo: logoSrc } = useSelector(selectCompany(alias));
  return (
    <div
      css={`
        border: 1px solid #ddd;
        border-radius: 6px;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          padding: 10px;
        `}
      >
        <div
          css={`
            width: 60px;
          `}
        >
          <img
            src={logoSrc}
            alt={alias}
            css={`
              max-width: 100%;
            `}
          />
        </div>
        <p
          css={`
            margin-left: 1rem;
          `}
        >
          {name}
        </p>
      </div>
      <div
        css={`
          background-color: #f2f6f9;
          padding: 10px;
          display: flex;
        `}
      >
        <DetailItem title="Cover" value={amount(sum_insured)} />
        <DetailItem title="Premium" value={amount(total_premium)} />
        <DetailItem
          title="Tenure"
          value={`${tenure} ${parseInt(tenure) === 1 ? "year" : "years"}`}
        />
      </div>
    </div>
  );
}

function DetailItem({ title, value }) {
  return (
    <div
      css={`
        flex: 1;
        padding-left: 10px;
        display: flex;
        justify-content: center;
        &:not(:last-child) {
          border-right: 1px solid #a3a9c0;
        }
      `}
    >
      <div>
        <p
          css={`
            font-size: 14px;
            line-height: 20px;
          `}
        >
          {title}
        </p>
        <p
          css={`
            font-size: 13px;
            line-height: 20px;
          `}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function AddButton({ children, ...props }) {
  return (
    <button
      css={`
        background-color: #fff3f3;
        border: 1px dashed #eec5c7;
        border-radius: 8px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
      `}
      {...props}
    >
      <div
        css={`
          width: 30px;
          margin-right: 1rem;
        `}
      >
        <img
          src={AddIcon}
          alt="add-plan"
          css={`
            max-width: 100%;
          `}
        />
      </div>
      {children}
    </button>
  );
}

function TitleWithDelete({ title, handleDelete = () => {}, showDelete }) {
  const handleDeleteClick = () => {
    handleDelete();
  };
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <BackgroundGradientTitle title={title} />
      {showDelete ? (
        <button onClick={handleDeleteClick}>
          <img src={RemoveIcon} alt="delete" />
        </button>
      ) : null}
    </div>
  );
}

function BackgroundGradientTitle({ title }) {
  return (
    <h2
      css={`
        font-size: 24px;
        background-image: linear-gradient(to right, #ffe7e7 20%, #fff 70%);
        padding: 10px;
        border-radius: 8px;
        width: max-content;
        text-transform: capitalize;
        font-weight: 900;
      `}
    >
      {title}
    </h2>
  );
}

export function CloseButton({ css = ``, ...props }) {
  return (
    <button
      css={`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        border: none;
        ${css}
      `}
      {...props}
    >
      <FaTimes style={{ cursor: "pointer", fontWeight: "bold" }}></FaTimes>
    </button>
  );
}

export default SidebarCart;
