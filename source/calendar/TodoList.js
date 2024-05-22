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
            width: 100%;
            max-width: 450px;
            background-color: rgba(255 255 255 / 80%); 
            box-shadow: 0 12px 6px rgba(0 0 0 / 15%);
        }
        
        .todo-list {
            width: 100%;
            max-width: 350px;
            background-color: rgba(255 255 255 / 80%);
            margin: auto;
            padding: 40px 30px 70px;
            border-radius: 10px;
        }
        
        .todo-list h2 {
            color: black;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
        }
        
        .todo-list h2 img {
            width: 30px;
            margin-left: 10px;
        }
        
        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #edeef0;
            border-radius: 30px;
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
        
        .row button{
            border: none;
            outline: none;
            padding: 16px 50px;
            background: #ff5945;
            color: #fff;
            font-size: 16px;
            cursor:pointer;
            border-radius: 40px;
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
            background: #ff5945;
            border-color:  #ff5945;
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

        .delete-task-btn {
            background: #ff5945;
            color: white;
            border: none;
            cursor: pointer;
            float: right;
        }
        `;

    container.setAttribute("class", "todo-list-container");

    container.innerHTML = `
            <div class="todo-list"> 
                <h2>To-Do Lists <img src="images/to-do-icon.png"></h2>
                <div class="row">
                    <input type="text" id="todo-input" placeholder="Enter a new task...">
                    <button id="add-todo">ADD</button>
                </div>
                <ul id="list-container">
                <li><input type="checkbox" checked><label for="task1"> Study for final</label> <button class="delete-task-btn">x</button></li>
                <li><input type="checkbox"><label for="task1"> make a calendar app</label> <button class="delete-task-btn">x</button></li>
                <li><input type="checkbox"><label for="task1"> Task 1</label> <button class="delete-task-btn">x</button></li>
                </ul>
            </div>
        `;

    shadowRoot.appendChild(styleElement);
    shadowRoot.appendChild(container);

    const button = shadowRoot.querySelector("#add-todo");
    const input = this.shadowRoot.querySelector("#todo-input");
    const listContainer = shadowRoot.querySelector("#list-container");

    button.addEventListener(
      "click",
      this.addTodoList.bind(this, input, listContainer),
    );
  }

  addTodoList(input, listContainer) {
    if (input.value.trim() === "") return;

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");
    button.innerText = "x";
    button.className = "delete-task-btn";
    checkbox.setAttribute("type", "checkbox");
    label.for = "task1";
    label.innerText = " " + input.value;
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(button);
    listContainer.appendChild(li);
    input.value = "";
  }
}

// Define the new custom element
customElements.define("todo-list-element", TodoList);
