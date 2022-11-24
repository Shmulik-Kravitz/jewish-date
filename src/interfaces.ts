export const JewishMonth = {
  None: `None`,

  Tishri: `Tishri`,
  Cheshvan: `Cheshvan`,
  Kislev: `Kislev`,
  Tevet: `Tevet`,
  Shevat: `Shevat`,
  Adar: `Adar`,
  Nisan: `Nisan`,
  Iyyar: `Iyyar`,
  Sivan: `Sivan`,
  Tammuz: `Tammuz`,
  Av: `Av`,
  Elul: `Elul`,

  AdarI: `AdarI`,
  AdarII: `AdarII`,
} as const;

export type JewishMonthType = keyof typeof JewishMonth;

export interface BasicJewishDate {
  /**
   *  day of month
   */
  day: number;

  /**
   * monthName
   */
  monthName: JewishMonthType;

  /**
   * month
   */
  year: number;
}

export interface JewishDate extends BasicJewishDate {
  /**
   * month
   */
  month: number;
}

export interface BasicJewishDateHebrew {
  /**
   *  day of month
   */
  day: string;

  /**
   * monthName
   */
  monthName: string;

  /**
   * month
   */
  year: string;
}
