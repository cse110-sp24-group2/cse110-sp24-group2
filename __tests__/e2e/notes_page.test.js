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

let NOTES_URL;
let CALENDAR_URL;

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

describe("Notes Page Functionality", () => {
  // Setup URLs and localStorage before each test
  beforeEach(async () => {
    if (!NOTES_URL) {
      NOTES_URL = await browser.getUrl();
      CALENDAR_URL = path.resolve(NOTES_URL, "../../calendar/index.html");
    }
    await browser.url(NOTES_URL);

    const dateInfo = {
      day: currentDate,
      month: currentMonth,
      year: currentYear,
    };
    localStorage.set("date", JSON.stringify(dateInfo));
    await browser.execute(() => window.location.reload());
  });

  it("Displays the correct date", async () => {
    const dateDisplay = await browser.$("#dateDisplay");
    const dateDisplayText = await dateDisplay.getText();
    const formattedDate = `${monthNames[currentMonth]} ${currentDate}, ${currentYear}`;
    expect(dateDisplayText).toBe(formattedDate);
  });

  it("Previews markdown input correctly", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Test Markdown");
    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml).toContain("<h1>Test Markdown</h1>");
  });

  it("Saves and renders markdown notes", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Saved Markdown Note");

    const saveButton = await browser.$("#saveButton");
    await saveButton.click();

    await browser.execute(() => window.location.reload());

    const savedMarkdownTextarea = await browser.$("#markdown");
    const savedValue = await savedMarkdownTextarea.getValue();
    expect(savedValue).toBe("# Saved Markdown Note");

    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml).toContain("<h1>Saved Markdown Note</h1>");
  });

  it("Deletes markdown notes", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Markdown to Delete");

    const saveButton = await browser.$("#saveButton");
    await saveButton.click();

    const deleteButton = await browser.$("#deleteButton");
    await deleteButton.click();

    const deleteConfirmBtn = await browser.$("#delete-confirm-btn");
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
    expect(await browser.getUrl()).toHaveUrl(CALENDAR_URL);
  });
});
