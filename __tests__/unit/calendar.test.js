const {
  daysInMonth,
  isHoliday,
} = require("../../source/calendar/calendarHelper");

const holidays = [
  new Date(2024, 0, 1), // New Year's Day
  new Date(2024, 1, 14), // Valentine's Day
  new Date(2024, 6, 4), // Independence Day
  new Date(2024, 9, 31), // Halloween
  new Date(2024, 10, 11), // Veterans Day
  new Date(2024, 11, 25), // Christmas Day
  new Date(2024, 11, 31), // New Year's Eve
];

describe("daysInMonth", () => {
  test("returns the number of days in a month", () => {
    expect(daysInMonth(0, 2024)).toBe(31);
    expect(daysInMonth(1, 2024)).toBe(29);
    expect(daysInMonth(2, 2024)).toBe(31);
    expect(daysInMonth(3, 2024)).toBe(30);
    expect(daysInMonth(4, 2024)).toBe(31);
    expect(daysInMonth(5, 2024)).toBe(30);
    expect(daysInMonth(6, 2024)).toBe(31);
    expect(daysInMonth(7, 2024)).toBe(31);
    expect(daysInMonth(8, 2024)).toBe(30);
    expect(daysInMonth(9, 2024)).toBe(31);
    expect(daysInMonth(10, 2024)).toBe(30);
    expect(daysInMonth(11, 2024)).toBe(31);
  });
  test("returns the number of days in a month for a leap year", () => {
    expect(daysInMonth(1, 2024)).toBe(29);
    expect(daysInMonth(1, 2021)).toBe(28);
  });
});

describe("isHoliday", () => {
  test("returns true if the date is a holiday", () => {
    expect(isHoliday(2024, 0, 1, holidays)).toBe(true);
    expect(isHoliday(2024, 1, 14, holidays)).toBe(true);
    expect(isHoliday(2024, 6, 4, holidays)).toBe(true);
    expect(isHoliday(2024, 9, 31, holidays)).toBe(true);
    expect(isHoliday(2024, 10, 11, holidays)).toBe(true);
    expect(isHoliday(2024, 11, 25, holidays)).toBe(true);
    expect(isHoliday(2024, 11, 31, holidays)).toBe(true);
  });
  test("returns false if the date is not a holiday", () => {
    expect(isHoliday(2024, 0, 2, holidays)).toBe(false);
    expect(isHoliday(2024, 1, 15, holidays)).toBe(false);
    expect(isHoliday(2024, 6, 5, holidays)).toBe(false);
    expect(isHoliday(2024, 9, 30, holidays)).toBe(false);
  });
  test("returns true even if the date is a different year", () => {
    expect(isHoliday(2023, 0, 1, holidays)).toBe(true);
    expect(isHoliday(2022, 1, 14, holidays)).toBe(true);
    expect(isHoliday(2018, 6, 4, holidays)).toBe(true);
    expect(isHoliday(8, 9, 31, holidays)).toBe(true);
    expect(isHoliday(15, 10, 11, holidays)).toBe(true);
    expect(isHoliday(2120, 11, 25, holidays)).toBe(true);
    expect(isHoliday(2025, 11, 31, holidays)).toBe(true);
  });
});
