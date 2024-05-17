/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

import gematriya from "gematriya";
import type {
  BasicJewishDate,
  BasicJewishDateHebrew,
  JewishMonthType,
} from "./interfaces";
import { JewishMonth } from "./interfaces";

/**
 * Returns the name of a Jewish month in Hebrew, given its type.
 * @param {JewishMonthType} jewishMonth - The Jewish month type.
 * @returns {string} - The name of the Jewish month in Hebrew.
 */
export const getJewishMonthInHebrew = (
  jewishMonth: JewishMonthType,
): string => {
  const jewishMonthsHebrewNamesDic = {
    [JewishMonth.None]: "ללא",

    [JewishMonth.Tishri]: "תשרי",
    [JewishMonth.Cheshvan]: "חשון",
    [JewishMonth.Kislev]: "כסלו",
    [JewishMonth.Tevet]: "טבת",
    [JewishMonth.Shevat]: "שבט",
    [JewishMonth.Adar]: "אדר",
    [JewishMonth.AdarI]: "אדר א",
    [JewishMonth.AdarII]: "אדר ב",
    [JewishMonth.Nisan]: "ניסן",
    [JewishMonth.Iyyar]: "אייר",
    [JewishMonth.Sivan]: "סיון",
    [JewishMonth.Tammuz]: "תמוז",
    [JewishMonth.Av]: "אב",
    [JewishMonth.Elul]: "אלול",
  };
  return jewishMonthsHebrewNamesDic[jewishMonth];
};

/**
 * Converts a number to its Hebrew equivalent in gematria
 * @param num - The number to convert to Hebrew
 * @param addGeresh - Whether or not to add a geresh symbol (') to the end of the number
 * @param addPunctuate - Whether or not to add a punctuation mark (.) after the thousands digit
 * @returns The Hebrew equivalent of the given number
 */
export const convertNumberToHebrew = (
  num: number,
  addGeresh = true,
  addPunctuate = true,
): string => {
  return gematriya(num, { geresh: addGeresh, punctuate: addPunctuate });
};

/**
 * Converts a basic Jewish date object to a Hebrew date object with Hebrew letters.
 * @param {BasicJewishDate} jewishDate - The basic Jewish date object to convert.
 * @returns {BasicJewishDateHebrew} The Hebrew date object with Hebrew letters.
 */
export const toHebrewJewishDate = (
  jewishDate: BasicJewishDate,
): BasicJewishDateHebrew => {
  return {
    day: convertNumberToHebrew(jewishDate.day),
    monthName: getJewishMonthInHebrew(jewishDate.monthName),
    year: convertNumberToHebrew(jewishDate.year),
  };
};

/**
 * Formats a Jewish date object into a string representation in Hebrew.
 * @param {BasicJewishDate} jewishDate - The Jewish date object to format.
 * @returns {string} The Hebrew string representation of the Jewish date.
 */
export const formatJewishDateInHebrew = (
  jewishDate: BasicJewishDate,
): string => {
  const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
  return `${jewishDateInHebrew.day} ${jewishDateInHebrew.monthName} ${jewishDateInHebrew.year}`;
};
