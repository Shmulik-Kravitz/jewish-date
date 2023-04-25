/**
 * Copyright (c) Shmulik Kravitz.
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for more information.
 *
 */

/**
 * Pads a number with leading zeros until it reaches the desired length.
 * @param num - The number to pad.
 * @param len - The desired length of the padded number.
 * @returns A string representation of the padded number.
 */
export const toLength = (num: number, len: number) => {
  return num.toString().padStart(len, "0");
};
