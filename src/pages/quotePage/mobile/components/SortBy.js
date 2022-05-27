import { Modal } from "react-bootstrap";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { Button, CloseButton } from "../../../../components";
import { useTheme } from "../../../../customHooks";
import "styled-components/macro";
import { useState } from "react";
import { useSortBy } from "../../../../customHooks/index";

export function SortByDialog({ onClose, currentSortBy, onChange }) {
  const { SORT_BY_OPTIONS } = useSortBy();

  const [sortBy, setSortBy] = useState(currentSortBy);
  const handleChange = option => setSortBy(option.code);

  const handleSubmit = evt => {
    evt.preventDefault();

    onChange && onChange(sortBy);
    onClose && onClose();
  };

  return (
    <Dialog show onHide={onClose} title="Sort By">
      <form className="p-3 pt-0" onSubmit={handleSubmit}>
        <div>
          {SORT_BY_OPTIONS?.map(option => (
            <Option
              key={option.code}
              option={option}
              checked={option.code === sortBy}
              onChange={handleChange}
            >
              {option.display_name}
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
      aria-hidden="true"
      aria-selected={checked}
      className="d-flex align-items-center justify-content-between py-3 text-capitalize"
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
