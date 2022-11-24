import gematriya from "gematriya";
import {
  BasicJewishDate,
  BasicJewishDateHebrew,
  JewishMonth,
  JewishMonthType,
} from "./interfaces";

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
export const getJewishMonthInHebrew = (
  jewishMonth: JewishMonthType
): string => {
  return jewishMonthsHebrewNamesDic[jewishMonth];
};

export const convertNumberToHebrew = (
  num: number,
  addGeresh = true,
  addPunctuate = true
): string => {
  return gematriya(num, { geresh: addGeresh, punctuate: addPunctuate });
};

export const toHebrewJewishDate = (
  jewishDate: BasicJewishDate
): BasicJewishDateHebrew => {
  return {
    day: convertNumberToHebrew(jewishDate.day),
    monthName: getJewishMonthInHebrew(jewishDate.monthName),
    year: convertNumberToHebrew(jewishDate.year),
  };
};
export const formatJewishDateInHebrew = (
  jewishDate: BasicJewishDate
): string => {
  const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
  return `${jewishDateInHebrew.day} ${jewishDateInHebrew.monthName} ${jewishDateInHebrew.year}`;
};
