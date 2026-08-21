/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

/** Geresh (׳) - marks a single Hebrew letter used as a numeral. */
const GERESH = "׳";
/** Gershayim (״) - inserted before the last letter of a multi letter numeral. */
const GERSHAYIM = "״";

/**
 * The Hebrew letter (or letter combination) representing each place value.
 * Values above 400 are spelled out with the "tav" combinations, and 1000
 * closes the cycle so that larger numbers restart from the units.
 */
const NUMERALS: Record<number, string> = {
  0: "",
  1: "א",
  2: "ב",
  3: "ג",
  4: "ד",
  5: "ה",
  6: "ו",
  7: "ז",
  8: "ח",
  9: "ט",
  10: "י",
  20: "כ",
  30: "ל",
  40: "מ",
  50: "נ",
  60: "ס",
  70: "ע",
  80: "פ",
  90: "צ",
  100: "ק",
  200: "ר",
  300: "ש",
  400: "ת",
  500: "תק",
  600: "תר",
  700: "תש",
  800: "תת",
  900: "תתק",
  1000: "תתר",
};

/**
 * Letter pairs that spell out a name of God and are therefore replaced by an
 * equivalent pair with the same numeric value (15 -> 9 + 6, 16 -> 9 + 7).
 */
const SUBSTITUTIONS: [RegExp, string][] = [
  [/יה/g, "טו"],
  [/יו/g, "טז"],
];

/**
 * Options controlling how a gematria value is punctuated.
 */
export interface GematriaOptions {
  /** Use the Hebrew geresh/gershayim marks instead of ASCII quotes. */
  geresh?: boolean;
  /** Add a mark identifying the letters as a number. */
  punctuate?: boolean;
}

/**
 * Returns the Hebrew letters for a single decimal digit at a given place.
 * Numbers beyond a thousand reuse the letters of the lower places, so the
 * place is folded back in steps of three until it fits the letter table.
 * @param digit - The decimal digit.
 * @param place - The zero based position of the digit, counted from the right.
 * @returns The Hebrew letters for that digit, or an empty string for a zero.
 */
const toNumeral = (digit: number, place: number): string => {
  let foldedPlace = place;
  while (digit * 10 ** foldedPlace > 1000) {
    foldedPlace -= 3;
  }
  return NUMERALS[digit * 10 ** foldedPlace] ?? "";
};

/**
 * Converts a number to its Hebrew gematria representation.
 * @param num - The number to convert.
 * @param options - Punctuation options.
 * @returns The number written with Hebrew letters.
 */
export const toGematria = (
  num: number,
  options: GematriaOptions = {},
): string => {
  const { punctuate = true, geresh = punctuate } = options;

  const letters = num
    .toString()
    .split("")
    .reverse()
    .map((digit, place) => toNumeral(Number.parseInt(digit, 10), place))
    .reverse()
    .join("");

  const word = SUBSTITUTIONS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    letters,
  );

  if (!(punctuate || geresh) || word.length === 0) {
    return word;
  }
  if (word.length === 1) {
    return word + (geresh ? GERESH : "'");
  }
  return word.slice(0, -1) + (geresh ? GERSHAYIM : '"') + word.slice(-1);
};
