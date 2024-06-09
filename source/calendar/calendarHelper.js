/**
 * Returns the number of days in a given month of a given year.
 * @function daysInMonth
 * @param {number} month - The month (0-11).
 * @param {number} year - The year.
 * @returns {number} The number of days in the month.
 */
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Determines if the day is a holiday or not
 * @param {*} year The year to test for
 * @param {*} month The month to test for
 * @param {*} day The day to test for
 * @param {*} holidays A list of holidays to check against
 * @returns True if the day is a holiday, false otherwise
 */
function isHoliday(year, month, day, holidays) {
  const currentDate = new Date(year, month, day);
  return holidays.some(
    (holiday) =>
      holiday.getMonth() === currentDate.getMonth() &&
      holiday.getDate() === currentDate.getDate()
  );
}

module.exports = { daysInMonth, isHoliday };
