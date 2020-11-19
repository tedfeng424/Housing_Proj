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
 * Use to provide formatting to room type
 */
const formatRoomType = (roomType: string): roomTypes =>
  roomDbToRoom[roomType as roomTypesDb];

/**
 * Use to provide formatting to intervals (TODO: change to enums)
 */
const formatInterval = (interval: string): string => {
  return interval.replace(/ *\([^)]*\) */g, '');
};

/**
 * Use to provide formatting to whole movein string
 * TODO: make this code neater!
 */
const formatMoveIn = (early: string, late: string): string => {
  const [earlyInt, earlyMonth] = early.split(' ') as [string, months];
  const [lateInt, lateMonth] = late.split(' ') as [string, months];

  if (earlyMonth === lateMonth) return abbreviateMonth(earlyMonth);

  let earlyPart = `${formatInterval(earlyInt)} ${abbreviateMonth(earlyMonth)}`;
  let latePart = `${formatInterval(lateInt)} ${abbreviateMonth(lateMonth)}`;

  if (
    formatInterval(earlyInt) === 'Anytime' ||
    formatInterval(earlyInt) === 'Early'
  ) {
    earlyPart = abbreviateMonth(earlyMonth);
  }
  if (
    formatInterval(lateInt) === 'Anytime' ||
    formatInterval(lateInt) === 'Late'
  ) {
    latePart = abbreviateMonth(lateMonth);
  }
  return `${earlyPart} - ${latePart}`;
};

export {
  moveInSelect,
  abbreviateMonth,
  abbreviateAddress,
  formatRoomType,
  formatInterval,
  formatMoveIn,
};
