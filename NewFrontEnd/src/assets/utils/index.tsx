import {
  intervalOptions,
  MonthAbrv,
  monthsUnabrvToAbrv,
  yearMonths,
  Month,
} from '../constants';

/**
 * Use to define validation checks for an object T.
 */
export type ObjectValidationChecks<T> = {
  [key in keyof T]: (value: T[key]) => boolean;
};

/**
 * Use as a type for "one of the variables from P".
 */
export type OneFrom<P> = { [K in keyof P]: Pick<P, K> };

/**
 * Function used to validate move in select form
 * @param earlyMonth - the early month selected
 * @param earlyInterval - the early interval selected
 * @param lateMonth - the late month selected
 * @param lateInterval - the late interval selected
 */
const moveInSelect = (
  earlyMonth: string,
  earlyInterval: string,
  lateMonth: string,
  lateInterval: string,
): boolean => {
  if (yearMonths.indexOf(earlyMonth) > yearMonths.indexOf(lateMonth)) {
    // neither has anytime as the option
    if (![earlyMonth, lateMonth].includes(Month.Anytime)) {
      return false;
    }
  }
  if (
    yearMonths.indexOf(earlyMonth) === yearMonths.indexOf(lateMonth) &&
    ![earlyMonth, lateMonth].includes(Month.Anytime)
  ) {
    // neither has anytime as the option
    if (
      ![earlyInterval, lateInterval].includes(Month.Anytime) &&
      intervalOptions.indexOf(earlyInterval) >
        intervalOptions.indexOf(lateInterval)
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Use to abbreviate a month
 * @param month - the month to abbreviate (must be in the enum 'months')
 */
const abbreviateMonth = (month: Month): MonthAbrv => monthsUnabrvToAbrv[month];

/**
 * Use to abbreviate address to only everything before the first comma
 */
const abbreviateAddress = (address: string): string => address.split(',')[0];

/**
 * Use to remove parentheses and everything inside the parentheses
 */
const removeParentheses = (str: string): string =>
  str.replace(/ *\([^)]*\) */g, '');

export { moveInSelect, abbreviateMonth, abbreviateAddress, removeParentheses };
