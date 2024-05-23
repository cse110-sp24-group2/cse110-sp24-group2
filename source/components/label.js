// Makes a custom label component that is intended to be used to label day entries
class CustomLabel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    let rootElement = document.createElement("article");

    let styleElement = document.createElement("style");

    styleElement.textContent = `
        button {
            border-radius: 8px;
        }
        `;

    this.shadowRoot.appendChild(styleElement);
    this.shadowRoot.appendChild(rootElement);
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

    // Add a buttton and style tag to the article element
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

    buttonElement.addEventListener("click", () => {
      while (articleElement.firstChild) {
        articleElement.removeChild(articleElement.firstChild);
      }
      this.remove();
    });
  }
}

customElements.define("custom-label", CustomLabel);

// Links for understanding
// https://www.w3schools.com/tags/tag_label.asp
