import { createGlobalStyle } from "styled-components";

const styles = {
  colors: {
    primary_color: "#0a87ff",
    primary_shade: "#ecf6ff",
    secondary_color: "#2cd44a",
    secondary_shade: "#eef1f4",
    font: {
      one: "#565758",
      two: "#9696b5",
      three: "gray",
      four: "#6b7789",
      five: "#4a5971",
      six: "#40494f",
    },
    border: { one: "#dfe1f2", two: "#c2cbde" },
  },
  boxShadows: {
    one: "0 0px 1px 0 rgb(0 0 0 / 20%), 0 8px 126px 0 rgb(0 0 0 / 10%)",
    two: "rgb(0 75 131 / 28%) 0px 12px 12px -11px",
    three: "0 -5px 6px 0 rgb(0 0 0 / 16%)",
    four: "rgb(134 156 213 / 25%) 0px 10px 20px",
    five: "rgb(0 0 0 / 16%) 0px 3px 13px 0px",
    six: "0 5px 28px rgb(0 0 0 / 30%)",
    seven: "rgb(0 0 0 / 8%) 0px 5px 10px",
  },
};

export default styles;

export const rootFontSize = "16px";

const defaultFontFamily = "Inter-Regular";

export const tenantFontFamily = {
  pinc: "Gothic720",
  renew_buy: "open-sans",
  sriyah: "sans-serif",
};

export function getFontFamily(tenant) {
  const tenantFont = tenantFontFamily[tenant];

  if (!tenantFont) return defaultFontFamily;

  return tenantFont;
}

export const GlobalStyles = createGlobalStyle({
  body: {
    fontFamily: getFontFamily(process.env.REACT_APP_TENANT),
  },
  html: {
    fontSize: rootFontSize,
    "@media (max-width: 1200px)": {
      fontSize: "calc(16 * 100vw / 1200)",
    },
    "@media (max-width: 768px)": {
      fontSize: "min(calc(16 * 100vw / 393), 16px)",
    },
  },
  "@media (min-width: 768px)": {
    "::-webkit-scrollbar-track": {
      background: "#fff",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
    },
    "::-webkit-scrollbar": {
      width: "7px",
    },
  },
});
