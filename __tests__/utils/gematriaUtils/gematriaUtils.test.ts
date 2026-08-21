import { describe, expect, it } from "vitest";

import { toGematria } from "../../../src/utils/gematriaUtils";

describe("toGematria", () => {
  it("Converts single digits with a geresh", () => {
    expect(toGematria(1)).toStrictEqual("א׳");
    expect(toGematria(9)).toStrictEqual("ט׳");
  });

  it("Converts multiple letters with a gershayim", () => {
    expect(toGematria(11)).toStrictEqual("י״א");
    expect(toGematria(29)).toStrictEqual("כ״ט");
    expect(toGematria(5783)).toStrictEqual("התשפ״ג");
  });

  it("Avoids spelling a name of God", () => {
    expect(toGematria(15)).toStrictEqual("ט״ו");
    expect(toGematria(16)).toStrictEqual("ט״ז");
  });

  it("Spells out the hundreds above four hundred", () => {
    expect(toGematria(500)).toStrictEqual("ת״ק");
    expect(toGematria(900)).toStrictEqual("תת״ק");
    expect(toGematria(1000)).toStrictEqual("תת״ר");
  });

  it("Restarts the letters above a thousand", () => {
    expect(toGematria(2000)).toStrictEqual("ב׳");
    expect(toGematria(5000)).toStrictEqual("ה׳");
    expect(toGematria(20000)).toStrictEqual("כ׳");
  });

  it("Uses ASCII quotes when the geresh is turned off", () => {
    expect(toGematria(5, { geresh: false, punctuate: true })).toStrictEqual(
      "ה'",
    );
    expect(toGematria(5783, { geresh: false, punctuate: true })).toStrictEqual(
      'התשפ"ג',
    );
  });

  it("Omits the marks when both options are turned off", () => {
    expect(toGematria(5, { geresh: false, punctuate: false })).toStrictEqual(
      "ה",
    );
    expect(toGematria(5783, { geresh: false, punctuate: false })).toStrictEqual(
      "התשפג",
    );
  });

  it("Keeps the geresh when only punctuate is turned off", () => {
    expect(toGematria(5783, { geresh: true, punctuate: false })).toStrictEqual(
      "התשפ״ג",
    );
  });

  it("Returns an empty string for zero", () => {
    expect(toGematria(0)).toStrictEqual("");
  });
});
