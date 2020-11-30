export enum Interval { // TODO start using enums like this whenever possible instead of consts
  Anytime = 'Anytime',
  Early = 'Early(1-10)',
  Mid = 'Mid(11-20)',
  Late = 'Late(21-31)',
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
  Anytime = 'Anytime',
  January = 'January',
  February = 'February',
  March = 'March',
  April = 'April',
  May = 'May',
  June = 'June',
  July = 'July',
  August = 'August',
  September = 'September',
  October = 'October',
  November = 'November',
  December = 'December',
}

/**
 * Months in the year, abbreviated
 */
enum monthsAbrv {
  Anytime = 'Anytime',
  January = 'Jan',
  February = 'Feb',
  March = 'Mar',
  April = 'Apr',
  May = 'May',
  June = 'Jun',
  July = 'Jul',
  August = 'Aug',
  September = 'Sep',
  October = 'Oct',
  November = 'Nov',
  December = 'Dec',
}

/**
 * object of month (unabbreviated) to month (abbreviated)
 */
const monthsUnabrvToAbrv = {
  [months.Anytime]: monthsAbrv.Anytime,
  [months.January]: monthsAbrv.January,
  [months.February]: monthsAbrv.February,
  [months.March]: monthsAbrv.March,
  [months.April]: monthsAbrv.April,
  [months.May]: monthsAbrv.May,
  [months.June]: monthsAbrv.June,
  [months.July]: monthsAbrv.July,
  [months.August]: monthsAbrv.August,
  [months.September]: monthsAbrv.September,
  [months.October]: monthsAbrv.October,
  [months.November]: monthsAbrv.November,
  [months.December]: monthsAbrv.December,
};

enum SchoolYear {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
  Fourth = 'Fourth',
  Fifth = 'Fifth',
  Grad = 'Grad',
}

enum RoomType {
  single = 'Single',
  double = 'Double',
  triple = 'Triple',
  studio = 'Studio',
  suite = 'Suite',
  livingRoom = 'Living room',
}

export {
  intervalOptions,
  yearMonths,
  months,
  monthsAbrv,
  monthsUnabrvToAbrv,
  SchoolYear,
  RoomType,
};
