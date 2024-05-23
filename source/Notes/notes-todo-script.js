/**
 * Represents a simple note-taking application.
 * Allows users to add notes, todos, and files with optional labels.
 */
const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "../Data/files");
/**
 * Creates a directory using the specified path. If the parent directories do not exist,
 * they will be created as well.
 *
 * @param {string} dirPath - The path of the directory to create.
 *
 * @callback (err) - A callback function that is called when the directory creation is complete.
 * @param {Error} err - An Error object. If the directory was created successfully, this parameter will be null.
 */
fs.mkdir(dirPath, { recursive: true }, (err) => {
  if (err) {
    console.error("Failed to create directory", err);
  } else {
    console.log("Directory created");
  }
});
let currentDay, currentMonth, currentYear;
/**
 * Event listener for the 'hasClicked' event on the document.
 *
 * @param {Event} e - The event object, containing information about the event.
 */
document.addEventListener("hasClicked", function (e) {
  ({ currentDay, currentMonth, currentYear } = e.detail);
  console.log(currentDay, currentMonth, currentYear);
  const noteText = document.getElementById("note-text"); // Input field for adding notes
  const addNoteBtn = document.getElementById("add-note"); // Button to add notes
  const notesList = document.getElementById("notes"); // List to display notes
  // ================== Notes =================================
  // Object to store entries
  let entries = {};
  /**
   * Reads the data from a JSON file corresponding to the current year and month.
   *
   * @param {string} path - The path to the JSON file, constructed using the current year and month.
   * @param {string} encoding - The encoding to use when reading the file. In this case, 'utf-8'.
   * @param {function} callback - A callback function that is called when the file read operation is complete.
   * @param {Error} callback.err - An Error object. If the file was read successfully, this parameter will be null.
   * @param {string} callback.data - The data read from the file. If an error occurred, this parameter will be undefined.
   */
  fs.readFile(
    path.join(__dirname, `../Data/${currentYear}/${currentMonth}.json`),
    "utf-8",
    (err, data) => {
      console.log("Reading file");
      if (err) {
        if (err.code === "ENOENT") {
          console.log(
            "File not found, but that's okay. It will be created when entries are saved.",
          );
          const dir = path.join(__dirname, `../Data/${currentYear}`);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFile(
            path.join(dir, `${currentMonth}.json`),
            "",
            "utf-8",
            (err) => {
              if (err) throw err;
              console.log("File created");
            },
          );
        } else {
          throw err;
        }
      } else {
        if (data) {
          try {
            const monthEntries = JSON.parse(data);
            entries = monthEntries[currentDay] || [];
          } catch (e) {
            console.error("Error parsing JSON", e);
          }
        }
      }
      renderNotes(currentYear, currentMonth, currentDay);
    },
  );
  /**
   * Adds a new entry for a specific day in a specific month and year.
   *
   * @param {number} day - The day of the month to add the entry for.
   * @param {number} year - The year to add the entry for.
   * @param {number} month - The month to add the entry for.
   * @param {string} entry - The note or entry to add.
   * @returns {Promise} - A Promise that resolves when the entry is successfully added.
   */
  function addEntryForDay(day, year, month, entry) {
    return new Promise((resolve, reject) => {
      const dir = path.join(__dirname, `../Data/${year}`);
      const filename = `${month}.json`;

      fs.readFile(path.join(dir, filename), "utf-8", (err, data) => {
        let monthEntries;
        if (err) {
          if (err.code === "ENOENT") {
            // File does not exist, create a new one
            monthEntries = {};
          } else {
            console.error(`Error reading file ${filename}:`, err);
            reject(err);
            return;
          }
        } else {
          // Check if data is not empty before parsing
          if (data) {
            try {
              monthEntries = JSON.parse(data);
            } catch (e) {
              console.error(`Error parsing file ${filename}:`, e);
              reject(e);
              return;
            }
          } else {
            monthEntries = {};
          }
        }

        // Add the new entry
        if (!monthEntries[day]) {
          monthEntries[day] = [];
        }
        monthEntries[day].push(entry);

        // Save the updated entries
        fs.writeFile(
          path.join(dir, filename),
          JSON.stringify(monthEntries),
          (err) => {
            if (err) {
              console.error("Error writing file:", err);
              reject(err);
            } else {
              resolve();
            }
          },
        );
      });
    });
  }
  /**
   * Retrieves entries for a specific day in a specific month and year.
   *
   * @param {number} day - The day of the month to retrieve the entries for.
   * @param {number} year - The year to retrieve the entries for.
   * @param {number} month - The month to retrieve the entries for.
   * @returns {Array} - An array of entries for the specified day, month, and year.
   */
  function getEntriesForDay(day, year, month) {
    const dir = path.join(__dirname, `../Data/${year}`);
    const filename = `${month}.json`;

    try {
      const data = fs.readFileSync(path.join(dir, filename), "utf-8");

      // Check if data is not empty before parsing
      let monthEntries;
      if (data) {
        monthEntries = JSON.parse(data);
      } else {
        monthEntries = {};
      }

      return monthEntries[day] || [];
    } catch (err) {
      console.error(`Error reading file ${filename}:`, err);
      return [];
    }
  }
  /**
   * Renders entries for the current day into the notes list.
   */
  function renderNotes(year, month, day) {
    notesList.innerHTML = "";

    // Get the entries for the specified day
    const dayEntries = getEntriesForDay(day, year, month);

    // Render the entries for the specified day
    dayEntries.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = entry;
      li.addEventListener("click", () => {
        noteText.value = entry;
        dayEntries.splice(index, 1);
        saveEntries(day, year, month, dayEntries);
        renderNotes(year, month, day);
      });
      notesList.appendChild(li);
    });
  }

  /**
   * Saves entries to Data subdirectory.
   */
  function saveEntries(day, year, month, entries) {
    const dir = path.join(__dirname, `../Data/${year}`);
    const filename = `${month}.json`;

    let monthEntries;
    try {
      const data = fs.readFileSync(path.join(dir, filename), "utf-8");
      monthEntries = JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        // File does not exist, create a new one
        monthEntries = {};
      } else {
        console.error(`Error reading file ${filename}:`, err);
        return;
      }
    }

    // Update the entries for the specified day
    monthEntries[day] = entries;

    // Save the updated entries
    try {
      fs.writeFileSync(path.join(dir, filename), JSON.stringify(monthEntries));
    } catch (err) {
      console.error("Error writing file:", err);
    }
  }

  /**
   * Event listener for the 'click' event on the 'addNoteBtn' button.
   * When the button is clicked, an asynchronous function is called to add a new note.
   */
  addNoteBtn.addEventListener("click", async () => {
    renderNotes(currentYear, currentMonth, currentDay);
    const note = noteText.value.trim();
    if (note) {
      console.log(currentDay, currentYear, currentMonth);
      try {
        await addEntryForDay(currentDay, currentYear, currentMonth, note);
        noteText.value = "";
        renderNotes(currentYear, currentMonth, currentDay);
      } catch (err) {
        console.error("Error adding entry:", err);
      }
    }
  });
  /**
   * Renders the notes for a specific day in a specific month and year.
   *
   * @param {number} year - The year of the notes to render.
   * @param {number} month - The month of the notes to render.
   * @param {number} day - The day of the month of the notes to render.
   */
  function renderNotes(year, month, day) {
    notesList.innerHTML = "";

    // Get the entries for the specified day
    const dayEntries = getEntriesForDay(day, year, month);

    // Render the entries for the specified day
    dayEntries.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = entry;
      li.addEventListener("click", () => {
        noteText.value = entry;
        dayEntries.splice(index, 1);
        saveEntries(day, year, month, dayEntries); // Pass dayEntries as the entries parameter
        renderNotes(year, month, day);
      });
      notesList.appendChild(li);
    });
  }
  // ================== Todos =================================
  // Variables for todos
  const todoInput = document.getElementById("todo-input"); // Input field for adding todos
  const addTodoBtn = document.getElementById("add-todo"); // Button to add todos
  const todoList = document.getElementById("todo-list"); // List to display todos
  // Object to store todos
  let todos = {};
  /**
   * Retrieves the to-do items for a specific day.
   *
   * @param {number} day - The day of the month to retrieve the to-do items for.
   * @returns {Array} - An array of to-do items for the specified day.
   */
  function getTodosForDay(day) {
    return todos[day] || [];
  }

  /**
   * Adds a new to-do item for a specific day.
   *
   * @param {number} day - The day of the month to add the to-do item for.
   * @param {string} todo - The to-do item to add.
   */
  function addTodoForDay(day, todo) {
    if (!todos[day]) {
      todos[day] = [];
    }
    todos[day].push(todo);
  }
  /**
   * Renders todos for the current day into the todo list.
   */
  function renderTodos() {
    todoList.innerHTML = "";
    const dayTodos = getTodosForDay(currentDay);
    dayTodos.forEach((todo, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const deleteBtn = document.createElement("button");

      span.textContent = todo;
      deleteBtn.textContent = "";

      deleteBtn.addEventListener("click", () => {
        dayTodos.splice(index, 1);
        saveTodos(currentYear, currentMonth);
        renderTodos();
      });

      li.appendChild(deleteBtn);
      li.appendChild(span);
      todoList.appendChild(li);
    });
  }

  /**
   * Saves todos to local storage.
   */
  function saveTodos() {
    const dir = path.join(__dirname, `../Data/${currentYear}`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile(
      path.join(dir, `${currentMonth}_list.json`),
      JSON.stringify(todos),
      (err) => {
        if (err) throw err;
      },
    );
  }
  /**
   * Event listener for the 'click' event on the 'addTodoBtn' button.
   * When the button is clicked, a function is called to add a new to-do item.
   */
  addTodoBtn.addEventListener("click", () => {
    if (todoInput.value.trim()) {
      addTodoForDay(currentDay, todoInput.value.trim());
      saveTodos();
      todoInput.value = "";
      renderTodos();
    }
  });

  // Initial rendering of todos
  renderTodos();

  // Variables for adding notes with files
  const addBtn = document.getElementById("add-note"); // Button to add notes with files
  const notesContainer = document.getElementById("notes-container"); // Container to display notes
  const noteTxt = document.getElementById("note-text"); // Input field for note text
  const fileInput = document.getElementById("file-input"); // Input field for files

  /**
   * Event listener for the 'click' event on the 'addBtn' button.
   * When the button is clicked, a function is called to add a new note.
   */
  addBtn.addEventListener("click", () => {
    const noteContent = noteTxt.value.trim();
    const files = fileInput.files;

    if (noteContent || files.length > 0) {
      const noteDiv = document.createElement("div");
      noteDiv.classList.add("note");

      const note = {
        content: noteContent,
        files: [],
      };

      if (noteContent) {
        const textDiv = document.createElement("div");
        textDiv.textContent = noteContent;
        noteDiv.appendChild(textDiv);
      }

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const fileDiv = document.createElement("div");
          const file = files[i];
          fileDiv.textContent = `File: ${file.name}`;
          noteDiv.appendChild(fileDiv);

          // Save file to ../Data/files and add filename to note
          const filePath = path.join(__dirname, `../Data/files/${file.name}`);
          fs.copyFileSync(file.path, filePath);
          note.files.push(file.name);
        }
      }

      //const labelType = prompt("Enter 'important', 'feedback', or leave empty for none:");
      //bug here
      if (labelType === "important") {
        noteDiv.classList.add("important");
      } else if (labelType === "feedback") {
        noteDiv.classList.add("feedback");
      }

      notesContainer.appendChild(noteDiv);

      // Set indicator box heights to match note height
      setTimeout(() => {
        const noteHeight = noteDiv.offsetHeight;
        const indicatorBoxes = noteDiv.querySelectorAll(
          ".important::before, .feedback::before",
        );
        indicatorBoxes.forEach((box) => {
          box.style.height = `${noteHeight}px`;
        });
      }, 0);

      // Add note to specific day entries in JSON object for notes
      if (!notes[currentDay]) {
        notes[currentDay] = [];
      }
      notes[currentDay].push(note);

      // Save notes
      saveNotes();

      // Clear input fields
      noteTxt.value = "";
      fileInput.value = null;
    }
  });
});
