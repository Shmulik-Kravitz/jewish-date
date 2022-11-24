import { expect, it, describe } from 'vitest'

import { mod } from "../../../src/utils/dateUtils";


describe("jewishDateHebrew", () => {
  it("Convert number to hebrew", () => {
    const result = mod(20, 15);
    expect(result).toStrictEqual(5);
  });
});
