// Notes part
const noteText = document.getElementById('note-text');
const addNoteBtn = document.getElementById('add-note');
const notesList = document.getElementById('notes');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

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

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

addNoteBtn.addEventListener('click', () => {
  if (noteText.value.trim()) {
    notes.push(noteText.value.trim());
    saveNotes();
    noteText.value = '';
    renderNotes();
  }
});

renderNotes();

// TodoList Part
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    span.textContent = todo;
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

addTodoBtn.addEventListener('click', () => {
  if (todoInput.value.trim()) {
    todos.push(todoInput.value.trim());
    saveTodos();
    todoInput.value = '';
    renderTodos();
  }
});

renderTodos();



// Adding file button and labels
const addBtn = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');
const noteTxt = document.getElementById('note-text');
const fileInput = document.getElementById('file-input');

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


    setTimeout(() => {
      const noteHeight = noteDiv.offsetHeight;
      const indicatorBoxes = noteDiv.querySelectorAll('.important::before, .feedback::before');
      indicatorBoxes.forEach(box => {
        box.style.height = `${noteHeight}px`;
      });
    }, 0);

    noteTxt.value = '';
    fileInput.value = null;
  }
});

// Adding date and time
const dateDisplay = document.getElementById('date-display');
const timeDisplay = document.getElementById('time-display');

function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  const timeString = now.toLocaleTimeString('en-US', { hour12: true });

  dateDisplay.textContent = dateString;
  timeDisplay.textContent = timeString;
}

setInterval(updateDateTime, 1000);


updateDateTime();