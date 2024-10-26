import { expect, it, describe } from 'vitest'
import { JewishMonth } from "../src/interfaces";
import { toJewishDate } from "../src/jewishDate";
import {
  formatJewishDateInHebrew,
  convertNumberToHebrew,
  getJewishMonthInHebrew,
  toHebrewJewishDate,
} from "../src";

describe("jewishDateHebrew", () => {
  it("Convert number to hebrew", () => {
    const gematriya = convertNumberToHebrew(5783);
    expect(gematriya).toStrictEqual("התשפ״ג");
  });

  it("Get jewish month in hebrew", () => {
    const jewishMonthInHebrew = getJewishMonthInHebrew(JewishMonth.Iyyar);
    expect(jewishMonthInHebrew).toStrictEqual("אייר");
  });

  it("To hebrew jewish date", () => {
    const date = new Date(2022, 8, 26); // the month is 0-indexed
    const jewishDate = toJewishDate(date);
    const jewishMonthInHebrew = toHebrewJewishDate(jewishDate);
    expect(jewishMonthInHebrew).toStrictEqual({
      day: "א׳",
      monthName: "תשרי",
      year: "התשפ״ג",
    });
  });

  it("Format jewish date in hebrew", () => {
    const date = new Date(2022, 8, 26); // the month is 0-indexed
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate);
    expect(jewishDateInHebrew).toStrictEqual("א׳ תשרי התשפ״ג");
  });
});
