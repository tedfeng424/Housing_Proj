enum intervalOptionsInMonthEnumTODO { // TODO start using enums like this whenever possible instead of consts
  ANYTIME = 'Anytime',
  EARLY = 'Early(1-10)',
  MID = 'Mid(11-20)',
  LATE = 'Late(21-31)',
}
const intervalOptions = ['Anytime', 'Early(1-10)', 'Mid(11-20)', 'Late(21-31)'];

const yearMonths = [
  'Anytime',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Months in the year
 */
// TODO make everything PascalCase
enum months {
  ANYTIME = 'Anytime',
  JANUARY = 'January',
  FEBRUARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December',
}

/**
 * Months in the year, abbreviated
 */
enum monthsAbrv {
  ANYTIME = 'Anytime',
  JANUARY = 'Jan',
  FEBRUARY = 'Feb',
  MARCH = 'Mar',
  APRIL = 'Apr',
  MAY = 'May',
  JUNE = 'Jun',
  JULY = 'Jul',
  AUGUST = 'Aug',
  SEPTEMBER = 'Sep',
  OCTOBER = 'Oct',
  NOVEMBER = 'Nov',
  DECEMBER = 'Dec',
}

/**
 * object of month (unabbreviated) to month (abbreviated)
 */
const monthsUnabrvToAbrv = {
  [months.ANYTIME]: monthsAbrv.ANYTIME,
  [months.JANUARY]: monthsAbrv.JANUARY,
  [months.FEBRUARY]: monthsAbrv.FEBRUARY,
  [months.MARCH]: monthsAbrv.MARCH,
  [months.APRIL]: monthsAbrv.APRIL,
  [months.MAY]: monthsAbrv.MAY,
  [months.JUNE]: monthsAbrv.JUNE,
  [months.JULY]: monthsAbrv.JULY,
  [months.AUGUST]: monthsAbrv.AUGUST,
  [months.SEPTEMBER]: monthsAbrv.SEPTEMBER,
  [months.OCTOBER]: monthsAbrv.OCTOBER,
  [months.NOVEMBER]: monthsAbrv.NOVEMBER,
  [months.DECEMBER]: monthsAbrv.DECEMBER,
};

enum SchoolYear {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
  Fourth = 'Fourth',
  Fifth = 'Fifth',
  Grad = 'Grad',
}

export {
  intervalOptions,
  yearMonths,
  months,
  monthsAbrv,
  monthsUnabrvToAbrv,
  SchoolYear,
};
