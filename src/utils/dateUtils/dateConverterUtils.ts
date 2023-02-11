/*
       JavaScript functions for the Fourmilab Calendar Converter

                  by John Walker  --  September, MIM
              http://www.fourmilab.ch/documents/calendar/

                This program is in the public domain.
*/


const gregorianEpoch = 1721425.5;

const hebrewEpoch = 347995.5;

export function mod(a: number, b: number) {
  return a - b * Math.floor(a / b);
}

//  leapGregorian  --  Is a given year in the Gregorian calendar a leap year ?

function leapGregorian(year: number) {
  return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
}

//  gregorianToJd  --  Determine Julian day number from Gregorian calendar date

export function gregorianToJd(year: number, month: number, day: number) {
  return (
    gregorianEpoch -
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

//  jdToGregorian  --  Calculate Gregorian calendar date from Julian day

export function jdToGregorian(jd: number) {
  let wjd;
  let depoch;
  let quadricent;
  let dqc;
  let cent;
  let dcent;
  let quad;
  let dquad;
  let yindex;
  let yearday;
  let leapadj;

  wjd = Math.floor(jd - 0.5) + 0.5;
  depoch = wjd - gregorianEpoch;
  quadricent = Math.floor(depoch / 146097);
  dqc = mod(depoch, 146097);
  cent = Math.floor(dqc / 36524);
  dcent = mod(dqc, 36524);
  quad = Math.floor(dcent / 1461);
  dquad = mod(dcent, 1461);
  yindex = Math.floor(dquad / 365);
  let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
  if (!(cent === 4 || yindex === 4)) {
    year++;
  }
  yearday = wjd - gregorianToJd(year, 1, 1);
  leapadj = wjd < gregorianToJd(year, 3, 1) ? 0 : leapGregorian(year) ? 1 : 2;
  const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
  const day = wjd - gregorianToJd(year, month, 1) + 1;

  return [year, month, day];
}


//  Is a given Hebrew year a leap year ?

function hebrewLeap(year: number) {
  return mod(year * 7 + 1, 19) < 7;
}

//  How many months are there in a Hebrew year (12 = normal, 13 = leap)

function hebrewYearMonths(year: number) {
  return hebrewLeap(year) ? 13 : 12;
}

//  Test for delay of start of new year and to avoid
//  Sunday, Wednesday, and Friday as start of the new year.

function hebrewDelay1(year: number) {
  let months;
  let parts;

  months = Math.floor((235 * year - 234) / 19);
  parts = 12084 + 13753 * months;
  let day = months * 29 + Math.floor(parts / 25920);

  if (mod(3 * (day + 1), 7) < 3) {
    day++;
  }
  return day;
}

//  Check for delay in start of new year due to length of adjacent years

function hebrewDelay2(year: number) {
  let last;
  let present;
  let next;

  last = hebrewDelay1(year - 1);
  present = hebrewDelay1(year);
  next = hebrewDelay1(year + 1);

  return next - present === 356 ? 2 : present - last === 382 ? 1 : 0;
}

//  How many days are in a Hebrew year ?

function hebrewYearDays(year: number) {
  return hebrewToJd(year + 1, 7, 1) - hebrewToJd(year, 7, 1);
}

//  How many days are in a given month of a given year

function hebrewMonthDays(year: number, month: number) {
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

//  hebrewToJd  --  Determine Julian day from Hebrew date

export function hebrewToJd(year: number, month: number, day: number) {
  let jd;
  let mon;
  let months;

  months = hebrewYearMonths(year);
  jd = hebrewEpoch + hebrewDelay1(year) + hebrewDelay2(year) + day + 1;

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

/*  JD_TO_HEBREW  --  Convert Julian date to Hebrew date
                          This works by making multiple calls to
                          the inverse function, and is this very
                          slow.  */

export function jdToHebrew(jd: number) {
  let year;
  let month;
  let day;
  let i;
  let count;
  let first;

  jd = Math.floor(jd) + 0.5;
  count = Math.floor(((jd - hebrewEpoch) * 98496.0) / 35975351.0);
  year = count - 1;
  for (i = count; jd >= hebrewToJd(i, 7, 1); i++) {
    year++;
  }
  first = jd < hebrewToJd(year, 1, 1) ? 7 : 1;
  month = first;
  for (i = first; jd > hebrewToJd(year, i, hebrewMonthDays(year, i)); i++) {
    month++;
  }
  day = jd - hebrewToJd(year, month, 1) + 1;
  return [year, month, day];
}
