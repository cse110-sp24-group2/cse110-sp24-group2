const { ipcRenderer } = require("electron");
const { labelExists, saveLabel, saveDatetoLabel, deleteLabel, deleteDatetoLabel } = require('./label-helper');
/*global fs*/
/*global path*/
/**
 * Event listener for the 'DOMContentLoaded' event on the document
 */
document.addEventListener("DOMContentLoaded", function () {
  // Create a new label when button is clicked
  const addLabelButton = document.getElementById("add-label-button");

  addLabelButton.addEventListener("click", () => {
    console.log("Add Label button clicked");
    let name = document.getElementById("label-name").value;
    let color = document.getElementById("label-color").value;

    // Get the date information
    const dateInfo = JSON.parse(localStorage.getItem("date"));

    // User must enter a name for the label
    if (!name) {
      ipcRenderer.send(
        "show-error-dialog",
        "Error",
        "Please enter a name for the label."
      );
      return;
    }
    // Check if the label already exists
    labelExists(dateInfo.day, dateInfo.month, dateInfo.year, name).then(
      (exists) => {
        if (exists) {
          ipcRenderer.send(
            "show-error-dialog",
            "Error",
            "A label with that name already exists for this day."
          );
          return;
        }

        // If the label doesn't exist, create it
        let newLabel = document.createElement("div");
        newLabel.classList.add("custom-label");
        newLabel.innerHTML = `<button style="background-color: ${color || "#F0F0F0"}">${name || "New Label"}</button>`;

        document.getElementById("labels-container").appendChild(newLabel);
        // Add event listener for deleting the label
        newLabel.querySelector("button").addEventListener("dblclick", () => {
          console.log("Deleting label:", name);
          newLabel.remove();
          // Delete the label from the JSON files
          deleteLabel(dateInfo.day, dateInfo.month, dateInfo.year, name);
          deleteDatetoLabel(dateInfo.day, dateInfo.month, dateInfo.year, name);
        });
        // Save the label to the JSON file
        console.log("Saving label:", { name, color });
        saveLabel(dateInfo.day, dateInfo.month, dateInfo.year, { name, color });
        saveDatetoLabel(dateInfo.day, dateInfo.month, dateInfo.year, name);
      }
    );
  });

  // Render labels on load
  const dateInfo = JSON.parse(localStorage.getItem("date"));
  console.log("Rendering labels for:", dateInfo);
  renderLabels(dateInfo.day, dateInfo.month, dateInfo.year);
});
/**
 * Renders labels for the current day into the labels container.
 *
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 */
function renderLabels(day, month, year) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const labelFilePath = path.join(monthDir, "labels.json");
  fs.readFile(labelFilePath, "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("No labels file found for this date.");
      } else {
        console.error("Failed to read labels file:", err);
      }
    } else {
      const labels = JSON.parse(data);
      const dayLabels = labels.find((l) => l.day === day);
      if (dayLabels) {
        dayLabels.labels.forEach((labelData) => {
          let newLabel = document.createElement("div");
          newLabel.classList.add("custom-label");
          newLabel.innerHTML = `<button style="background-color: ${labelData.color}">${labelData.done ? `<s>${labelData.name}</s>` : `${labelData.name}`}</button>`;

          document.getElementById("labels-container").appendChild(newLabel);
          // Add the dblclick event listener to the new label
          newLabel.querySelector("button").addEventListener("dblclick", () => {
            console.log("Deleting label:", labelData.name);
            newLabel.remove();
            // Delete the label from the JSON files
            const dateInfo = JSON.parse(localStorage.getItem("date"));
            deleteLabel(
              dateInfo.day,
              dateInfo.month,
              dateInfo.year,
              labelData.name
            );
            deleteDatetoLabel(
              dateInfo.day,
              dateInfo.month,
              dateInfo.year,
              labelData.name
            );
          });
        });
      }
    }
  });
}

