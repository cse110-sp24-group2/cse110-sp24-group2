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
  }

  /**
   * Called when the .data property is set on this element.
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
    if (!data) return;

    let articleElement = this.shadowRoot.querySelector("article");

    if (!articleElement) return;

    articleElement.innerHTML = `<button>${data.done ? `<s>${data.name}</s>` : `${data.name}`}</button>`;

    let styleElement = this.shadowRoot.querySelector("style");
    styleElement.textContent += `
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
}

customElements.define("custom-label", CustomLabel);

// Function to add new label
document.getElementById("add-label-button").addEventListener("click", () => {
    let name = document.getElementById("label-name").value;
    let color = document.getElementById("label-color").value;

    let newLabel = document.createElement("custom-label");
    newLabel.data = {
        name: name || "New Label",
        color: color || "#f0f0f0",
    };
    document.getElementById("labels-container").appendChild(newLabel);
});
