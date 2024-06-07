const { browser } = require("@wdio/globals");
const path = require("path");

let CALENDAR_URL;
let NOTES_URL;

describe("Testing of the To Do List element", () => {
  // Get to the calendar page
  beforeEach(async () => {
    if (!CALENDAR_URL) {
      // Set up URLs
      CALENDAR_URL = await browser.getUrl();
      NOTES_URL = path.resolve(CALENDAR_URL, "../../Notes/index.html");
    }
    await browser.url(CALENDAR_URL);
  });

  // Check the addition of items
  it("Add items to ToDo", async () => {
    // Get the todo-list element
    const todoList = await browser.$("todo-list-element");
    // Get the input, add button, and list elements
    const input = await todoList.shadow$("#todo-input");
    const addButton = await todoList.shadow$("#add-todo");
    const list = await todoList.shadow$("#list-container");
    // Add items to the list
    for (let i = 1; i <= 5; i++) {
      await input.click();
      await browser.keys(`ToDo List Item ${i}`);
      await addButton.click();
    }
    // Check the number of items in the list
    const tasks = await list.$$("li");
    expect(tasks.length).toBe(5);
    // Ensure that there is the proper text in each item
    for (let i = 1; i <= 5; i++) {
      const taskDesc = await tasks[i - 1].$("label");
      const item = await taskDesc.getText();
      expect(item).toBe(`ToDo List Item ${i}`);
    }
  });

  // Check the completion/uncompletion of items
  it("Marking as complete/uncomplete", async () => {
    // Get the todo-list element
    const todoList = await browser.$("todo-list-element");
    // Get the list element
    const list = await todoList.shadow$("#list-container");
    // Get the task items
    const tasks = await list.$$("li");
    // Test each item
    for (let i = 0; i < tasks.length; i++) {
      // Get the checkbox and label elements from the task
      const task = tasks[i];
      const taskCheck = await task.$("input");
      const taskDesc = await task.$("label");
      // Check the item as complete via clicking the checkbox
      await taskCheck.click();
      // Make sure checkbox is checked and that the text is crossed out
      expect(await taskCheck.isSelected()).toBe(true);
      let taskCrossed = await taskDesc.getCSSProperty("text-decoration");
      expect(taskCrossed["value"]).toHaveText(
        expect.stringContaining("line-through")
      );
      // Check the item as uncomplete via clicking the label
      await taskDesc.click();
      // Make sure checkbox is unchecked and that the text is not crossed out
      expect(await taskCheck.isSelected()).toBe(false);
      taskCrossed = await taskDesc.getCSSProperty("text-decoration");
      expect(taskCrossed["value"]).toHaveText(expect.stringContaining("none"));
    }
  });
});
