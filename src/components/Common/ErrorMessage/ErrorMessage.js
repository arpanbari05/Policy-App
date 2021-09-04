import "styled-components/macro";

function ErrorMessage({ title = "", message = "", ...props }) {
  return (
    <div {...props}>
      <p>{title}</p>
      <p
        css={`
          color: var(--abc-red);
        `}
      >
        {message}
      </p>
    </div>
  );
}

export default ErrorMessage;
