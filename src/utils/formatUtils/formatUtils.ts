/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

import { toLength } from "../numberUtils/numberUtils";

/**
 * Token definitions for pattern parsing.
 * Order matters - longer tokens must come first to avoid partial matches.
 */
const TOKEN_PATTERNS = [
  "yyyy",
  "YYYY",
  "yy",
  "YY",
  "MMMM",
  "MM",
  "M",
  "dd",
  "D",
  "d",
] as const;

type TokenType = (typeof TOKEN_PATTERNS)[number];

interface TokenMatch {
  token: TokenType;
  index: number;
}

/**
 * Represents the components needed for formatting a Jewish date.
 */
export interface FormatComponents {
  day: number;
  month: number;
  monthName: string;
  year: number;
}

/**
 * Formatter function type that converts a component to its string representation.
 */
type TokenFormatter = (components: FormatComponents) => string;

/**
 * Creates formatters for English (numeric) output.
 * In English mode, uppercase tokens behave the same as lowercase (numeric output).
 */
const createEnglishFormatters = (): Record<TokenType, TokenFormatter> => ({
  d: (c) => c.day.toString(),
  dd: (c) => toLength(c.day, 2),
  D: (c) => c.day.toString(),
  M: (c) => c.month.toString(),
  MM: (c) => toLength(c.month, 2),
  MMMM: (c) => c.monthName,
  yy: (c) => (c.year % 100).toString().padStart(2, "0"),
  YY: (c) => (c.year % 100).toString().padStart(2, "0"),
  yyyy: (c) => c.year.toString(),
  YYYY: (c) => c.year.toString(),
});

/**
 * Creates formatters for Hebrew output.
 * Lowercase tokens (d, M, y) output numeric values.
 * Uppercase tokens (D, YY, YYYY) output Hebrew gematria.
 * MMMM outputs Hebrew month name.
 * @param convertToHebrew - Function to convert numbers to Hebrew gematria
 * @param getHebrewMonthName - Function to get Hebrew month name
 * @param getShortYearHebrew - Function to get short (2-letter) Hebrew year
 */
export const createHebrewFormatters = (
  convertToHebrew: (num: number) => string,
  getHebrewMonthName: (monthName: string) => string,
  getShortYearHebrew: (year: number) => string,
): Record<TokenType, TokenFormatter> => ({
  d: (c) => c.day.toString(),
  dd: (c) => toLength(c.day, 2),
  D: (c) => convertToHebrew(c.day),
  M: (c) => c.month.toString(),
  MM: (c) => toLength(c.month, 2),
  MMMM: (c) => getHebrewMonthName(c.monthName),
  yy: (c) => (c.year % 100).toString().padStart(2, "0"),
  YY: (c) => getShortYearHebrew(c.year),
  yyyy: (c) => c.year.toString(),
  YYYY: (c) => convertToHebrew(c.year),
});

/**
 * Finds all tokens in the pattern string.
 */
const findTokens = (pattern: string): TokenMatch[] => {
  const matches: TokenMatch[] = [];
  let searchStart = 0;

  while (searchStart < pattern.length) {
    let foundMatch: TokenMatch | null = null;

    // Try each token pattern (longest first)
    for (const token of TOKEN_PATTERNS) {
      const index = pattern.indexOf(token, searchStart);
      if (index === searchStart) {
        foundMatch = { token, index };
        break;
      }
    }

    if (foundMatch) {
      matches.push(foundMatch);
      searchStart = foundMatch.index + foundMatch.token.length;
    } else {
      searchStart++;
    }
  }

  return matches;
};

/**
 * Formats a Jewish date using the given pattern and formatters.
 * @param pattern - The format pattern string (e.g., "d MMMM yyyy")
 * @param components - The date components to format
 * @param formatters - Token formatters to use
 * @returns The formatted date string
 */
export const formatWithPattern = (
  pattern: string,
  components: FormatComponents,
  formatters: Record<TokenType, TokenFormatter>,
): string => {
  const tokens = findTokens(pattern);
  let result = "";
  let lastIndex = 0;

  for (const { token, index } of tokens) {
    // Add any literal text before this token
    if (index > lastIndex) {
      result += pattern.slice(lastIndex, index);
    }
    // Add the formatted token value
    result += formatters[token](components);
    lastIndex = index + token.length;
  }

  // Add any remaining literal text
  if (lastIndex < pattern.length) {
    result += pattern.slice(lastIndex);
  }

  return result;
};

/**
 * Default pattern for formatting Jewish dates (numeric).
 */
export const DEFAULT_PATTERN = "d MMMM yyyy";

/**
 * Default pattern for formatting Jewish dates in Hebrew (gematria).
 */
export const DEFAULT_PATTERN_HEBREW = "D MMMM YYYY";

/**
 * Gets the English formatters (singleton).
 */
export const getEnglishFormatters = createEnglishFormatters();
