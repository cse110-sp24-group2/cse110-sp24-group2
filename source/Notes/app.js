const { deleteLabel, deleteDatetoLabel } = require("../Notes/label.js");
// Play a fade in animation when the notes page load
window.onload = function () {
  document.body.classList.add("fade-in");
};
/**
 * Set up necessary modules and path to Data directory
 */
const fs = require("fs");
const path = require("path");
const dataDir = path.join(__dirname, "../../DevJournal/Data");
/**
 * Checks to make sure Data directory exists
 */
fs.mkdir(dataDir, { recursive: true }, (err) => {
  if (err) {
    console.error("Failed to create directory", err);
  } else {
    console.log("Data directory created");
  }
});
/**
 * Event listener for the 'DOMContentLoaded' event on the document
 */
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the date from local storage
  let dateInfo = localStorage.getItem("date");
  // Parse the JSON string back into an object
  dateInfo = JSON.parse(dateInfo);
  // Create an array of month names
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Format the date
  let formattedDate =
    monthNames[dateInfo.month] + " " + dateInfo.day + ", " + dateInfo.year;
  // Display the date
  document.getElementById("dateDisplay").textContent = formattedDate;
  // Reflect month as a class in elements for color application
  const coloredElements = document.querySelectorAll(
    "button, h1, div.tab, div.tabcontent"
  );
  coloredElements.forEach((element) => {
    element.classList.add("color");
  });
  let markdownTextarea = document.getElementById("markdown");
  markdownTextarea.addEventListener("input", function () {
    let markdown = markdownTextarea.value;
    let html = marked(markdown);
    document.getElementById("markdownPreview").innerHTML = html;
  });
  //Setup rest of paths to subdirectories
  const yearDir = path.join(dataDir, dateInfo.year.toString());
  const monthDir = path.join(yearDir, dateInfo.month.toString());
  const dayFilePath = path.join(monthDir, `${dateInfo.day}.md`);
  // Checks to make sure subdirectories exist
  fs.mkdir(yearDir, { recursive: true }, (err) => {
    if (err) {
      console.error("Failed to create year directory", err);
    } else {
      fs.mkdir(monthDir, { recursive: true }, (err) => {
        if (err) {
          console.error("Failed to create month directory", err);
        } else {
          // Ensure file exists
          fs.access(dayFilePath, fs.constants.F_OK, (err) => {
            if (err) {
              fs.writeFile(dayFilePath, "", "utf-8", (err) => {
                if (err) throw err;
                console.log("Markdown file created");
              });
            }
          });
        }
      });
    }
  });
  // Simulate a click on the "Markdown" button
  document.querySelector('.tablinks[onclick*="Markdown"]').click();
  // Add save button functionality
  document.getElementById("saveButton").addEventListener("click", function () {
    const markdownText = markdownTextarea.value;
    saveMarkdownEntry(
      dateInfo.day,
      dateInfo.month,
      dateInfo.year,
      markdownText
    );
  });
  // Delete button with Confirmation popup functionality
  const deleteConfirmDialog = document.getElementById("delete-confirm-dialog");
  const deleteConfirmBtn = document.getElementById("delete-confirm-btn");
  const deleteCancelBtn = document.getElementById("delete-cancel-btn");
  document
    .getElementById("deleteButton")
    .addEventListener("click", function () {
      deleteConfirmDialog.showModal();
    });
  deleteConfirmBtn.addEventListener("click", function () {
    deleteMarkdownEntry(dateInfo.day, dateInfo.month, dateInfo.year);
    markdownTextarea.value = "";
    document.getElementById("markdownPreview").innerHTML = "";
    renderMarkdownEntry(dateInfo.day, dateInfo.month, dateInfo.year);
    deleteConfirmDialog.close();
    // Ensure textarea is editable
    markdownTextarea.removeAttribute("disabled");
  });
  deleteCancelBtn.addEventListener("click", function () {
    deleteConfirmDialog.close();
  });
  // Navigate back to calendar
  document
    .getElementById("backToCalendar")
    .addEventListener("click", function () {
      const markdownText = markdownTextarea.value;
      saveMarkdownEntry(
        dateInfo.day,
        dateInfo.month,
        dateInfo.year,
        markdownText
      );
      window.location.href = escape("../calendar/index.html");
    });
  // Render markdown entry on load
  renderMarkdownEntry(dateInfo.day, dateInfo.month, dateInfo.year);
});
/**
 * Opens entry windows for Markdown and To-do list
 */
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[parseInt(i, 10)].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[parseInt(i, 10)].className = tablinks[
      parseInt(i, 10)
    ].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
/**
 * Saves Markdown notes for the current day into its corresponding subdirectories.
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 * @param {string} markdown - Markdown entry.
 */
function saveMarkdownEntry(day, month, year, markdown) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const dayFilePath = path.join(monthDir, `${day}.md`);
  fs.mkdir(yearDir, { recursive: true }, (err) => {
    if (err) {
      console.error("Failed to create year directory", err);
    } else {
      fs.mkdir(monthDir, { recursive: true }, (err) => {
        if (err) {
          console.error("Failed to create month directory", err);
        } else {
          // Write markdown to file
          fs.writeFile(dayFilePath, markdown, "utf-8", (err) => {
            if (err) {
              console.error("Failed to save markdown file", err);
            } else {
              console.log(
                `Markdown file saved for ${month + 1}-${day}-${year}`
              );
            }
          });
        }
      });
    }
  });
}
/**
 * Renders Markdown notes for the current day into the notes window.
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 */
function renderMarkdownEntry(day, month, year) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const dayFilePath = path.join(monthDir, `${day}.md`);
  fs.readFile(dayFilePath, "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("No markdown file found for this date.");
      } else {
        console.error("Failed to read markdown file:", err);
      }
    } else {
      document.getElementById("markdown").value = data;
      document.getElementById("markdownPreview").innerHTML = marked(data);
    }
  });
}
/**
 * Deletes Markdown notes for the current day from its corresponding subdirectories.
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 */
function deleteMarkdownEntry(day, month, year) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const filePath = path.join(monthDir, `${day}.md`);

  console.log(filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete file:", err);
    } else {
      console.log("Delete file successfully");
      // Delete the labels associated with this date
      const labelFilePath = path.join(monthDir, "labels.json");
      fs.readFile(labelFilePath, "utf-8", (err, data) => {
        if (err) {
          console.error("Failed to read labels file:", err);
        } else {
          const labels = JSON.parse(data);
          const dayLabels = labels.find((l) => l.day === day);
          if (dayLabels) {
            dayLabels.labels.forEach((label) => {
              deleteDatetoLabel(day, month, year, label.name);
            });
          }
        }

        // Delete the labels associated with this date
        deleteLabel(day, month, year, null);
        deleteDatetoLabel(day, month, year, null);
        location.reload();
      });
    }
  });
}
