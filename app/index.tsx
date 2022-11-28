import * as React from "react";
import { createRoot } from "react-dom/client";
import { formatJewishDate, JewishMonth } from "../src";
import {
  toJewishDate,
  toGregorianDate,
  formatJewishDateInHebrew,
  toHebrewJewishDate,
} from "../src/";

import "./index.css";

export const test = () => {
  const date1 = new Date("2020-01-01");
  console.log({ date1 });
  const jewishDate = toJewishDate(date1);
  console.log(jewishDate);

  const jewishDateInEnglish = formatJewishDate(jewishDate);
  console.log(jewishDateInEnglish);

  const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
  console.log(jewishDateInHebrew);

  const date2 = toGregorianDate({
    year: 5780,
    monthName: JewishMonth.Tevet,
    day: 4,
  });
  console.log({ date: date2 });
  return jewishDate;
};

const jewishDate = test();

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <div>
    <div>
      {jewishDate.day}-{jewishDate.monthName}-{jewishDate.year}
    </div>
    <div>{formatJewishDateInHebrew(jewishDate)}</div>
  </div>
);
