const { browser } = require("@wdio/globals");
const path = require("path");

//Declare Variables to be used throughout testing and set before each test
let CALENDAR_URL;
let SEARCH_URL;
let NOTES_URL;

// Getting the current dat, month and year from computer.
const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

// Array of month names
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

      NOTES_URL = new URL("../../source/Notes/index.html", CALENDAR_URL).href;
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
    // First you are on the calendar page
    await browser.url(CALENDAR_URL);
    await browser.pause(800);
    // Click on the current day. take you to notes page
    const currentDay = await $(".current-day");
    await currentDay.click();
    await browser.pause(800);

    // Now, we should be on the notes page
    // Let's add a label
    const labelName = "test-label-final-test";
    const labelColor = "#1E90FF";

    // Enter the label name
    const labelNameInput = await $("#label-name");
    await labelNameInput.setValue(labelName);

    // Enter the label color
    const labelColorInput = await $("#label-color");
    await labelColorInput.setValue(labelColor);

    // Click the add label button
    const addLabelButton = await $("#add-label-button");
    await addLabelButton.click();

    // Go back to calendar
    const backToCalendarButton = await browser.$("#backToCalendar");
    await backToCalendarButton.click();
    await browser.pause(800);

    // Click on the search bar
    await browser.execute(() => {
      document.querySelector("#search-bar").click();
    });

    // Navigate to the search page
    await browser.url(SEARCH_URL);
    await browser.pause(800);

    // Check that one of the label is the one I created.
    const labelsContainer = await browser.$("#labels-container");
    const childLabels = await labelsContainer.$$("*");

    let hasChildWithText = false;

    for (const childLabel of childLabels) {
      const text = await childLabel.getText();
      if (text.trim() === "test-label-final-test") {
        hasChildWithText = true;
        break;
      }
    }
    expect(hasChildWithText).toBe(true);
  });

  // Check if the label created on a particular date has the correct data
  it("Check if labels show up with correct dates", async () => {
    // Click on one of the labels
    const labelsContainer = await browser.$("#labels-container");
    const childLabels = await labelsContainer.$$("*");

    // Loop through the labels to find the one we want
    for (const childLabel of childLabels) {
      const text = await childLabel.getText();
      if (text.trim() === "test-label-final-test") {
        await childLabel.click();
        // Check if the date that we see is the same as the current date
        const dateButton = await browser.$(".date-button");
        const displayedDate = await dateButton.getText();

        // Check if the date is correct
        const formattedCurrentDate = `${currentMonth + 1}/${currentDate}/${currentYear}`;
        expect(displayedDate).toBe(formattedCurrentDate);
        break;
      }
    }
  });

  it("Check if date can be clicked and leads to the right notes", async () => {
    // Click on one of the labels
    const labelsContainer = await browser.$("#labels-container");
    const childLabels = await labelsContainer.$$("*");

    // Loop through the labels to find the one we want
    for (const childLabel of childLabels) {
      const text = await childLabel.getText();
      if (text.trim() === "test-label-final-test") {
        await childLabel.click();

        // Click the date button
        const dateButton = await browser.$(".date-button");
        await dateButton.click();

        // Check if notes are loaded
        expect(await browser.getUrl()).toBe(NOTES_URL);

        // Check if these are notes for correct day
        const notesDate = await (await browser.$("h1")).getText();

        const formattedCurrentDate = `${monthNames[currentMonth]} ${currentDate}, ${currentYear}`;
        expect(notesDate).toBe(formattedCurrentDate);

        // Go back to calendar
        const backToCalendarButton = await browser.$("#backToCalendar");
        await backToCalendarButton.click();
        break;
      }
    }
  });

  it("Check that non-existent label does not show up", async () => {
    // Get all labels
    const labelsContainer = await browser.$("#labels-container");
    const childLabels = await labelsContainer.$$("*");

    // Check that a non-existent label does not show up
    let found = false;
    for (const childLabel of childLabels) {
      const text = await childLabel.getText();
      if (text.trim() !== "test-label-final-test") {
        found = true;
        break;
      }
    }
    expect(found).toBe(false);
  });
});
