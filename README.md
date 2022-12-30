# Jewish Date &middot; [![npm version](https://img.shields.io/npm/v/jewish-date.svg)](https://www.npmjs.com/package/jewish-date) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/jewish-date.svg)](https://bundlephobia.com/package/jewish-date) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Shmulik-Kravitz/jewish-date/blob/master/LICENSE) ![main workflow](https://github.com/Shmulik-Kravitz/jewish-date/actions/workflows/main.yml/badge.svg) ![Code Coverage](https://img.shields.io/badge/Code%20Coverage-100%25-success?style=flat) 

## Jewish Date is a Hebrew Date to Gregorian Date and vice versa converter

* 🌐 Works with both Node.js and the browser
* 📦 2.5kB mini library (minified & gzip)
* 📜 MIT License
* 🔧 Easy to use

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
  toJewishDate, formatJewishDate, toHebrewJewishDate, formatJewishDateInHebrew, toGregorianDate, JewishMonth
} from "jewish-date";

const date = new Date("2020-01-01");
const jewishDate = toJewishDate(date);
console.log(jewishDate); // { year: 5780, monthName: "Tevet", month: 4, day: 4 }

const jewishDateInEnglish = formatJewishDate(jewishDate);
console.log(jewishDateInEnglish); // 4 Tevet 5780

const jewishDateInHebrew = toHebrewJewishDate(jewishDate);
console.log(jewishDateInHebrew); // { day: "ד׳", monthName: "טבת", year: "התש״פ" }

const jewishDateInHebrewStr = formatJewishDateInHebrew(jewishDate);
console.log(jewishDateInHebrewStr); // ד׳ טבת התש״פ

const date2 = toGregorianDate({ year: 5780, monthName: JewishMonth.Tevet, day: 4 });
console.log(date2); // Wed Jan 01 2020 00:00:00 GMT+0200 (Israel Standard Time)

```

#### For ES5

Replace

```js
import {
  toJewishDate, formatJewishDate, toHebrewJewishDate, formatJewishDateInHebrew, toGregorianDate, JewishMonth
} from "jewish-date";
```

With

```js
const {
  toJewishDate, formatJewishDate, toHebrewJewishDate, formatJewishDateInHebrew, toGregorianDate, JewishMonth
} = require("jewish-date");
```

## License

Jewish Date is [MIT licensed](https://github.com/Shmulik-Kravitz/jewish-date/blob/master/LICENSE).
