/**
 * Represents a simple note-taking application.
 * Allows users to add notes, todos, and files with optional labels.
 */
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../Data/files');

fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
        console.error('Failed to create directory', err);
    } else {
        console.log('Directory created');
    }
});
document.addEventListener('hasClicked', function(e) {
  const { currentDay, currentMonth, currentYear } = e.detail;
  console.log(currentDay, currentMonth, currentYear);

  const noteText = document.getElementById('note-text'); // Input field for adding notes
  const addNoteBtn = document.getElementById('add-note'); // Button to add notes
  const notesList = document.getElementById('notes'); // List to display notes

  // Object to store entries
  let entries = {};
  // Load entries from JSON file
  fs.readFile(path.join(__dirname, `../Data/${currentYear}/${currentMonth}.json`), 'utf-8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('File not found, but that\'s okay. It will be created when entries are saved.');
      } else {
        throw err;
      }
    } else {
      entries = JSON.parse(data);
    }
    renderNotes();
  });
  // Function to get entries for a specific day
  function getEntriesForDay(day) {
    return entries[day] || [];
  }

  // Function to add an entry for a specific day
  function addEntryForDay(day, entry) {
    if (!entries[day]) {
      entries[day] = [];
    }
    entries[day].push(entry);
  }
  /**
   * Renders entries for the current day into the notes list.
   */
  function renderNotes() {
    notesList.innerHTML = '';
    const dayEntries = getEntriesForDay(currentDay);
    dayEntries.forEach((entry, index) => {
      const li = document.createElement('li');
      li.textContent = entry;
      li.addEventListener('click', () => {
        noteText.value = entry;
        dayEntries.splice(index, 1);
        saveEntries();
        renderNotes();
      });
      notesList.appendChild(li);
    });
  }

  /**
   * Saves entries to local storage.
   */
  // Save entries to JSON file
  function saveEntries() {
    const dir = path.join(__dirname, `../Data/${currentYear}`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    fs.writeFile(path.join(dir, `${currentMonth}.json`), JSON.stringify(entries), (err) => {
      if (err) throw err;
    });
  }


  // Event listener for adding notes
  addNoteBtn.addEventListener('click', () => {
    const note = noteText.value.trim();
    if (note) {
      addEntryForDay(currentDay, note);
      saveEntries();
      noteText.value = '';
      renderNotes();
    }
  });

  // Initial rendering of notes
  renderNotes();
  // Load todos from JSON file
  fs.readFile(path.join(__dirname, `../Data/${currentYear}/${currentMonth}_list.json`), 'utf-8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('File not found, but that\'s okay. It will be created when todos are saved.');
      } else {
        throw err;
      }
    } else {
      todos = JSON.parse(data);
    }
    renderTodos();
  });

  // Variables for todos
  const todoInput = document.getElementById('todo-input'); // Input field for adding todos
  const addTodoBtn = document.getElementById('add-todo'); // Button to add todos
  const todoList = document.getElementById('todo-list'); // List to display todos

  // Object to store todos
  let todos = {};

  // Function to get todos for a specific day
  function getTodosForDay(day) {
    return todos[day] || [];
  }

  // Function to add a todo for a specific day
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
    todoList.innerHTML = '';
    const dayTodos = getTodosForDay(currentDay);
    dayTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      const deleteBtn = document.createElement('button');

      span.textContent = todo;
      deleteBtn.textContent = '';

      deleteBtn.addEventListener('click', () => {
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
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    fs.writeFile(path.join(dir, `${currentMonth}_list.json`), JSON.stringify(todos), (err) => {
      if (err) throw err;
    });
  }

  // Event listener for adding todos
  addTodoBtn.addEventListener('click', () => {
    if (todoInput.value.trim()) {
      addTodoForDay(currentDay, todoInput.value.trim());
      saveTodos();
      todoInput.value = '';
      renderTodos();
    }
  });

  // Initial rendering of todos
  renderTodos();


  // Variables for adding notes with files
  const addBtn = document.getElementById('add-note'); // Button to add notes with files
  const notesContainer = document.getElementById('notes-container'); // Container to display notes
  const noteTxt = document.getElementById('note-text'); // Input field for note text
  const fileInput = document.getElementById('file-input'); // Input field for files

  // Event listener for adding notes with files
  addBtn.addEventListener('click', () => {
    const noteContent = noteTxt.value.trim();
    const files = fileInput.files;

    if (noteContent || files.length > 0) {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');

      const note = {
        content: noteContent,
        files: []
      };

      if (noteContent) {
        const textDiv = document.createElement('div');
        textDiv.textContent = noteContent;
        noteDiv.appendChild(textDiv);
      }

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const fileDiv = document.createElement('div');
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

      if (labelType === 'important') {
        noteDiv.classList.add('important');
      } else if (labelType === 'feedback') {
        noteDiv.classList.add('feedback');
      }

      notesContainer.appendChild(noteDiv);

      // Set indicator box heights to match note height
      setTimeout(() => {
        const noteHeight = noteDiv.offsetHeight;
        const indicatorBoxes = noteDiv.querySelectorAll('.important::before, .feedback::before');
        indicatorBoxes.forEach(box => {
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
      noteTxt.value = '';
      fileInput.value = null;
    }
  });


  // Variables for displaying date and time
  const dateDisplay = document.getElementById('date-display'); // Element to display date
});