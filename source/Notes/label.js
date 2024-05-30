/**
 * Checks to make sure Data directory exists
 */
fs.mkdir(dataDir, { recursive: true }, (err) => {
  if (err) {
      console.error('Failed to create directory', err);
  } else {
      console.log('Data directory created');
  }
});

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
   this._data = data;
 }

 /**
  * Getter for the data property.
  * @returns {Object} - The data for the label.
  */
 get data() {
   return this._data;
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

/**
 * Saves a label to its corresponding subdirectories
 */
function saveLabel(day, month, year, label) {
  const dataDir = path.join(__dirname, '../Data');
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const labelFilePath = path.join(monthDir, `labels.json`);

  fs.mkdir(yearDir, { recursive: true}, (err) => {
    if (err) {
      console.error('Failed to create year directory', err);
    }else{
      fs.mkdir(monthDir, { recursive: true}, (err) => {
        if (err) {
          console.error('Failed to create month directory', err);
        } else{
          fs.readFile(labelFilePath, 'utf-8', (err, data) => {
            let labels = [];
            if(!err && data){
              labels = JSON.parse(data);
            }
            const existingLabel = labels.find(l => l.day === day);
            if (existingLabel) {
              existingLabel.labels.push(label);
            } else {
              labels.push({ day, labels: [label] });
            }
            fs.writeFile(labelFilePath, JSON.stringify(labels, null, 2), 'utf-8', (err) => {
              if (err) {
                console.error('Failed to save labels file', err);
              } else {
                console.log(`Labels file saved for ${month + 1}-${day}-${year}`);
              }
            });
          });
        }
      });
    }
  });
}
/**
 * Renders labels for the current day into the labels container.
 */
function renderLabels(day, month, year) {
  const dataDir = path.join(__dirname, '../Data');
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const labelFilePath = path.join(monthDir, 'labels.json');

  fs.readFile(labelFilePath, 'utf-8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('No labels file found for this date.');
      } else {
        console.error('Failed to read labels file:', err);
      }
    } else {
      const labels = JSON.parse(data);
      const dayLabels = labels.find(l => l.day === day);
      if (dayLabels) {
        dayLabels.labels.forEach(labelData => {
          let newLabel = document.createElement("custom-label");
          newLabel.data = labelData;
          document.getElementById("labels-container").appendChild(newLabel);
        });
      }
    }
  });
}
/**
 * Event listener for the 'DOMContentLoaded' event on the document
 */
document.addEventListener('DOMContentLoaded', function() {
  // Create a new label when button is clicked
  const addLabelButton = document.getElementById("add-label-button");
  
  addLabelButton.addEventListener("click", () => {
    console.log("Add Label button clicked");
    let name = document.getElementById("label-name").value;
    let color = document.getElementById("label-color").value;
    let newLabel = document.createElement("custom-label");
    
    newLabel.data = {
      name: name || "New Label",
      color: color || "#F0F0F0",
    };
    document.getElementById("labels-container").appendChild(newLabel);

    // Save the label to the JSON file
    const dateInfo = JSON.parse(localStorage.getItem("date"));
    console.log("Saving label:", newLabel.data);
    saveLabel(dateInfo.day, dateInfo.month, dateInfo.year, newLabel.data);
  });

  // Render labels on load
  const dateInfo = JSON.parse(localStorage.getItem("date"));
  console.log("Rendering labels for:", dateInfo);
  renderLabels(dateInfo.day, dateInfo.month, dateInfo.year);
});