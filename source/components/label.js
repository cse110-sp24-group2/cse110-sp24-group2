class CustomLabel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    let rootElement = document.createElement("article");

    let styleElement = document.createElement("style");

    styleElement.textContent = `
        button {
            border-radius: 8px;
            margin: 5px;
        }
        `;

    this.shadowRoot.appendChild(styleElement);
    this.shadowRoot.appendChild(rootElement);

    this.addLabelButton();
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For example:
   * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
   * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card> must be of the
   *                        following format:
   *                        {
   *                          "name": "string",
   *                          "color": "string",
   *                          "done": "boolean"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    let articleElement = this.shadowRoot.querySelector("article");

    if (!articleElement) return;

    // Add a button and style tag to the article element
    articleElement.innerHTML = `<button>${data.done ? `<s> ${data.name} </s>` : `${data.name}`}</button>`;

    let styleElement = this.shadowRoot.querySelector("style");
    styleElement.textContent =
      styleElement.textContent +
      `
        button {
            background-color: ${data.color}
        }
        `;

    let buttonElement = this.shadowRoot.querySelector("button");

    buttonElement.addEventListener("dblclick", () => {
      while (articleElement.firstChild) {
        articleElement.removeChild(articleElement.firstChild);
      }
      this.remove();
    });
  }

  addLabelButton() {
    let rootElement = this.shadowRoot.querySelector("article");

    let addButton = document.createElement("button");
    addButton.textContent = "Add Label";
    addButton.addEventListener("click", () => {
      this.createNewLabel();
    });

    rootElement.appendChild(addButton);
  }

  createNewLabel() {
    let newLabel = document.createElement("custom-label");
    newLabel.data = {
      name: "New Label",
      color: "#f0f0f0",
      done: false,
    };
    this.shadowRoot.querySelector("article").appendChild(newLabel);
  }
}

customElements.define("custom-label", CustomLabel);


// Links for understanding
// https://www.w3schools.com/tags/tag_label.asp