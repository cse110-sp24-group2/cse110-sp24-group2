const { browser } = require("@wdio/globals");
const path = require("path");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthClasses = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

let CALENDAR_URL;
let NOTES_URL;

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

describe("Navigation and Generation of Calendar", () => {
  // Get to the calendar page
  beforeEach(async () => {
    if (!CALENDAR_URL) {
      // Set up URLs
      CALENDAR_URL = await browser.getUrl();
      NOTES_URL = path.resolve(CALENDAR_URL, "../../Notes/index.html");
    }
    await browser.url(CALENDAR_URL);
  });

  // Check if current month is generated
  it("Generate Current Month", async () => {
    // Check month and year accuracy
    const monthElement = await browser.$("#current-month");
    const monthLabel = await monthElement.getText();
    expect(monthLabel).toBe(`${monthNames[currentMonth]} ${currentYear}`);
    // Ensure the number of days is divisible by 7
    let numDayElements = await browser.$$(".day");
    numDayElements = numDayElements.length;
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await browser.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await diffMonthDay.getCSSProperty("color");
      expect(diffColor.parsed.hex).toBe("#808080");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
    }
    // Check that the active day is chosen properly
    const activeDay = await browser.$(".current-day");
    const activeDayText = await activeDay.getText();
    expect(activeDayText).toBe(currentDate.toString());
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[currentMonth]}`);
    for (let i = 0; i < 5; i++) {
      // Get new date to go to
      activeDays = await browser.$$(`div.${monthClasses[currentMonth]}`);
      let activeDay = activeDays[i];
      let date = await activeDay.getText();
      await activeDay.click();
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(NOTES_URL);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(
        `${monthNames[currentMonth]} ${date} ${currentYear}`
      );
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
    }
  }, 100000);

  // Check if previous month is generated
  it("Generate Previous Month", async () => {
    // Click the previous month button
    const prevButton = await browser.$("#prev-month");
    await prevButton.click();
    let month = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
    let year = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;

    // Check month and year accuracy
    const monthElement = await browser.$("#current-month");
    const monthLabel = await monthElement.getText();
    expect(monthLabel).toBe(`${monthNames[month]} ${year}`);
    // Ensure the number of days is divisible by 7
    let numDayElements = await browser.$$(".day");
    numDayElements = numDayElements.length;
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await browser.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await diffMonthDay.getCSSProperty("color");
      expect(diffColor.parsed.hex).toBe("#808080");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
    }
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      // Get new date to go to
      activeDays = await browser.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await activeDay.getText();
      await activeDay.click();
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(NOTES_URL);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(`${monthNames[month]} ${date} ${year}`);
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
      // Get back to the previous month
      await prevButton.click();
    }
  }, 100000);

  // Check if next month is generated
  it("Generate Next Month", async () => {
    // Click the next month button
    const nextButton = await browser.$("#next-month");
    await nextButton.click();
    let month = currentMonth + 1 > 11 ? 0 : currentMonth + 1;
    let year = currentMonth + 1 > 11 ? currentYear + 1 : currentYear;

    // Check month and year accuracy
    const monthElement = await browser.$("#current-month");
    const monthLabel = await monthElement.getText();
    expect(monthLabel).toBe(`${monthNames[month]} ${year}`);
    // Ensure the number of days is divisible by 7
    let numDayElements = await browser.$$(".day");
    numDayElements = numDayElements.length;
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await browser.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await diffMonthDay.getCSSProperty("color");
      expect(diffColor.parsed.hex).toBe("#808080");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
    }
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      // Get new date to go to
      activeDays = await browser.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await activeDay.getText();
      await activeDay.click();
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(NOTES_URL);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(`${monthNames[month]} ${date} ${year}`);
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
      // Get back to the next month
      await nextButton.click();
    }
  }, 100000);

  // Check if next year's data is generated
  it("Generate Next Year", async () => {
    // Click the next month button 12 times
    const nextButton = await browser.$("#next-month");
    for (let i = 0; i < 12; i++) {
      await nextButton.click();
    }
    let month = currentMonth;
    let year = currentYear + 1;

    // Check month and year accuracy
    const monthElement = await browser.$("#current-month");
    const monthLabel = await monthElement.getText();
    expect(monthLabel).toBe(`${monthNames[month]} ${year}`);
    // Ensure the number of days is divisible by 7
    let numDayElements = await browser.$$(".day");
    numDayElements = numDayElements.length;
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await browser.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await diffMonthDay.getCSSProperty("color");
      expect(diffColor.parsed.hex).toBe("#808080");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
    }
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      // Get new date to go to
      activeDays = await browser.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await activeDay.getText();
      await activeDay.click();
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(NOTES_URL);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(`${monthNames[month]} ${date} ${year}`);
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
      // Get back to the next year
      for (let i = 0; i < 12; i++) {
        await nextButton.click();
      }
    }
  }, 100000);
});
