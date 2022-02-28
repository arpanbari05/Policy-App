import { checkAllChar, forbiddedSymbols } from "./formUtils";

const VALID_EMAIL = "testign@testign.com";
const INVALID_EMAIL = "testigntestign#.com";

test(`checkAllChars should valdiate email`, () => {
  expect(checkAllChar(VALID_EMAIL, forbiddedSymbols)).toBe(true);
  expect(checkAllChar(INVALID_EMAIL, forbiddedSymbols)).toBe(false);
});
