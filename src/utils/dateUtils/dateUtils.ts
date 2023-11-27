/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

const GREGORIAN_EPOCH = 1721425.5;

const HEBREW_EPOCH = 347995.5;

/**
 * Computes the remainder of the division of `a` by `b`.
 * Unlike the built-in JavaScript `%` operator, this function handles negative numbers properly.
 * For example, `mod(-1, 5)` returns `4`, not `-1`.
 * @param {number} a - The number to compute the remainder of.
 * @param {number} b - The divisor.
 * @returns {number} - The remainder of `a` divided by `b`.
 */
export function mod(a: number, b: number) {
  return a - b * Math.floor(a / b);
}

/**
 * Determines if a given year is a leap year in the Gregorian calendar.
 * @param year The year to check.
 * @returns True if the year is a leap year, false otherwise.
 */
function leapGregorian(year: number) {
  return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
}

/**
 * Converts Gregorian date to Julian Day.
 * @param {number} year - The year in the Gregorian calendar.
 * @param {number} month - The month in the Gregorian calendar (January = 1).
 * @param {number} day - The day of the month in the Gregorian calendar.
 * @returns {number} The Julian Day corresponding to the Gregorian date.
 */
export function gregorianToJd(
  year: number,
  month: number,
  day: number,
): number {
  return (
    GREGORIAN_EPOCH -
    1 +
    365 * (year - 1) +
    Math.floor((year - 1) / 4) +
    -Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor(
      (367 * month - 362) / 12 +
        (month <= 2 ? 0 : leapGregorian(year) ? -1 : -2) +
        day,
    )
  );
}

/**
 * Converts a Julian day number to Gregorian date.
 * @param {number} jd - The Julian day number to convert.
 * @returns {[number, number, number]} The Gregorian date as a tuple in the form of [year, month, day].
 */
export function jdToGregorian(jd: number): [number, number, number] {
  const wjd: number = Math.floor(jd - 0.5) + 0.5;
  const depoch: number = wjd - GREGORIAN_EPOCH;
  const quadricent: number = Math.floor(depoch / 146097);
  const dqc: number = mod(depoch, 146097);
  const cent: number = Math.floor(dqc / 36524);
  const dcent: number = mod(dqc, 36524);
  const quad: number = Math.floor(dcent / 1461);
  const dquad: number = mod(dcent, 1461);
  const yindex: number = Math.floor(dquad / 365);
  let year: number = quadricent * 400 + cent * 100 + quad * 4 + yindex;
  if (!(cent === 4 || yindex === 4)) {
    year++;
  }
  const yearday: number = wjd - gregorianToJd(year, 1, 1);
  const leapadj: number =
    wjd < gregorianToJd(year, 3, 1) ? 0 : leapGregorian(year) ? 1 : 2;
  const month: number = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
  const day: number = wjd - gregorianToJd(year, month, 1) + 1;

  return [year, month, day];
}

/**
 * Determines if a Hebrew year is a leap year.
 * A leap year occurs 7 times in a 19 year cycle.
 * @param year - the Hebrew year to check
 * @returns true if the year is a leap year, false otherwise
 */
function hebrewLeap(year: number) {
  return mod(year * 7 + 1, 19) < 7;
}

/**
 * Returns the number of months in a Hebrew year
 * @param {number} year - The Hebrew year
 * @returns {number} The number of months in the Hebrew year (12 or 13)
 */
function hebrewYearMonths(year: number) {
  return hebrewLeap(year) ? 13 : 12;
}

/**
 * Calculates the delay of the start of the Hebrew year, taking into account the "dechiya" (postponement) rules
 * specified in the Mishnah, which state that the start of the year can't be Sunday, Wednesday, or Friday.
 * @param {number} year - The Hebrew year for which to calculate the delay.
 * @returns {number} The day of the molad (the moment of the astronomical new moon) for the specified Hebrew year.
 */
function calculateHebrewYearStartDelay(year: number) {
  const months = Math.floor((235 * year - 234) / 19);
  const parts = 12084 + 13753 * months;
  let day = months * 29 + Math.floor(parts / 25920);

  if (mod(3 * (day + 1), 7) < 3) {
    day++;
  }
  return day;
}

