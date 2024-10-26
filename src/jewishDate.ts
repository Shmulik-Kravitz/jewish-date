/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

import type {
  BasicJewishDate,
  JewishDate,
  JewishMonthType,
} from "./interfaces";
import { JewishMonth } from "./interfaces";
import {
  gregorianToJd,
  hebrewMonthDays,
  hebrewToJd,
  jdToGregorian,
  jdToHebrew,
} from "./utils/dateUtils/dateUtils";
import { toLength } from "./utils/numberUtils/numberUtils";

/**
 * Checks if the given year is a leap year according to the Jewish calendar.
 * @param {number} year - The year to check.
 * @returns {boolean} True if the given year is a leap year according to the Jewish calendar, false otherwise.
 */
export const isLeapYear = (year: number): boolean => {
  const yearIndex = year % 19;
  return (
    yearIndex === 0 ||
    yearIndex === 3 ||
    yearIndex === 6 ||
    yearIndex === 8 ||
    yearIndex === 11 ||
    yearIndex === 14 ||
    yearIndex === 17
  );
};

/**
 * Returns the index of the given Jewish month in the Jewish calendar.
 * @param {JewishMonthType} jewishMonth - The Jewish month to get the index for.
 * @returns {number} The index of the given Jewish month in the Jewish calendar.
 */
export const getIndexByJewishMonth = (jewishMonth: JewishMonthType): number => {
  const jewishMonthsNamesDic = {
    [JewishMonth.None]: 0,

    [JewishMonth.Tishri]: 7,
    [JewishMonth.Cheshvan]: 8,
    [JewishMonth.Kislev]: 9,
    [JewishMonth.Tevet]: 10,
    [JewishMonth.Shevat]: 11,
    [JewishMonth.Adar]: 12,
    [JewishMonth.AdarI]: 12,
    [JewishMonth.AdarII]: 13,
    [JewishMonth.Nisan]: 1,
    [JewishMonth.Iyyar]: 2,
    [JewishMonth.Sivan]: 3,
    [JewishMonth.Tammuz]: 4,
    [JewishMonth.Av]: 5,
    [JewishMonth.Elul]: 6,
  };
  return jewishMonthsNamesDic[jewishMonth] || 0;
};

/**
 *  Returns the Jewish month corresponding to the given index in the Jewish calendar of the given year.
 * @param {number} index - The index of the Jewish month to get (1-based).
 * @param {number} jewishYear - The year to get the Jewish month in.
 * @returns {JewishMonthType} The Jewish month corresponding to the given index in the Jewish calendar of the given year.
 */
export const getJewishMonthByIndex = (
  index: number,
  jewishYear: number,
): JewishMonthType => {
  const jewishMonths: JewishMonthType[] = [
    JewishMonth.None,
    JewishMonth.Nisan,
    JewishMonth.Iyyar,
    JewishMonth.Sivan,
    JewishMonth.Tammuz,
    JewishMonth.Av,
    JewishMonth.Elul,
    JewishMonth.Tishri,
    JewishMonth.Cheshvan,
    JewishMonth.Kislev,
    JewishMonth.Tevet,
    JewishMonth.Shevat,
    JewishMonth.Adar,
    JewishMonth.AdarII,
  ];

  const month = jewishMonths[index] || JewishMonth.None;
  if (month === JewishMonth.Adar && isLeapYear(jewishYear)) {
    return JewishMonth.AdarI;
  }
  return month;
};

/**
 *  Returns an array of the Jewish month names in the correct order for the given year.
 *  @param {number} year - The Jewish year to get the months for.
 *  @returns {string[]} An array of the Jewish month names in the correct order for the given year.
 *  */
