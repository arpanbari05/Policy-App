import React from "react";
import useWindowSize from '../../../../customHooks/useWindowSize';

const TBlank = () => {
  const [windowHeight,windowWidth] = useWindowSize();
  return (
    <tbody style={{ boxShadow: "unset" }}>
      <tr>
        <td colSpan={windowWidth>1023?'4':'3'}></td>
      </tr>
    </tbody>
  );
};

export default TBlank;