/**
 * Calculates the delay of the start of the Hebrew year due to the length of adjacent years,
 * taking into account the "dechiya" (postponement) rules specified in the Mishnah.
 * The rules state that if the length of the year that is next in the 19-year cycle
 * (i.e., in the year after the current year) is exactly 356 days, then the start of the current year
 * is delayed by two days. Similarly, if the length of the year that immediately precedes the current year
 * is 382 days, then the start of the current year is delayed by one day. Otherwise, there is no delay.
 *
 * @param year - The Hebrew year for which to calculate the delay.
 * @returns The delay in days of the start of the Hebrew year.
 */
function calculateHebrewYearAdjacentDelay(year: number) {
  const last = calculateHebrewYearStartDelay(year - 1);
  const present = calculateHebrewYearStartDelay(year);
  const next = calculateHebrewYearStartDelay(year + 1);

  return next - present === 356 ? 2 : present - last === 382 ? 1 : 0;
}

/**
 * Calculates the number of days in a Hebrew year.
 * @param {number} year - The Hebrew year to calculate.
 * @returns {number} - The number of days in the Hebrew year.
 */
function hebrewYearDays(year: number) {
  return hebrewToJd(year + 1, 7, 1) - hebrewToJd(year, 7, 1);
}

/**
 * Calculates the number of days in the specified month of the Hebrew year.
 * @param {number} year - The Hebrew year.
 * @param {number} month - The month of the year, where Nisan is 1 and Adar II (in leap years) is 13.
 * @returns {number} - The number of days in the specified month.
 */
export function hebrewMonthDays(year: number, month: number) {
  if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 10 ||
    month === 13
  ) {
    return 29;
  }

  if (month === 12 && !hebrewLeap(year)) {
    return 29;
  }

  if (month === 8 && !(mod(hebrewYearDays(year), 10) === 5)) {
    return 29;
  }

  if (month === 9 && mod(hebrewYearDays(year), 10) === 3) {
    return 29;
  }

  return 30;
}

/**
 * Converts a Hebrew date to the corresponding Julian day.
 * @param {number} year - The Hebrew year.
 * @param {number} month - The Hebrew month (1-13).
 * @param {number} day - The day of the month.
 * @returns {number} The Julian day corresponding to the Hebrew date.
 */
export function hebrewToJd(year: number, month: number, day: number) {
  let mon: number;

  const months = hebrewYearMonths(year);
  let jd =
    HEBREW_EPOCH +
    calculateHebrewYearStartDelay(year) +
    calculateHebrewYearAdjacentDelay(year) +
    day +
    1;

  if (month < 7) {
    for (mon = 7; mon <= months; mon++) {
      jd += hebrewMonthDays(year, mon);
    }
    for (mon = 1; mon < month; mon++) {
      jd += hebrewMonthDays(year, mon);
    }
  } else {
    for (mon = 7; mon < month; mon++) {
      jd += hebrewMonthDays(year, mon);
    }
  }

  return jd;
}

/**
 * Converts a Julian date to a Hebrew date.
 * @param jd - The Julian date to convert.
 * @returns The Hebrew date as a tuple in the form of [year, month, day].
 */
export function jdToHebrew(julianDate: number): [number, number, number] {
  const HEBREW_EPOCH = 347995.5;
  let year: number;
  let month: number;

  const jd = Math.floor(julianDate) + 0.5;
  const count: number = Math.floor(
    ((jd - HEBREW_EPOCH) * 98496.0) / 35975351.0,
  );
  year = count - 1;
  for (let i = count; jd >= hebrewToJd(i, 7, 1); i++) {
    year++;
  }
  const first: number = jd < hebrewToJd(year, 1, 1) ? 7 : 1;
  month = first;
  for (let i = first; jd > hebrewToJd(year, i, hebrewMonthDays(year, i)); i++) {
    month++;
  }
  const day = jd - hebrewToJd(year, month, 1) + 1;
  return [year, month, day];
}
