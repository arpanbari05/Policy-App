import "styled-components/macro";

function Slider({ children, css = ``, ...props }) {
  return (
    <>
      <div
        css={`
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background-color: rgba(143, 143, 143, 0.47);
          z-index: 99;
          ${css}
        `}
        {...props}
      />
      {children}
    </>
  );
}

export default Slider;
