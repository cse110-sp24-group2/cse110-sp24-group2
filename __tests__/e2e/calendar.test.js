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

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const MAIN_PAGE_URL = "http://localhost:3000/source/calendar/";

describe("Navigation and Generation of Calendar", () => {
  // Get to the calendar page
  beforeEach(async () => {
    await page.goto(MAIN_PAGE_URL);
  });

  // Check if current month is generated
  it("Generate Current Month", async () => {
    // Check month and day accuracy
    const monthLabel = await page.$eval(
      "#current-month",
      (el) => el.textContent
    );
    expect(monthLabel).toBe(`${monthNames[currentMonth]} ${currentYear}`);
    // Ensure the number of days is divisible by 7
    const numDayElements = await page.$$eval(".day", (days) => days.length);
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await page.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await page.evaluate(
        (el) => window.getComputedStyle(el).color,
        diffMonthDay
      );
      expect(diffColor).toBe("rgb(128, 128, 128)");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(page.url()).toBe(MAIN_PAGE_URL);
    }
    // Click days of the month to be sent to notes page and check localStorage
    let activeDays = await page.$$(`div.${monthClasses[currentMonth]}`);
    for (let i = 0; i < 5; i++) {
      activeDays = await page.$$(`div.${monthClasses[currentMonth]}`);
      let activeDay = activeDays[i];
      let date = await page.evaluate((el) => el.textContent, activeDay);
      await Promise.all([
        activeDay.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      expect(page.url()).toBe("http://localhost:3000/source/Notes/");
      let dateObject = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("date"))
      );
      expect(dateObject).toEqual({
        month: currentMonth,
        day: parseInt(date),
        year: currentYear,
      });
      await page.goBack();
    }
  }, 10000);

  // Check if prev month is generated
  it("Generate Prev Month", async () => {
    // Click the previous month button
    await page.click("#prev-month");
    let month = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
    let year = currentMonth - 1 < 0 ? currentYear - 1 : currentYear;
    // Check month and day accuracy
    const monthLabel = await page.$eval(
      "#current-month",
      (el) => el.textContent
    );
    expect(monthLabel).toBe(`${monthNames[month]} ${year}`);
    // Ensure the number of days is divisible by 7
    const numDayElements = await page.$$eval(".day", (days) => days.length);
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await page.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await page.evaluate(
        (el) => window.getComputedStyle(el).color,
        diffMonthDay
      );
      expect(diffColor).toBe("rgb(128, 128, 128)");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(page.url()).toBe(MAIN_PAGE_URL);
    }
    // Click days of the month to be sent to notes page and check localStorage
    let activeDays = await page.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      activeDays = await page.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await page.evaluate((el) => el.textContent, activeDay);
      await Promise.all([
        activeDay.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      expect(page.url()).toBe("http://localhost:3000/source/Notes/");
      let dateObject = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("date"))
      );
      expect(dateObject).toEqual({
        month: month,
        day: parseInt(date),
        year: year,
      });
      await page.goBack();
    }
  }, 10000);

  // Check if next month is generated
  it("Generate next Month", async () => {
    // Click the next month button
    await page.click("#next-month");
    let month = currentMonth + 1 > 11 ? 0 : currentMonth + 1;
    let year = currentMonth + 1 > 11 ? currentYear + 1 : currentYear;
    // Check month and day accuracy
    const monthLabel = await page.$eval(
      "#current-month",
      (el) => el.textContent
    );
    expect(monthLabel).toBe(`${monthNames[month]} ${year}`);
    // Ensure the number of days is divisible by 7
    const numDayElements = await page.$$eval(".day", (days) => days.length);
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await page.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await page.evaluate(
        (el) => window.getComputedStyle(el).color,
        diffMonthDay
      );
      expect(diffColor).toBe("rgb(128, 128, 128)");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(page.url()).toBe(MAIN_PAGE_URL);
    }
    // Click days of the month to be sent to notes page and check localStorage
    let activeDays = await page.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      activeDays = await page.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await page.evaluate((el) => el.textContent, activeDay);
      await Promise.all([
        activeDay.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      expect(page.url()).toBe("http://localhost:3000/source/Notes/");
      let dateObject = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("date"))
      );
      expect(dateObject).toEqual({
        month: month,
        day: parseInt(date),
        year: year,
      });
      await page.goBack();
    }
  }, 10000);

  // Check if next year's data is generated
  it("Generate next Year", async () => {
    // Click the next month button
    await page.click("#next-month", { count: 12 });
    let month = currentMonth;
    let year = currentYear + 1;
    // Check month and day accuracy
    const monthLabel = await page.$eval(
      "#current-month",
      (el) => el.textContent
    );
    expect(monthLabel).toBe(`${monthNames[month]} ${year}`);
    // Ensure the number of days is divisible by 7
    const numDayElements = await page.$$eval(".day", (days) => days.length);
    expect(numDayElements % 7).toBe(0);
    // If there are days not in the current month, they should be grayed out and unclickable
    const daysNotInMonth = await page.$$(".diff-month");
    if (daysNotInMonth.length > 0) {
      let diffMonthDay = daysNotInMonth[0];
      // Make sure the day is grayed out
      const diffColor = await page.evaluate(
        (el) => window.getComputedStyle(el).color,
        diffMonthDay
      );
      expect(diffColor).toBe("rgb(128, 128, 128)");
      // Make sure the day is unclickable
      await diffMonthDay.click();
      expect(page.url()).toBe(MAIN_PAGE_URL);
    }
    // Click days of the month to be sent to notes page and check localStorage
    let activeDays = await page.$$(`div.${monthClasses[month]}`);
    for (let i = 0; i < 5; i++) {
      activeDays = await page.$$(`div.${monthClasses[month]}`);
      let activeDay = activeDays[i];
      let date = await page.evaluate((el) => el.textContent, activeDay);
      await Promise.all([
        activeDay.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      expect(page.url()).toBe("http://localhost:3000/source/Notes/");
      let dateObject = await page.evaluate(() =>
        JSON.parse(localStorage.getItem("date"))
      );
      expect(dateObject).toEqual({
        month: month,
        day: parseInt(date),
        year: year,
      });
      await page.goBack();
    }
  }, 10000);
});
