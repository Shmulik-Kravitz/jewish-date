<h1 align="center">
<a href="https://github.com/Shmulik-Kravitz/jewish-date"><img src="assets/jewish-date.svg" alt="Jewish Date" /></a>
</h1>

<p align="center">Jewish Date is a fast and modern <b>2kb</b> alternative to hebcal with an MIT license.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/jewish-date">
    <img src="https://img.shields.io/npm/v/jewish-date.svg" alt="npm version" />
  </a>
  <a href="https://unpkg.com/jewish-date@*/dist/index.js">
    <img src="https://img.shields.io/badge/Size-2%20kb-success?style=flat" alt="Gzip Size" />
  </a>
  <a href="https://github.com/Shmulik-Kravitz/jewish-date/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  </a>
  <img src="https://github.com/Shmulik-Kravitz/jewish-date/actions/workflows/main.yml/badge.svg" alt="Build Status" />
  <img src="https://img.shields.io/badge/Code%20Coverage-100%25-success?style=flat" alt="Code Coverage" />
</p>

> Jewish Date is a fast and modern 2kB JavaScript library that provides a simple and efficient Gregorian-to-Hebrew and vice versa date converter. With an MIT license and seamless compatibility with all browsers, node.js, and TypeScript, Jewish Date is a reliable and efficient date converter that can help you convert dates between the Hebrew and Gregorian calendars with ease.


- 📦 2kb mini library (minified & gzip)
- 📜 MIT License
- 🔧 Easy to use
- 💻 Seamless compatibility with both Node.js and the browser

# Getting Started

## Installation

```console
yarn add jewish-date
```

Or with npm

```console
npm install jewish-date --save
```

## Usage

### TypeScript & ES6 example

```js
import {
  toJewishDate,
  formatJewishDate,
  toHebrewJewishDate,
  formatJewishDateInHebrew,
  toGregorianDate,
  JewishMonth,
} from "jewish-date";

const date = new Date(2023, 4, 9); // the month is 0-indexed (4 = May)
const jewishDate = toJewishDate(date);
console.log(jewishDate); // { year: 5783, monthName: "Iyyar", month: 8, day: 18 }

const jewishDateInEnglish = formatJewishDate(jewishDate);
console.log(jewishDateInEnglish); // 18 Iyyar 5783

// With custom format pattern (similar to date-fns)
const formatted = formatJewishDate(jewishDate, "dd/MM/yyyy");
console.log(formatted); // 18/08/5783

const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
console.log(jewishDateInHebrew); // { day: "י״ח", monthName: "אייר", year: "התשפ״ג" }

const jewishDateInHebrewStr = formatJewishDateInHebrew(jewishDate);
console.log(jewishDateInHebrewStr); // י״ח אייר התשפ״ג

// With custom format pattern in Hebrew (gematria)
const formattedHebrew = formatJewishDateInHebrew(jewishDate, "D/MM/YY");
console.log(formattedHebrew); // י״ח/02/פ״ג

const date2 = toGregorianDate({
  year: 5783,
  monthName: JewishMonth.Iyyar,
  day: 18,
});
console.log(date2); // Tue May 09 2023 00:00:00 GMT+0300 (Israel Daylight Time)
```

#### For ES5

Replace

```js
import {
  toJewishDate,
  formatJewishDate,
  toHebrewJewishDate,
  formatJewishDateInHebrew,
  toGregorianDate,
  JewishMonth,
} from "jewish-date";
```

With

```js
const {
  toJewishDate,
  formatJewishDate,
  toHebrewJewishDate,
  formatJewishDateInHebrew,
  toGregorianDate,
  JewishMonth,
} = require("jewish-date");
```

## Format Patterns

Both `formatJewishDate` and `formatJewishDateInHebrew` accept an optional pattern string as the second argument. The pattern uses tokens similar to [date-fns](https://date-fns.org/docs/format).

### Supported Tokens

| Token  | Description              | `formatJewishDate` | `formatJewishDateInHebrew` |
| ------ | ------------------------ | ------------------ | -------------------------- |
| `d`    | Day (numeric)            | 8                  | 8                          |
| `dd`   | Day (zero-padded)        | 08                 | 08                         |
| `D`    | Day (gematria in Hebrew) | 8                  | ח׳                         |
| `M`    | Month number             | 2                  | 2                          |
| `MM`   | Month number (padded)    | 02                 | 02                         |
| `MMMM` | Month name               | Iyyar              | אייר                       |
| `yy`   | Year short (numeric)     | 83                 | 83                         |
| `YY`   | Year short (gematria)    | 83                 | פ״ג                        |
| `yyyy` | Year full (numeric)      | 5783               | 5783                       |
| `YYYY` | Year full (gematria)     | 5783               | התשפ״ג                     |

### Examples

```js
const jewishDate = toJewishDate(new Date(2023, 4, 9)); // 18 Iyyar 5783

// English formatting (default: "d MMMM yyyy")
formatJewishDate(jewishDate);                 // "18 Iyyar 5783"
formatJewishDate(jewishDate, "dd/MM/yyyy");   // "18/08/5783"
formatJewishDate(jewishDate, "MMMM d, yyyy"); // "Iyyar 18, 5783"
formatJewishDate(jewishDate, "yyyy-MM-dd");   // "5783-08-18"

// Hebrew formatting (default: "D MMMM YYYY")
formatJewishDateInHebrew(jewishDate);                 // "י״ח אייר התשפ״ג"
formatJewishDateInHebrew(jewishDate, "D MMMM YYYY");  // "י״ח אייר התשפ״ג"
formatJewishDateInHebrew(jewishDate, "dd/MM/yyyy");   // "18/08/5783" (numeric)
formatJewishDateInHebrew(jewishDate, "d MMMM yyyy");  // "18 אייר 5783" (mixed)
```

# License

Jewish Date is licensed under a [MIT License](https://github.com/Shmulik-Kravitz/jewish-date/blob/master/LICENSE).
