const { browser } = require("@wdio/globals");
const path = require("path");

let CALENDAR_URL;
let SEARCH_URL;
let NOTES_URL;

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

describe("Navigation and Generation of SearchPage", () => {
  // Get to the calendar page
  beforeEach(async () => {
    if (!CALENDAR_URL) {
      // Set up URLs
      CALENDAR_URL = await browser.getUrl();
      SEARCH_URL = new URL(
        "../../source/searchPage/searchPage.html",
        CALENDAR_URL
      ).href;

      NOTES_URL = path.resolve(CALENDAR_URL, "../../Notes/index.html");
    }

    // Click on the search bar
    await browser.execute(() => {
      document.querySelector("#search-bar").click();
    });

    // Navigate to the search page
    await browser.url(SEARCH_URL);

    // Add a brief pause to ensure page load
    await browser.pause(800);
  });

  // Test if clicking on the "Back to Calendar" button takes you to the calendar page
  it("Verify Back to Calendar Navigation", async () => {
    // Click on the "Back to Calendar" button
    await browser.execute(() => {
      document.querySelector("#backToCalendar").click();
    });

    // Verify that the URL is the calendar page URL
    expect(await browser.getUrl()).toBe(CALENDAR_URL);
  }, 10000);

  // Test if the search bar exists on the search page
  it("Check Search Bar Existence", async () => {
    // Check if the search bar element exists
    const searchBar = await browser.$("#search-bar");
    const searchBarExists = await searchBar.isExisting();
    expect(searchBarExists).toBe(true);

    // Verify that the URL is the search page URL
    expect(await browser.getUrl()).toBe(SEARCH_URL);
  }, 10000);

  // Test if input can be entered into the search bar
  it("Input into Search Bar", async () => {
    // Simulate typing into the search bar
    const searchText = "test";
    const searchBar = await browser.$("#search-bar");
    await searchBar.setValue(searchText);

    // Verify that the entered text matches what was typed
    const enteredText = await searchBar.getValue();
    expect(enteredText).toBe(searchText);
  }, 10000);

  // Added label should show up on searchPage
  it("Add Label to Notes Page and Verify on Search Page", async () => {
    // Navigate to the main calendar page
    await browser.url(CALENDAR_URL);
    await browser.url(NOTES_URL);
    await browser.pause(800);

    // Adding label
    const labelText = "test";
    const label = await browser.$("#label-name");
    await label.setValue(labelText);
    const addLabelButton = await browser.$("#add-label-button");
    await addLabelButton.click();
    await browser.pause(3000);

    // Navigate back to the calendar page
    const backToCalendarButton = await browser.$("#backToCalendar");
    await backToCalendarButton.click();
    await browser.pause(3000);

    // Enter searchPage
    await browser.url(SEARCH_URL);
    await browser.pause(3000);

    // Verify if the label exists on the search page
    const labelsContainer = await browser.$("#labels-container");
    const labelExists = await labelsContainer.$(
      `//*[contains(text(), '${labelText}')]`
    );
    expect(labelExists).toBe(true);
  });
});
