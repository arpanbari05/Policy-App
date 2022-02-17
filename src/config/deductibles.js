import { amount, numberToDigitWord } from "../utils/helper";

export const deductibles = [
  { code: 10000, display_name: amount(10000) },
  { code: 25000, display_name: amount(25000) },
  { code: 50000, display_name: amount(50000) },
  { code: 200000, display_name: numberToDigitWord(200000) },
  { code: 300000, display_name: numberToDigitWord(300000) },
  { code: 400000, display_name: numberToDigitWord(400000) },
  { code: 500000, display_name: numberToDigitWord(500000) },
  { code: 600000, display_name: numberToDigitWord(600000) },
  { code: 700000, display_name: numberToDigitWord(700000) },
  { code: 800000, display_name: numberToDigitWord(800000) },
  { code: 900000, display_name: numberToDigitWord(900000) },
  { code: 1000000, display_name: numberToDigitWord(1000000) },
  { code: 1500000, display_name: numberToDigitWord(1500000) },
  { code: 2000000, display_name: numberToDigitWord(2000000) },
  { code: 2500000, display_name: numberToDigitWord(2500000) },
];
