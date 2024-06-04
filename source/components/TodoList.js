class TodoList extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    //create a <ul> element
    const container = document.createElement("div");
    const styleElement = document.createElement("style");

    styleElement.textContent = `
        .todo-list-container {
            flex: 1;
            width: auto;
            max-width: 450px;
            height: auto;
            padding: 30px;
            background-color: rgba(255 255 255 / 80%); 
            margin-top: 25px;
            box-shadow: 0 6px 12px rgba(0 0 0 / 15%);  
            color: #044c4d;
        }
        
        .todo-list h2 {
            color: #187474;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
            font-family: serif;
        }
        
        .todo-list h2 img {
            width: 30px;
            margin-left: 10px;
        }
        
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: white;
            color: #044c4d;
            border: 2px solid #025a5a;
            box-shadow: 0 0 8px rgba(67 162 170 / 0.6);
            border-radius: 20px;
            padding-left: 20px;
            margin-bottom: 25px;
        }
        input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            padding: 10px;
            font-weight: 14px;
        }

        .row input::placeholder {
          color: #044c4d;
          text-shadow: 1px 1px 1px #f2acda;
        }
      
        .row button{
            outline: none;
            padding: 16px 50px;
            background: linear-gradient(135deg, #439093, pink);
            color: #044c4d;
            border: 1px solid #025a5a;
            font-size: 16px;
            cursor: pointer;
            border-radius: 18px; 
        }

        .row button:hover {
            color:white !important;
            background: linear-gradient(135deg, #439093, pink);
            box-shadow: 0 0 5px rgba(9, 165, 179, 0.6), 0 0 25px rgba(9, 165, 179, 0.6), 0 0 50px rgba(9, 165, 179, 0.6), 0 0 200px rgba(9, 165, 179, 0.6); 
        }
        
        #list-container {
            margin-top: 20px;
            margin-left: 0;
            padding: 0;
            list-style: none;
        }
        ul li {
            list-style: none;
            font-size: 17px;
            padding: 12px 8px 12px 0;
            user-select: none;
            cursor: pointer;
            position: relative;   
            opacity: 1;
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        ul li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 12px;
            width: 28px;
            height: 28px;   
        }
        ul li input[type="checkbox"] {
            appearance: none;
            background: transparent;
            border: 2px solid #ccc;
            border-radius: 45%;
            width: 28px;
            height: 28px;
            cursor: pointer;
            vertical-align: middle;
            position: relative;
        }
        ul li input[type="checkbox"]:checked {
            background: linear-gradient(135deg, #439093, pink);
            border: 1px solid #025a5a;
            box-shadow: 0 0 8px rgba(67, 162, 170, 0.6);
        }
        ul li input[type="checkbox"]:checked + label {
            text-decoration: line-through;
        }
        ul li input[type="checkbox"]::after {
            content: '';
            position: absolute;
            display: block;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            width: 5px;
            top: 5px;
            left: 9px;
            height: 10px;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        @keyframes fadeOut{
          from{
              opacity: 1;
              transform: translateY(10px);
          }
          to {
              opacity: 0;
              transform: translateY(0);
          }
      } 
     
        .fade-out {
          opacity: 0;
          transform: translateY(0);
        }
        .delete-task-btn {
            background: linear-gradient(135deg, #439093, pink);
            color: white;
            border: 1px solid #025a5a;
            cursor: pointer;
            float: right;
            border-radius: 5px;
            box-shadow: 0 0 8px rgba(67, 162, 170, 0.6);
        }
        
        .delete-task-btn:hover {
            box-shadow: 0 0 5px rgba(9, 165, 179, 0.6), 0 0 25px rgba(9, 165, 179, 0.6), 0 0 50px rgba(9, 165, 179, 0.6), 0 0 200px rgba(9, 165, 179, 0.6); 
        }

        .scrollbar {
            overflow: scroll;
            height: 500px;
        }
      
        .scrollbar::-webkit-scrollbar {
            width: 10px;
        }

        .scrollbar::-webkit-scrollbar-thumb {
            background-color: #6b6b6b; 
            border-radius: 10px; 
            border: 2px solid #ffffff; 
        }

        .scrollbar::-webkit-scrollbar-track {
            background: #f0f0f0; 
            border-radius: 10px;
        }

        .scrollbar::-webkit-scrollbar-corner {
            background: transparent; 
        }
          `;

    container.setAttribute("class", "todo-list-container");

    container.innerHTML = `
            <div class="todo-list scrollbar"> 
                <h2>To-Do Lists <img src="../components/images/to-do-icon.png"> </h2>
                <div class="row">
                    <input type="text" id="todo-input" placeholder="Enter a new task...">
                    <button id="add-todo">Add</button>
                </div>
                <ul id="list-container">
                </ul>
            </div>
        `;

    shadowRoot.appendChild(styleElement);
    shadowRoot.appendChild(container);

    const button = shadowRoot.querySelector("#add-todo");
    const input = this.shadowRoot.querySelector("#todo-input");
    const listContainer = shadowRoot.querySelector("#list-container");

    button.addEventListener("click", () =>
      this.addTodoListItem(input, listContainer)
    );
    this.renderNotes(listContainer);

    // Add event listener for keyboard navigation
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        this.addTodoListItem(input, listContainer);
        e.preventDefault();
      }
    });
  }

  /**
   * Gets the notes from the local storage
   * @method getNotes
   * @returns {Array} The notes objects from the local storage
   */
  getNotes() {
    return JSON.parse(localStorage.getItem("todo-notes")) || [];
  }

  /**
   * Renders the available notes to the container
   * @method renderNotes
   * @param {*} listContainer The container to add the notes to
   */
  renderNotes(listContainer) {
    // Reset the todo-list container
    listContainer.innerHTML = "";
    // Get the notes to render
    let notes = this.getNotes();
    notes.forEach((note) => {
      // Create the items necessary for each note
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      const label = document.createElement("label");
      const button = document.createElement("button");
      // Set the proper attributes
      button.innerText = "x";
      button.className = "delete-task-btn";
      checkbox.setAttribute("type", "checkbox");
      checkbox.id = "" + note["id"];
      checkbox.checked = note["complete"];
      label.setAttribute("for", "" + note["id"]);
      label.innerText = " " + note["input"];
      // Add the change event listener to the checkbox
      checkbox.addEventListener("change", () =>
        this.alterCompletion(note["id"])
      );
      // Add the keydown event listener to the checkbox
      checkbox.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          checkbox.click();
        }
      });
      // Add the click event listener to the delete button
      button.addEventListener("click", () => {
        li.classList.add("fade-out");
        setTimeout(() => {
          this.deleteTodoListItem(note["id"], listContainer);
        }, 300);
      });
      // Add the keydown event listener to the delete button
      button.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          li.classList.add("fade-out");
          setTimeout(() => {
            this.deleteTodoListItem(note["id"], listContainer);
          }, 300);
        }
      });
      // Package the items together and append it to the container
      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(button);
      listContainer.appendChild(li);
    });
  }

  /**
   * Adds a new todo list item to the container
   * @method addTodoListItem
   * @param {*} input The input element to get the info from
   * @param {*} listContainer The container to add the new todo list item to
   * @returns {void}
   */
  addTodoListItem(input, listContainer) {
    if (input.value.trim() === "") return;

    // Get the current notes from local storage
    let notes = this.getNotes();
    // Get the id that is needed for the new note
    let id = 1;
    if (notes.length > 0) {
      id = notes[notes.length - 1]["id"] + 1;
    }
    // Create the new note object and add it to the notes array
    let noteObj = {
      id: id,
      input: input.value.trim(),
      complete: false,
    };
    notes.push(noteObj);
    // Save the notes to local storage
    localStorage.setItem("todo-notes", JSON.stringify(notes));
    input.value = "";
    // Re-render the list
    this.renderNotes(listContainer);
  }
  /**
   * Deletes a todo list item from the container matching the id
   * @method deleteTodoListItem
   * @param {*} id The id of the todo list item to delete
   * @param {*} listContainer The list to remove it from
   */
  deleteTodoListItem(id, listContainer) {
    // Get the current notes from local storage
    let notes = this.getNotes();
    // Filter out the note that needs to be deleted
    notes = notes.filter((note) => note.id !== id);
    // Save the notes to local storage
    localStorage.setItem("todo-notes", JSON.stringify(notes));
    // Re-render the list
    this.renderNotes(listContainer);
  }

  /**
   * Marks a note as complete or incomplete in localStorage
   * @method alterCompletion
   * @param {*} id The id to alter the completion of
   */
  alterCompletion(id) {
    // Get the current notes from local storage
    let notes = this.getNotes();
    // Find the note that needs to be altered and switch the complete value
    notes.map((note) => {
      if (note.id === id) note["complete"] = !note["complete"];
    });
    // Save the notes to local storage
    localStorage.setItem("todo-notes", JSON.stringify(notes));
  }
}

// Define the new custom element
customElements.define("todo-list-element", TodoList);
