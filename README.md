# Jewish Date &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Shmulik-Kravitz/jewish-date/blob/master/LICENSE) ![main workflow](https://github.com/Shmulik-Kravitz/jewish-date/actions/workflows/main.yml/badge.svg) ![Code Coverage](https://img.shields.io/badge/Code%20Coverage-100%25-success?style=flat) [![npm version](https://img.shields.io/npm/v/jewish-date.svg?style=flat)](https://www.npmjs.com/package/jewish-date)

Jewish Date is a Hebrew date to Gregorian date and vice verser converter.

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
  toJewishDate, toGregorianDate, formatJewishDateInHebrew, toHebrewJewishDate, JewishMonth
} from "jewish-date";

const date = new Date("2020-01-01");
const jewishDate = toJewishDate(date);
console.log(jewishDate); // { year: 5780, monthName: "Tevet", day: 4 }

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
  toJewishDate, toGregorianDate, formatJewishDateInHebrew, toHebrewJewishDate
} from "jewish-date";
```

With

```js
const {
  toJewishDate, toGregorianDate, formatJewishDateInHebrew, toHebrewJewishDate
} = require("jewish-date");
```

## License

Jewish Date is [MIT licensed](https://github.com/Shmulik-Kravitz/jewish-date/blob/master/LICENSE).
