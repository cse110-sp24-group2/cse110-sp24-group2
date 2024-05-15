/**
 * Represents a simple note-taking application.
 * Allows users to add notes, todos, and files with optional labels.
 */
const { ipcRenderer } = require('electron');

ipcRenderer.on('selectedDate', (event, selectedDate) => {
    // Handle the selected date
    console.log(selectedDate);
});
const fs = require('fs');
const path = require('path');


// Variables for notes
const noteText = document.getElementById('note-text'); // Input field for adding notes
const addNoteBtn = document.getElementById('add-note'); // Button to add notes
const notesList = document.getElementById('notes'); // List to display notes

// Array to store notes
let notes = [];
// Load notes from JSON file
fs.readFile(path.join(__dirname, '../Data/notes.json'), 'utf-8', (err, data) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found, but that\'s okay. It will be created when notes are saved.');
    } else {
      throw err;
    }
  } else {
    notes = JSON.parse(data);
  }
  renderNotes();
});
/**
 * Renders notes from the 'notes' array into the notes list.
 */
function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;
    li.addEventListener('click', () => {
      noteText.value = note;
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });
    notesList.appendChild(li);
  });
}

/**
 * Saves notes to local storage.
 */
// Save notes to JSON file
function saveNotes() {
  fs.writeFile(path.join(__dirname, '../Data/notes.json'), JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
}


// Event listener for adding notes
addNoteBtn.addEventListener('click', () => {
  if (noteText.value.trim()) {
    notes.push(noteText.value.trim());
    saveNotes();
    noteText.value = '';
    renderNotes();
  }
});

// Initial rendering of notes
renderNotes();


// Variables for todos
const todoInput = document.getElementById('todo-input'); // Input field for adding todos
const addTodoBtn = document.getElementById('add-todo'); // Button to add todos
const todoList = document.getElementById('todo-list'); // List to display todos

// Array to store todos
let todos = [];
// Load todos from JSON file
// Load todos from JSON file
fs.readFile(path.join(__dirname, '../Data/todolist.json'), 'utf-8', (err, data) => {
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
/**
 * Renders todos from the 'todos' array into the todo list.
 */
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    span.textContent = todo;
    deleteBtn.textContent = '';

    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
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
  fs.writeFile(path.join(__dirname, '../Data/todolist.json'), JSON.stringify(todos), (err) => {
    if (err) throw err;
  });
}

// Event listener for adding todos
addTodoBtn.addEventListener('click', () => {
  if (todoInput.value.trim()) {
    todos.push(todoInput.value.trim());
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
      }
    }

    const labelType = prompt("Enter 'important', 'feedback', or leave empty for none:");

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

    // Clear input fields
    noteTxt.value = '';
    fileInput.value = null;
  }
});


// Variables for displaying date and time
const dateDisplay = document.getElementById('date-display'); // Element to display date