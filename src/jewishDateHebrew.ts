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
import { getIndexByJewishMonth } from "./jewishDate";
import {
  DEFAULT_PATTERN_HEBREW,
  createHebrewFormatters,
  formatWithPattern,
} from "./utils/formatUtils";

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
 * Converts a year to its short Hebrew equivalent (last two significant digits).
 * For example, 5783 → פ״ג (83 in gematria)
 * @param year - The year to convert
 * @returns The short Hebrew equivalent of the year
 */
export const convertYearToShortHebrew = (year: number): string => {
  const shortYear = year % 100;
  return gematriya(shortYear, { geresh: true, punctuate: true });
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
 * @param {string} [pattern] - Optional format pattern (e.g., "D MMMM YYYY", "dd/MM/yyyy").
 *   Supported tokens:
 *   - Lowercase (numeric): d, dd (day), M, MM (month), yy, yyyy (year)
 *   - Uppercase (gematria): D (day), YY, YYYY (year)
 *   - MMMM (Hebrew month name)
 *   Default pattern: "D MMMM YYYY" (all Hebrew gematria)
 * @returns {string} The Hebrew string representation of the Jewish date.
 */
export const formatJewishDateInHebrew = (
  jewishDate: BasicJewishDate,
  pattern?: string,
): string => {
  const formatPattern = pattern ?? DEFAULT_PATTERN_HEBREW;
  const hebrewFormatters = createHebrewFormatters(
    convertNumberToHebrew,
    (monthName) => getJewishMonthInHebrew(monthName as JewishMonthType),
    convertYearToShortHebrew,
  );
  return formatWithPattern(
    formatPattern,
    {
      day: jewishDate.day,
      month: getIndexByJewishMonth(jewishDate.monthName),
      monthName: jewishDate.monthName,
      year: jewishDate.year,
    },
    hebrewFormatters,
  );
};
