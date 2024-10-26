# Changelog

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
