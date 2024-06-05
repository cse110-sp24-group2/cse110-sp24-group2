const fs = require("fs");
const path = require("path");

/**
 * Saves Markdown notes for the current day into its corresponding subdirectories.
 */
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

module.exports = {
    saveMarkdownEntry,
    renderMarkdownEntry,
    deleteMarkdownEntry
};