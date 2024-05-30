/**
 * CustomLabel is a custom HTML element that creates a stylized label.
 * @extends HTMLElement
 */
class CustomLabel extends HTMLElement {
  /**
   * Constructs a new CustomLabel instance and attaches a shadow root.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.createLabel();
  }

  /**
   * Creates the initial structure of the custom label.
   */
  createLabel() {
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
   * Setter for the data property. Calls renderLabel with the new data.
   * @param {Object} data - The new data for the label.
   */
  set data(data) {
    if (!data) return;
    this.renderLabel(data);
  }

  /**
   * Renders the label based on the provided data.
   * @param {Object} data - The data to render the label with.
   */
  renderLabel(data) {
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

// Define the custom-label custom element
customElements.define("custom-label", CustomLabel);

// Add an event listener to the add-label-button to create a new custom label when clicked
document.getElementById("add-label-button").addEventListener("click", () => {
    let name = document.getElementById("label-name").value;
    let color = document.getElementById("label-color").value;
    let newLabel = document.createElement("custom-label");
    newLabel.data = {
        name: name || "New Label",
        color: color || "#F0F0F0",
    };
    document.getElementById("labels-container").appendChild(newLabel);
});