/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

import * as React from "react";
import { createRoot } from "react-dom/client";
import { formatJewishDate, JewishMonth } from "../src";
import {
  toJewishDate,
  toGregorianDate,
  formatJewishDateInHebrew,
  toHebrewJewishDate,
} from "../src/";
import { toLength } from "../src/utils/numberUtils";

import "./index.css";

const formatDate = (date: Date) =>
  `${toLength(date.getFullYear(), 4)}-${toLength(
    date.getMonth() + 1,
    2
  )}-${toLength(date.getDate(), 2)}`;

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
  date = toGregorianDate(jewishDate);
  console.log(date);

  const jewishDate2 = {
    year: 5782,
    monthName: JewishMonth.AdarII,
    day: 1,
  };
  console.log(jewishDate2);
  const date2 = toGregorianDate(jewishDate2);
  console.log(date2);
  return jewishDate;
};
const date = new Date("2023-05-09");
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
  </div>
);
