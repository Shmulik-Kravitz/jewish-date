/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

/**
 * The names of the Jewish months.
 *
 * Month ordering in the Jewish calendar starts from Tishri (the first month of
 * the civil year).  The `month` index on {@link JewishDate} reflects this
 * ordering:
 *
 * | Index | Regular year | Leap year |
 * |-------|--------------|-----------|
 * |  0    | None         | None      |
 * |  1    | Tishri       | Tishri    |
 * |  2    | Cheshvan     | Cheshvan  |
 * |  3    | Kislev       | Kislev    |
 * |  4    | Tevet        | Tevet     |
 * |  5    | Shevat       | Shevat    |
 * |  6    | Adar         | AdarI     |
 * |  7    | Nisan        | AdarII    |
 * |  8    | Iyyar        | Nisan     |
 * |  9    | Sivan        | Iyyar     |
 * | 10    | Tammuz       | Sivan     |
 * | 11    | Av           | Tammuz    |
 * | 12    | Elul         | Av        |
 * | 13    | —            | Elul      |
 *
 * Index `0` (`None`) is a sentinel value used when no month is applicable.
 */
export const JewishMonth = {
  None: "None",

  Tishri: "Tishri",
  Cheshvan: "Cheshvan",
  Kislev: "Kislev",
  Tevet: "Tevet",
  Shevat: "Shevat",
  Adar: "Adar",
  Nisan: "Nisan",
  Iyyar: "Iyyar",
  Sivan: "Sivan",
  Tammuz: "Tammuz",
  Av: "Av",
  Elul: "Elul",

  AdarI: "AdarI",
  AdarII: "AdarII",
} as const;

export type JewishMonthType = keyof typeof JewishMonth;

export interface BasicJewishDate {
  /**
   *  day of month
   */
  day: number;

  /**
   * monthName
   */
  monthName: JewishMonthType;

  /**
   * year
   */
  year: number;
}

export interface JewishDate extends BasicJewishDate {
  /**
   * 1-based month index within the Jewish year, ordered from Tishri.
   * Index 0 is the sentinel value `None`.
   * In a regular (non-leap) year the range is 1–12; in a leap year 1–13.
   * See {@link JewishMonth} for the full index-to-month mapping.
   */
  month: number;
}

export interface BasicJewishDateHebrew {
  /**
   *  day of month
   */
  day: string;

  /**
   * monthName
   */
  monthName: string;

  /**
   * month
   */
  year: string;
}
