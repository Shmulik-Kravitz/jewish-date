/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

import { createRoot } from "react-dom/client";
import { JewishMonth, calcDaysInMonth, formatJewishDate } from "../src";
import {
  formatJewishDateInHebrew,
  toGregorianDate,
  toHebrewJewishDate,
  toJewishDate,
} from "../src/";
import { toLength } from "../src/utils/numberUtils";

import "./index.css";

const formatDate = (date: Date) =>
  `${toLength(date.getFullYear(), 4)}-${toLength(
    date.getMonth() + 1,
    2,
  )}-${toLength(date.getDate(), 2)}`;

function numberToHebrewLetter(number: number): string {
  const hebrewLetterValues: { [key: number]: string } = {
    1: "א",
    2: "ב",
    3: "ג",
    4: "ד",
    5: "ה",
    6: "ו",
    7: "ז",
    8: "ח",
    9: "ט",
    10: "י",
    20: "כ",
    30: "ל",
    40: "מ",
    50: "נ",
    60: "ס",
    70: "ע",
    80: "פ",
    90: "צ",
    100: "ק",
    200: "ר",
    300: "ש",
    400: "ת",
  };

  if (number >= 1 && number <= 10) {
    return `׳${hebrewLetterValues[number]}`;
  }

  if (number >= 11 && number <= 19) {
    return `י׳${hebrewLetterValues[number - 10]}`;
  }

  if (number % 10 === 0) {
    return `${hebrewLetterValues[number / 10]}'`;
  }

  const tens = Math.floor(number / 10) * 10;
  const ones = number % 10;

  if (number > 11) {
    return `${hebrewLetterValues[tens]}"${hebrewLetterValues[ones]}`;
  }

  const onesPart = ones > 0 ? hebrewLetterValues[ones] : "";
  return `${hebrewLetterValues[tens]}${onesPart}`;
}

export const test = (date: Date) => {
  console.log(date, date);
  const jewishDate = toJewishDate(date);
  console.log("jewishDate", jewishDate);

  const jewishDateInEnglish = formatJewishDate(jewishDate);
  console.log("jewishDateInEnglish", jewishDateInEnglish);

  const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
  console.log("jewishDateInHebrew", jewishDateInHebrew);

  const jewishDateInHebrewStr = formatJewishDateInHebrew(jewishDate);
  console.log("jewishDateInHebrewStr", jewishDateInHebrewStr);

  console.log(jewishDate);
  const gregorianDate = toGregorianDate(jewishDate);
  console.log(gregorianDate);

  const jewishDate2 = {
    year: 5784,
    monthName: JewishMonth.Kislev,
    day: 1,
  };
  console.log(jewishDate2);
  const date2 = toGregorianDate(jewishDate2);
  console.log(date2);

  const n3 = numberToHebrewLetter(3);
  const n10 = numberToHebrewLetter(10);
  const n20 = numberToHebrewLetter(20);
  const n21 = numberToHebrewLetter(21);
  const n30 = numberToHebrewLetter(30);
  console.log(n3);
  console.log(n10);
  console.log(n20);
  console.log(n30);

  const numberOfDaysInCheshvan = calcDaysInMonth(5783, JewishMonth.Cheshvan);
  const numberOfDaysInKislev = calcDaysInMonth(5783, JewishMonth.Kislev);
  console.log({ numberOfDaysInCheshvan, numberOfDaysInKislev });

  return jewishDate;
};
const date = new Date(2023, 4, 9); // the month is 0-indexed (4 = May)
// const date = new Date();

const jewishDate = test(date);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <div>
    <div>{formatDate(date)}</div>

    <div>
      {jewishDate.day}-{jewishDate.monthName}-{jewishDate.year}
    </div>
    <div>{formatJewishDateInHebrew(jewishDate)}</div>
  </div>,
);
