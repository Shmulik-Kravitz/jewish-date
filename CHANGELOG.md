# Changelog

## 2.0.23

- feat: `formatJewishDate` and `formatJewishDateInHebrew` now accept an optional format pattern as a second argument, using tokens similar to [date-fns](https://date-fns.org/docs/format). Lowercase tokens (`d`, `dd`, `M`, `MM`, `yy`, `yyyy`) output numeric values, uppercase tokens (`D`, `YY`, `YYYY`) output gematria in `formatJewishDateInHebrew`, and `MMMM` outputs the month name. Defaults are `"d MMMM yyyy"` for `formatJewishDate` and `"D MMMM YYYY"` for `formatJewishDateInHebrew`, so existing output is unchanged.
- chore: Reworked the GitHub Actions workflow to build, test and publish to npm automatically, and upgraded CI to Node.js 24.

## 2.0.16 - 2.0.22

- chore: Development dependency and toolchain updates only (Yarn, TypeScript, Vite, Vitest, esbuild and transitive security bumps). No runtime or API changes.

## 2.0.15

- fix: Resolved critical issue with date conversion for months represented as zero-indexed values in the JavaScript Date object, ensuring accurate date handling. (Reverted change from version 2.0.14)

## 2.0.14

- fix: Resolved locale specific accuracy issues resulting from parsing date strings by switching to ```Date.setFullYear``` method

## 2.0.12

- Publish with provenance

## 2.0.8

- Better ESM support

## 2.0.4

- Added new method ```calcDaysInMonth (jewishYear: number,jewishMonth: JewishMonthType)``` will calculate the number of days in a Jewish month for a given Jewish year.

## 2.0.1

- Added Support for ESM (ES modules)
