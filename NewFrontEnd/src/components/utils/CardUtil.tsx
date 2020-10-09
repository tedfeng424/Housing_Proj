import { intervalOptions, yearMonths } from '../../assets/constants/constants';

export function MoveInSelect(
  earlyMonth: string,
  earlyInterval: string,
  lateMonth: string,
  lateInterval: string,
) {
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
}

export function StringWrap(toWrap: string | null) {
  if (toWrap == null) {
    return 'placeHolder';
  }
  return toWrap;
}
