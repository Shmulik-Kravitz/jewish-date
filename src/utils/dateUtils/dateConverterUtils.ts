/* eslint-disable */
/*
       JavaScript functions for the Fourmilab Calendar Converter

                  by John Walker  --  September, MIM
              http://www.fourmilab.ch/documents/calendar/

                This program is in the public domain.
*/

// import { mod } from "./astroUtils";

// import { jwday, mod, amod, jhms, equinox, deltat, equationOfTime, TropicalYear } from "./astroUtils";

export function mod(a: number, b: number) {
  return a - b * Math.floor(a / b);
}

//  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?

function leap_gregorian(year: number) {
  return year % 4 == 0 && !(year % 100 == 0 && year % 400 != 0);
}

//  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

var GREGORIAN_EPOCH = 1721425.5;

export function gregorian_to_jd(year: number, month: number, day: number) {
  return (
    GREGORIAN_EPOCH -
    1 +
    365 * (year - 1) +
    Math.floor((year - 1) / 4) +
    -Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    Math.floor(
      (367 * month - 362) / 12 +
        (month <= 2 ? 0 : leap_gregorian(year) ? -1 : -2) +
        day
    )
  );
}

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

export function jd_to_gregorian(jd: number) {
  var wjd,
    depoch,
    quadricent,
    dqc,
    cent,
    dcent,
    quad,
    dquad,
    yindex,
    yearday,
    leapadj;

  wjd = Math.floor(jd - 0.5) + 0.5;
  depoch = wjd - GREGORIAN_EPOCH;
  quadricent = Math.floor(depoch / 146097);
  dqc = mod(depoch, 146097);
  cent = Math.floor(dqc / 36524);
  dcent = mod(dqc, 36524);
  quad = Math.floor(dcent / 1461);
  dquad = mod(dcent, 1461);
  yindex = Math.floor(dquad / 365);
  let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
  if (!(cent == 4 || yindex == 4)) {
    year++;
  }
  yearday = wjd - gregorian_to_jd(year, 1, 1);
  leapadj =
    wjd < gregorian_to_jd(year, 3, 1) ? 0 : leap_gregorian(year) ? 1 : 2;
  const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
  const day = wjd - gregorian_to_jd(year, month, 1) + 1;

  return [year, month, day];
}
//  HEBREW_TO_JD  --  Determine Julian day from Hebrew date

var HEBREW_EPOCH = 347995.5;

//  Is a given Hebrew year a leap year ?

function hebrew_leap(year: number) {
  return mod(year * 7 + 1, 19) < 7;
}

//  How many months are there in a Hebrew year (12 = normal, 13 = leap)

function hebrew_year_months(year: any) {
  return hebrew_leap(year) ? 13 : 12;
}

//  Test for delay of start of new year and to avoid
//  Sunday, Wednesday, and Friday as start of the new year.

function hebrew_delay_1(year: number) {
  var months, parts;

  months = Math.floor((235 * year - 234) / 19);
  parts = 12084 + 13753 * months;
  let day = months * 29 + Math.floor(parts / 25920);

  if (mod(3 * (day + 1), 7) < 3) {
    day++;
  }
  return day;
}

//  Check for delay in start of new year due to length of adjacent years

function hebrew_delay_2(year: number) {
  var last, present, next;

  last = hebrew_delay_1(year - 1);
  present = hebrew_delay_1(year);
  next = hebrew_delay_1(year + 1);

  return next - present == 356 ? 2 : present - last == 382 ? 1 : 0;
}

//  How many days are in a Hebrew year ?

function hebrew_year_days(year: number) {
  return hebrew_to_jd(year + 1, 7, 1) - hebrew_to_jd(year, 7, 1);
}

//  How many days are in a given month of a given year

function hebrew_month_days(year: number, month: number) {
  //  First of all, dispose of fixed-length 29 day months

  if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 10 ||
    month === 13
  ) {
    return 29;
  }

  //  If it's not a leap year, Adar has 29 days

  if (month === 12 && !hebrew_leap(year)) {
    return 29;
  }

  //  If it's Heshvan, days depend on length of year

  if (month === 8 && !(mod(hebrew_year_days(year), 10) === 5)) {
    return 29;
  }

  //  Similarly, Kislev varies with the length of year

  if (month === 9 && mod(hebrew_year_days(year), 10) === 3) {
    return 29;
  }

  //  Nope, it's a 30 day month

  return 30;
}

//  Finally, wrap it all up into...

export function hebrew_to_jd(year: number, month: number, day: number) {
  var jd, mon, months;

  months = hebrew_year_months(year);
  jd = HEBREW_EPOCH + hebrew_delay_1(year) + hebrew_delay_2(year) + day + 1;

  if (month < 7) {
    for (mon = 7; mon <= months; mon++) {
      jd += hebrew_month_days(year, mon);
    }
    for (mon = 1; mon < month; mon++) {
      jd += hebrew_month_days(year, mon);
    }
  } else {
    for (mon = 7; mon < month; mon++) {
      jd += hebrew_month_days(year, mon);
    }
  }

  return jd;
}

/*  JD_TO_HEBREW  --  Convert Julian date to Hebrew date
                          This works by making multiple calls to
                          the inverse function, and is this very
                          slow.  */

export function jd_to_hebrew(jd: number) {
  var year, month, day, i, count, first;

  jd = Math.floor(jd) + 0.5;
  count = Math.floor(((jd - HEBREW_EPOCH) * 98496.0) / 35975351.0);
  year = count - 1;
  for (i = count; jd >= hebrew_to_jd(i, 7, 1); i++) {
    year++;
  }
  first = jd < hebrew_to_jd(year, 1, 1) ? 7 : 1;
  month = first;
  for (i = first; jd > hebrew_to_jd(year, i, hebrew_month_days(year, i)); i++) {
    month++;
  }
  day = jd - hebrew_to_jd(year, month, 1) + 1;
  return [year, month, day];
}