const { browser } = require("@wdio/globals");
const path = require("path");

const monthNames = require("../../source/vars").monthNames;
const monthClasses = require("../../source/vars").monthClasses;

let calendarUrl;
let notesUrl;

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

describe("Navigation and Generation of Calendar", () => {
  // Get to the calendar page
  beforeEach(async () => {
    if (!calendarUrl) {
      // Set up URLs
      calendarUrl = await browser.getUrl();
      notesUrl = path.resolve(calendarUrl, "../../Notes/index.html");
    }
    await browser.url(calendarUrl);
    await browser.pause(800);
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
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
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
      await browser.pause(800);
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(notesUrl);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(
        `${monthNames[currentMonth]} ${date}, ${currentYear}`
      );
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      await browser.pause(800);
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
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
      // Make sure the day is unclickable
      await diffMonthDay.click();
      await browser.pause(800);
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
    }
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      // Get new date to go to
      activeDays = await browser.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await activeDay.getText();
      await activeDay.click();
      await browser.pause(800);
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(notesUrl);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(`${monthNames[month]} ${date}, ${year}`);
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      await browser.pause(800);
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
      // Get back to the previous month
      await prevButton.click();
      await browser.pause(800);
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
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
    }
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      // Get new date to go to
      activeDays = await browser.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await activeDay.getText();
      await activeDay.click();
      await browser.pause(800);
      // Make sure you are sent to the notes page
      expect(await browser.getUrl()).toHaveUrl(notesUrl);
      let dateDisplay = await browser.$("#dateDisplay");
      let dateDisplayText = await dateDisplay.getText();
      // Check that the date displayed is correct
      expect(dateDisplayText).toBe(`${monthNames[month]} ${date}, ${year}`);
      // Go back to the calendar page
      let backButton = await browser.$("#backToCalendar");
      await backButton.click();
      await browser.pause(800);
      // Ensure you are back on the calendar page
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
      // Get back to the next month
      await nextButton.click();
      await browser.pause(800);
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
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(await browser.getUrl()).toHaveUrl(calendarUrl);
    }
    // Click days of the month to be sent to notes page and check displayed date
    let activeDays = await browser.$$(`div.${monthClasses[month]}`);
    let activeDay = activeDays[0];
    let date = await activeDay.getText();
    await activeDay.click();
    await browser.pause(800);
    // Make sure you are sent to the notes page
    expect(await browser.getUrl()).toHaveUrl(notesUrl);
    let dateDisplay = await browser.$("#dateDisplay");
    let dateDisplayText = await dateDisplay.getText();
    // Check that the date displayed is correct
    expect(dateDisplayText).toBe(`${monthNames[month]} ${date}, ${year}`);
    // Go back to the calendar page
    let backButton = await browser.$("#backToCalendar");
    await backButton.click();
    await browser.pause(800);
    // Ensure you are back on the calendar page
    expect(await browser.getUrl()).toHaveUrl(calendarUrl);
  }, 100000);
});
