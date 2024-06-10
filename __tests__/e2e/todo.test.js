const { browser } = require("@wdio/globals");
const path = require("path");

let CALENDAR_URL;
let NOTES_URL;

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

const currentDate = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

describe("Testing of the To Do List element", () => {
  // Get to the calendar page
  beforeEach(async () => {
    if (!CALENDAR_URL) {
      // Set up URLs
      CALENDAR_URL = await browser.getUrl();
      NOTES_URL = path.resolve(CALENDAR_URL, "../../Notes/index.html");
    }
    await browser.url(CALENDAR_URL);
    await browser.pause(800);
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
      await browser.pause(100);
      await browser.keys(`ToDo List Item ${i}`);
      await addButton.click();
      await browser.pause(100);
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
      await browser.pause(100);
      // Make sure checkbox is checked and that the text is crossed out
      expect(await taskCheck.isSelected()).toBe(true);
      let taskCrossed = await taskDesc.getCSSProperty("text-decoration");
      expect(taskCrossed["value"]).toHaveText(
        expect.stringContaining("line-through")
      );
      // Check the item as uncomplete via clicking the label
      await taskDesc.click();
      await browser.pause(100);
      // Make sure checkbox is unchecked and that the text is not crossed out
      expect(await taskCheck.isSelected()).toBe(false);
      taskCrossed = await taskDesc.getCSSProperty("text-decoration");
      expect(taskCrossed["value"]).toHaveText(expect.stringContaining("none"));
    }
  });

  // Check the completion/uncompletion of items
  it("Tasks persist between notes and calendar page", async () => {
    // Get the todo-list element
    let todoList = await browser.$("todo-list-element");
    // Get the list element
    let list = await todoList.shadow$("#list-container");
    // Get the task items
    let tasks = await list.$$("li");
    // Check number of tests on calendar page
    expect(tasks.length).toBe(5);

    // Check number of tests on notes page is the same
    // Check month and year accuracy
    let month = currentMonth - 1 < 0 ? 11 : currentMonth - 1;

    // Click days of the month to be sent to notes page and check displayed date
    // Navigate to notes page
    // Check that the active day is chosen properly
    const activeDay = await browser.$(".current-day");
    expect(activeDay).not.toBeNull();
    await activeDay.click();
    await browser.pause(800);

    // Get the todo-list element
    todoList = await browser.$("todo-list-element");
    expect(todoList).not.toBeNull();
    // Get the list element
    list = await todoList.shadow$("#list-container");
    expect(list).not.toBeNull();
    // Get the task items
    tasks = await list.$$("li");
    // Check number of tests on calendar page
    expect(tasks.length).toBe(5);
  });

  // Check the addition of items
  it("Delete items to ToDo", async () => {
    // Get the todo-list element
    let todoList = await browser.$("todo-list-element");
    expect(todoList).not.toBeNull();

    // Get the input, add button, and list elements
    let list = await todoList.shadow$("#list-container");
    expect(list).not.toBeNull();

    // Check the number of items in the list
    let tasks = await list.$$("li");
    expect(tasks.length).toBe(5);
    // Ensure that there is the proper text in each item
    for (let i = 1; i <= 5; i++) {
      // Get the todo-list element
      todoList = await browser.$("todo-list-element");
      expect(todoList).not.toBeNull();

      // Get the input, add button, and list elements
      list = await todoList.shadow$("#list-container");
      expect(list).not.toBeNull();

      tasks = await list.$$("li");

      const deleteButton = await tasks[0].$(".delete-task-btn");
      console.log(deleteButton);
      console.log(tasks);

      expect(deleteButton).not.toBeNull();

      // Delete the item
      await deleteButton.click();

      // FADE FOR DELETE DLEAY AT OF TIME OF WRITING WAS 300, INCREASE THIS PAUSE IF FADE IS LONGER
      await browser.pause(600);

      expect(await list.$$("li")).toHaveLength(5 - i);
    }

    const endTasks = await list.$$("li");
    expect(endTasks.length).toBe(0);
  });
});