export const getJewishMonthsInOrder = (year: number): string[] => {
  const jewishMonthsInOrder: JewishMonthType[] = [
    JewishMonth.None,
    JewishMonth.Tishri,
    JewishMonth.Cheshvan,
    JewishMonth.Kislev,
    JewishMonth.Tevet,
    JewishMonth.Shevat,
    JewishMonth.AdarI,
    JewishMonth.AdarII,
    JewishMonth.Nisan,
    JewishMonth.Iyyar,
    JewishMonth.Sivan,
    JewishMonth.Tammuz,
    JewishMonth.Av,
    JewishMonth.Elul,
  ];
  if (isLeapYear(year)) {
    return jewishMonthsInOrder;
  }

  return jewishMonthsInOrder
    .filter((month) => month !== "AdarII")
    .map((month) => {
      if (month === "AdarI") {
        return "Adar";
      }

      return month;
    });
};

/**
 * Returns a string representation of the given Jewish date in the format 'כ"א ניסן תשפ"ג'.
 * @param {JewishDate} jewishDate - The Jewish date to format.
 * @returns {string} A string representation of the given Jewish date in the format 'כ"א ניסן תשפ"ג'.
 */
export const formatJewishDate = (jewishDate: JewishDate): string => {
  return `${jewishDate.day} ${jewishDate.monthName} ${jewishDate.year}`;
};

/**
 * Converts the given Gregorian date to a Jewish date.
 * @param {Date} date - The Gregorian date to convert.
 * @returns {JewishDate} The Jewish date corresponding to the given Gregorian date.
 */
export const toJewishDate = (date: Date): JewishDate => {
  const year = date.getFullYear();

  /*
  Note: The month in JavaScript's Date object is 0-indexed (January is 0, December is 11).
  To convert to a correct date representation, we will add 1 to the month value.
  */
  const month = date.getMonth() + 1;

  const day = date.getDate();
  //   console.log({ year, month, day });

  const jd2 = gregorianToJd(year, month, day);

  const jewishDateArr = jdToHebrew(jd2);
  // console.log(jewishDateArr);

  const jewishYear = jewishDateArr[0];
  const jewishMonthName = getJewishMonthByIndex(jewishDateArr[1], jewishYear);
  // console.log({ jewishMonthName });
  const jewishMonth = getJewishMonthsInOrder(jewishYear).findIndex(
    (i) => i === jewishMonthName,
  );
  const JewishDate: JewishDate = {
    year: jewishYear,
    monthName: jewishMonthName,
    month: jewishMonth,
    day: jewishDateArr[2],
  };
  return JewishDate;
};

/**
 * Converts the given Jewish date to a Gregorian date.
 * @param {BasicJewishDate} jewishDate - The Jewish date to convert.
 * @returns {Date} The Gregorian date corresponding to the given Jewish date.
 * */
export const toGregorianDate = (jewishDate: BasicJewishDate): Date => {
  const jewishMonth = getIndexByJewishMonth(jewishDate.monthName);
  // console.log({ jewishMonth });
  const jd = hebrewToJd(jewishDate.year, jewishMonth, jewishDate.day);
  // console.log(jd);

  const gregDateArr = jdToGregorian(jd);
  // console.log(gregDateArr);

  const date = new Date();
  // Convert month to month index.
  date.setFullYear(gregDateArr[0], gregDateArr[1] - 1, gregDateArr[2]);
  if (date.getHours() > 0) {
    // fix issue in chrome that we chan't set hours in Date Constructor for year 0000
    date.setHours(0, 0, 0, 0);
  }
  return date;
};

/**
 * Calculates the number of days in a Jewish month for a given Jewish year.
 * @param {number} jewishYear - The Jewish year for which the calculation is performed.
 * @param {JewishMonthType} jewishMonth - The type of Jewish month (e.g., 'Heshvan', 'Kislev').
 * @returns {number} - The number of days in the specified Jewish month of the given year.
 */
export const calcDaysInMonth = (
  jewishYear: number,
  jewishMonth: JewishMonthType,
): number => {
  const jewishMonthIndex = getIndexByJewishMonth(jewishMonth);
  return hebrewMonthDays(jewishYear, jewishMonthIndex);
};
