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

    // Click the active day to be sent to notes page and check displayed date
    await activeDay.click();
    await browser.pause(800);

    // Make sure you are sent to the notes page
    await browser.execute(() => window.location.reload());
  });

  it("Previews markdown input correctly", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Test Markdown");
    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml.replace(/\s+/g, " ").trim()).toContain(
      '<div id="markdownPreview"><h1 id="test-markdown">Test Markdown</h1> </div>'
    );
  });

  it("Deletes markdown notes", async () => {
    const markdownTextarea = await browser.$("#markdown");
    await markdownTextarea.setValue("# Markdown to Delete");
    const saveButton = await browser.$("#saveButton");
    await saveButton.click();
    await browser.pause(800);
    const deleteButton = await browser.$("#deleteButton");
    await deleteButton.click();
    await browser.pause(800);
    const deleteConfirmBtn = await browser.$("#delete-confirm-btn");
    await deleteConfirmBtn.click();
    await browser.pause(800);
    await browser.execute(() => window.location.reload());
    const deletedMarkdownTextarea = await browser.$("#markdown");
    const deletedValue = await deletedMarkdownTextarea.getValue();
    expect(deletedValue).toBe("");
    const markdownPreview = await browser.$("#markdownPreview");
    const previewHtml = await markdownPreview.getHTML();
    expect(previewHtml).toBe('<div id="markdownPreview"></div>');
  });

  it("Adds label to Notes Page", async () => {
    // Now, we should be on the notes page
    // Let's add a label
    const labelName = "test-label-final-test2";
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
    await browser.pause(800);

    // Check that one of the label is the one I created.
    const labelsContainer = await browser.$("#labels-container");
    const childLabels = await labelsContainer.$$("*");

    // label that was added
    const newLabel = childLabels.find((label) => label.getText() === LabelName);

    //check
    expect(newLabel).toBeDefined();
  });

  it("Navigates back to the calendar page", async () => {
    const backButton = await browser.$("#backToCalendar");
    await backButton.click();
    await browser.pause(800);
    expect(await browser.getUrl()).toBe(CALENDAR_URL);
  });
});
