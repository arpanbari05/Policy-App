import { Modal } from "react-bootstrap";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { Button, CloseButton } from "../../../../components";
import { useTheme } from "../../../../customHooks";
import "styled-components/macro";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShareType, setShowSharePopup } from "../../quote.slice";

const SHARE_OPTIONS = [
  {
    value: "share",
    label: "Share quotes",
  },
  {
    value: "quotation_list",
    label: "Share quotation list",
  },
  {
    value: "specific_quotes",
    label: "Share specific quotes",
  },
];

export default function ShareTypeModal({ onClose }) {
  const { shareType } = useSelector(({ quotePage }) => quotePage);

  const [share, setShare] = useState(shareType);

  const handleChange = option => setShare(option);

  useEffect(() => {
    setShare(shareType);
  }, [shareType]);

  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(setShareType({ ...share }));
    if (share.value === "quotation_list") {
      dispatch(setShowSharePopup(false));
    } else if (share.value === "specific_quotes") {
      dispatch(setShowSharePopup(true));
    }
    onClose && onClose();
  };

  return (
    <Dialog show onHide={onClose} title="Select share type">
      <form className="p-3 pt-0" onSubmit={handleSubmit}>
        <div>
          {SHARE_OPTIONS.map(option => (
            <Option
              key={option.value}
              option={option}
              checked={option.value === share.value}
              onChange={() => handleChange(option)}
            >
              {option.label}
            </Option>
          ))}
        </div>
        <Button className="w-100 mt-3" type="submit">
          Apply
        </Button>
      </form>
    </Dialog>
  );
}

function Option({
  checked = false,
  type = "radio",
  children,
  onChange,
  option,
}) {
  const { colors } = useTheme();

  const handleChange = () => onChange && onChange(option);

  return (
    <label
      role="option"
      aria-selected={checked}
      className="d-flex align-items-center justify-content-between py-3"
      css={`
        :not(:last-child) {
          border-bottom: 1px solid ${colors.border.one};
        }
      `}
    >
      {children}
      <span
        css={`
          font-size: 1.6rem;
          color: ${colors.primary_color};
        `}
      >
        {checked ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
      </span>
      <input
        type={type}
        className="visually-hidden"
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
}

function Dialog({ onHide, show, title, children, ...props }) {
  const { colors } = useTheme();
  return (
    <Modal onHide={onHide} show={show} centered {...props}>
      <CloseButton onClick={onHide} />
      <h1
        className="p-3 m-0"
        css={`
          font-size: 1rem;
          font-weight: 900;
          border-bottom: 1px solid ${colors.border.one};
        `}
      >
        {title}
      </h1>
      {children}
    </Modal>
  );
}
