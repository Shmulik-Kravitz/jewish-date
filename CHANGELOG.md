# Changelog

## 2.0.24

No runtime or API changes — everything below is tooling, packaging or internal cleanup.

- chore(deps): Upgraded every development dependency to its latest release and Yarn to 4.17.1, including four majors: `@biomejs/biome` 1.9.4 → 2.5.5, `typescript` 5.8.2 → 6.0.3, `vite` 6.2.2 → 8.1.5 and `vitest` 3.0.8 → 4.1.10 (with `@vitest/coverage-v8`), plus `@types/node` 20 → 26.1.1 and `esbuild` 0.25.1 → 0.28.1. Follow-up changes required by those majors: `biome.json` migrated via `biome migrate` (`organizeImports` moved to `assist.actions.source`, `formatter.ignore` → `includes`, `linter.rules.recommended` → `linter.rules.preset`); `tsconfig.json` switched from the deprecated `moduleResolution: "node"` (TS6 errors with TS5107) to `"bundler"`, matching how the package is actually built; `.yarnrc.yml` gained an `ms` package extension for Vite, which needs it under Yarn PnP and warned `MODULE_NOT_FOUND` on every test run; and `src/jewishDateHebrew.ts` had its imports reordered by Biome 2's case-sensitive sorting. No behavior change.
- chore: Internal cleanup in `toJewishDate` — the Jewish month lookup now uses `Array#indexOf` instead of an equivalent `Array#findIndex` callback. No behavior change.
- docs: Backfilled changelog entries for earlier releases and expanded the npm `keywords` list for better package discoverability.

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
