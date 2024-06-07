const { browser } = require("@wdio/globals");
const path = require("path");
const fs = require("fs");
const localStorage = require("local-storage");
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
let CALENDAR_URL;
let NOTES_URL;
const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
describe("Notes Page Functionality", () => {
  // Initialize variables and navigate from the calendar page to the notes page before each test
  beforeEach(async () => {
    if (!CALENDAR_URL) {
      CALENDAR_URL = await browser.getUrl();
      NOTES_URL = path.resolve(CALENDAR_URL, "../../Notes/index.html");
    }
    await browser.url(CALENDAR_URL);
  
    // Check that the active day is chosen properly
    const activeDay = await browser.$(".current-day");
    const activeDayText = await activeDay.getText();
    expect(activeDayText).toBe(currentDate.toString());
  
    // Click the active day to be sent to notes page and check displayed date
    await activeDay.click();
    await browser.pause(800);
  
    // Make sure you are sent to the notes page
    expect(await browser.getUrl()).toHaveUrl(NOTES_URL);
  
    let dateDisplay = await browser.$("#dateDisplay");
    let dateDisplayText = await dateDisplay.getText();
  
    // Check that the date displayed is correct
    expect(dateDisplayText).toMatch(
      new RegExp(`^${monthNames[currentMonth]} ${currentDate},? ${currentYear}$`)
    );
  
    const dateInfo = { day: currentDate, month: currentMonth, year: currentYear };
    localStorage.set("date", JSON.stringify(dateInfo));
    await browser.execute(() => window.location.reload());
  });
  
  it("Displays the correct date", async () => {
    const dateDisplay = await browser.$("#dateDisplay");
    const dateDisplayText = await dateDisplay.getText();
    const formattedDate = `${monthNames[currentMonth]} ${currentDate}, ${currentYear}`;
    expect(dateDisplayText).toMatch(
      new RegExp(`^${monthNames[currentMonth]} ${currentDate},? ${currentYear}$`)
    );
  });

  it("Previews markdown input correctly", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Test Markdown");
    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml.replace(/\s+/g, ' ').trim()).toContain("<div id=\"markdownPreview\"><h1 id=\"test-markdown\">Test Markdown</h1> </div>");
  });

  it("Saves and renders markdown notes", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Saved Markdown Note");
    const saveButton = await browser.$("#saveButton");
    await saveButton.click();
    const savedValue = await markdownTextarea.getValue();
    expect(savedValue).toBe("# Saved Markdown Note");
    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml.replace(/\s+/g, ' ').trim()).toContain("<div id=\"markdownPreview\"><h1 id=\"saved-markdown-note\">Saved Markdown Note</h1> </div>");
  });

  it("Deletes markdown notes", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Markdown to Delete");
    const saveButton = await browser.$("#saveButton");
    await saveButton.click();
    const deleteButton = await browser.$("#deleteButton");
    await deleteButton.click();
    const deleteConfirmBtn = await browser.$("#delete-confirm-btn");
    await deleteConfirmBtn.waitForExist(); // wait for the element to exist
    await deleteConfirmBtn.click();
    await browser.execute(() => window.location.reload());
    const deletedMarkdownTextarea = await browser.$("#markdown");
    const deletedValue = await deletedMarkdownTextarea.getValue();
    expect(deletedValue).toBe("");
    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml).toBe("");
});

  it("Navigates back to the calendar page", async () => {
    const backButton = await browser.$("#backToCalendar");
    await backButton.click();
    expect(await browser.getUrl()).toBe(CALENDAR_URL);
  });
});
