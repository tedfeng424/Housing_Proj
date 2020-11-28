import {
  intervalOptions,
  monthsAbrv,
  monthsUnabrvToAbrv,
  yearMonths,
  months,
  roomTypes,
  roomTypesDb,
  roomDbToRoom,
} from '../constants';

/**
 * Use to define at least one of some type
 */
export type AtLeastOne<T> = { 0: T } & T[];

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
    if (![earlyMonth, lateMonth].includes(yearMonths[0])) {
      return false;
    }
  }
  if (
    yearMonths.indexOf(earlyMonth) === yearMonths.indexOf(lateMonth) &&
    ![earlyMonth, lateMonth].includes(yearMonths[0])
  ) {
    // neither has anytime as the option
    if (
      ![earlyInterval, lateInterval].includes(intervalOptions[0]) &&
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
const abbreviateMonth = (month: months): monthsAbrv =>
  monthsUnabrvToAbrv[month];

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
