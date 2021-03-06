import "styled-components/macro";

export const CheckSvg = ({ customCss }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 60 60`}
      css={`
        height: 30px;
        width: 30px;
        ${customCss}
      `}
    >
      <g
        id="Group_7625"
        data-name="Group 7625"
        transform="translate(-1491 -565)"
      >
        <g id="Group_7608" data-name="Group 7608" transform="translate(0 1)">
          <g id="Group_7607" data-name="Group 7607">
            <g
              id="Ellipse_1231"
              data-name="Ellipse 1231"
              transform="translate(1491 564)"
              fill="#ffe5e5"
              stroke="#c7222a"
              stroke-width="3"
            >
              <circle cx="29.5" cy="29.5" r="29.5" stroke="none" />
              <circle cx="29.5" cy="29.5" r="28" fill="none" />
            </g>
          </g>
        </g>
        <path
          id="check-mark"
          d="M35.9,10.6a2.4,2.4,0,0,1,0,3.4l-16.11,16.11a2.4,2.4,0,0,1-3.4,0L8.729,22.438a2.4,2.4,0,0,1,3.4-3.4L18.1,25.013,32.508,10.6a2.4,2.4,0,0,1,3.4,0Z"
          transform="translate(1498.183 574.102)"
          fill="#c7222a"
        />
      </g>
    </svg>
  );
};
