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
  const date1 = new Date("2022-03-04");
  console.log( date1);
  const jewishDate = toJewishDate(date1);
  console.log(jewishDate);

  const jewishDateInEnglish = formatJewishDate(jewishDate);
  console.log(jewishDateInEnglish);

  const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
  console.log(jewishDateInHebrew);

  const jewishDate2 = {
    year: 5782,
    monthName: JewishMonth.AdarII,
    day: 1,
  }
  console.log( jewishDate2 );
  const date2 = toGregorianDate(jewishDate2);
  console.log(date2);
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
