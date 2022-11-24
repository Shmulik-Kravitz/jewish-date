import {
  BasicJewishDate,
  JewishDate,
  BasicJewishDateHebrew,
  JewishMonth,
  JewishMonthType,
} from "./interfaces";
import {
  gregorian_to_jd,
  hebrew_to_jd,
  jd_to_gregorian,
  jd_to_hebrew,
} from "./utils/dateUtils";
import { toLength } from "./utils/numberUtils";

const jewishMonthsNamesDic = {
  [JewishMonth.None]: 0,

  [JewishMonth.Tishri]: 7,
  [JewishMonth.Cheshvan]: 8,
  [JewishMonth.Kislev]: 9,
  [JewishMonth.Tevet]: 10,
  [JewishMonth.Shevat]: 11,
  [JewishMonth.Adar]: 12,
  [JewishMonth.AdarI]: 13,
  [JewishMonth.AdarII]: 14,
  [JewishMonth.Nisan]: 1,
  [JewishMonth.Iyyar]: 2,
  [JewishMonth.Sivan]: 3,
  [JewishMonth.Tammuz]: 4,
  [JewishMonth.Av]: 5,
  [JewishMonth.Elul]: 6,
};

export const getIndexByJewishMonth = (jewishMonth: JewishMonthType): number => {
  return jewishMonthsNamesDic[jewishMonth] || 0;
};

const jewishMonths: JewishMonthType[] = [
  JewishMonth.None,
  JewishMonth.Nisan,
  JewishMonth.Sivan,
  JewishMonth.Tammuz,
  JewishMonth.Iyyar,
  JewishMonth.Av,
  JewishMonth.Elul,
  JewishMonth.Tishri,
  JewishMonth.Cheshvan,
  JewishMonth.Kislev,
  JewishMonth.Tevet,
  JewishMonth.Shevat,
  JewishMonth.Adar,
  JewishMonth.AdarI,
  JewishMonth.AdarII,
];

export const getJewishMonthByIndex = (index: number): JewishMonthType => {
  return jewishMonths[index] || JewishMonth.None;
};

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
  JewishMonth.Sivan,
  JewishMonth.Tammuz,
  JewishMonth.Iyyar,
  JewishMonth.Av,
  JewishMonth.Elul,
];

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

export const getJewishMonthsInOrder = (year: number): string[] => {
  if (isLeapYear(year)) {
    return jewishMonthsInOrder;
  } else {
    return jewishMonthsInOrder
      .filter((month) => month !== `AdarII`)
      .map((month) => {
        if (month == `AdarI`) {
          return `Adar`;
        } else {
          return month;
        }
      });
  }
};

export const formatJewishDate = (jewishDate: JewishDate): string => {
  return `${jewishDate.day} ${jewishDate.monthName} ${jewishDate.year}`;
};

export const toJewishDate = (date: Date): JewishDate => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  //   console.log({ year, month, day });
  const jd2 = gregorian_to_jd(year, month, day);

  const jewishDateArr = jd_to_hebrew(jd2);
  // console.log(jewishDateArr);

  const jewishYear = jewishDateArr[0];
  const jewishMonthName = getJewishMonthByIndex(jewishDateArr[1]);
  const jewishMonth = getJewishMonthsInOrder(jewishYear).findIndex(
    (i) => i === jewishMonthName
  );
  const JewishDate: JewishDate = {
    year: jewishYear,
    monthName: jewishMonthName,
    month: jewishMonth,
    day: jewishDateArr[2],
  };
  return JewishDate;
};

export const toGregorianDate = (jewishDate: BasicJewishDate): Date => {
  const jd = hebrew_to_jd(
    jewishDate.year,
    getIndexByJewishMonth(jewishDate.monthName),
    jewishDate.day
  );
  // console.log(jd);
  const gregDateArr = jd_to_gregorian(jd);
  // console.log(gregDateArr);
  const dateStr = `${toLength(gregDateArr[0], 4)}-${toLength(
    gregDateArr[1],
    2
  )}-${toLength(gregDateArr[2], 2)}`;
  // console.log(dateStr);
  const date = new Date(dateStr);
  if (date.getHours() > 0) {
    // fix issue in chrome that we chan't set hours in Date Constructor for year 0000
    date.setHours(0, 0, 0, 0);
  }
  return date;
};
