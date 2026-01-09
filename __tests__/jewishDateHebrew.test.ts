import { expect, it, describe } from 'vitest'
import { JewishMonth } from "../src/interfaces";
import { toJewishDate } from "../src/jewishDate";
import {
  formatJewishDateInHebrew,
  convertNumberToHebrew,
  getJewishMonthInHebrew,
  toHebrewJewishDate,
  convertYearToShortHebrew,
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

  it("Convert year to short hebrew", () => {
    const shortYear = convertYearToShortHebrew(5783);
    expect(shortYear).toStrictEqual("פ״ג");
  });

  it("Format jewish date in hebrew with explicit gematria pattern", () => {
    const date = new Date(2022, 8, 26); // the month is 0-indexed
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate, "D MMMM YYYY");
    expect(jewishDateInHebrew).toStrictEqual("א׳ תשרי התשפ״ג");
  });

  it("Format jewish date in hebrew with numeric pattern dd/MM/yyyy", () => {
    const date = new Date(2023, 3, 26); // 5 Iyyar 5783
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate, "dd/MM/yyyy");
    expect(jewishDateInHebrew).toStrictEqual("05/02/5783");
  });

  it("Format jewish date in hebrew with short numeric year yy", () => {
    const date = new Date(2023, 3, 26); // 5 Iyyar 5783
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate, "d/M/yy");
    expect(jewishDateInHebrew).toStrictEqual("5/2/83");
  });

  it("Format jewish date in hebrew with gematria day and year", () => {
    const date = new Date(2023, 3, 26); // 5 Iyyar 5783
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate, "D/MM/YY");
    expect(jewishDateInHebrew).toStrictEqual("ה׳/02/פ״ג");
  });

  it("Format jewish date in hebrew with mixed numeric and Hebrew", () => {
    const date = new Date(2023, 3, 26); // 5 Iyyar 5783
    const jewishDate = toJewishDate(date);
    const jewishDateInHebrew = formatJewishDateInHebrew(jewishDate, "d MMMM yyyy");
    expect(jewishDateInHebrew).toStrictEqual("5 אייר 5783");
  });
});
