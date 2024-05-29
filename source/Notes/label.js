/**
 * CustomLabel is a custom HTML element that creates a styled button with a label.
 * The label can be double-clicked to remove it.
 */
class CustomLabel extends HTMLElement {
    /**
     * The constructor creates the shadow DOM and initial structure of the element.
     */
    constructor() {
      super();
  
      // Attach a shadow root to the element.
      this.attachShadow({ mode: "open" });
  
      // Create the root element of the custom label.
      let rootElement = document.createElement("article");
  
      // Create a style element for the custom label.
      let styleElement = document.createElement("style");
  
      // Set the initial styles for the button.
      styleElement.textContent = `
          button {
              border-radius: 8px;
              margin: 5px;
          }
          `;
  
      // Append the style and root elements to the shadow root.
      this.shadowRoot.appendChild(styleElement);
      this.shadowRoot.appendChild(rootElement);
    }
  
    /**
     * Called when the .data property is set on this element.
     *
     * @param {Object} data - The data to pass into the <custom-label> must be of the
     *                        following format:
     *                        {
     *                          "name": "string",
     *                          "color": "string",
     *                          "done": "boolean"
     *                        }
     */
    set data(data) {
      if (!data) return;
  
      // Get the root element of the custom label.
      let articleElement = this.shadowRoot.querySelector("article");
  
      if (!articleElement) return;
  
      // Set the inner HTML of the root element based on the data.
      articleElement.innerHTML = `<button>${data.done ? `<s>${data.name}</s>` : `${data.name}`}</button>`;
  
      // Get the style element of the custom label.
      let styleElement = this.shadowRoot.querySelector("style");
  
      // Add the color to the button style.
      styleElement.textContent += `
          button {
              background-color: ${data.color}
          }
          `;
  
      // Get the button element of the custom label.
      let buttonElement = this.shadowRoot.querySelector("button");
  
      // Add an event listener to the button to remove the custom label when double-clicked.
      buttonElement.addEventListener("dblclick", () => {
        while (articleElement.firstChild) {
          articleElement.removeChild(articleElement.firstChild);
        }
        this.remove();
      });
    }
  }
  
  // Define the custom-label custom element.
  customElements.define("custom-label", CustomLabel);
  
  // Add an event listener to the add-label-button to create a new custom label when clicked.
  document.getElementById("add-label-button").addEventListener("click", () => {
      // Get the name and color from the input elements.
      let name = document.getElementById("label-name").value;
      let color = document.getElementById("label-color").value;
  
      // Create a new custom label.
      let newLabel = document.createElement("custom-label");
  
      // Set the data of the custom label.
      newLabel.data = {
          name: name || "New Label",
          color: color || "#F0F0F0",
      };
  
      // Append the new custom label to the labels-container.
      document.getElementById("labels-container").appendChild(newLabel);
  });