const fs = require("fs");
const path = require("path");
/**
 * @function labelExists
 * Checks if a label exists for a specific day.
 *
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 * @param {string} name - The name of the label.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the label exists.
 */
function labelExists(day, month, year, name) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const labelFilePath = path.join(monthDir, "labels.json");
  return new Promise((resolve) => {
    fs.readFile(labelFilePath, "utf-8", (err, data) => {
      if (err) {
        if (err.code !== "ENOENT") {
          console.error("Failed to read labels file:", err);
        }
        resolve(false);
      } else {
        try {
          const labels = JSON.parse(data);
          const dayLabels = labels.find((l) => l.day === day);
          if (dayLabels) {
            resolve(dayLabels.labels.some((label) => label.name === name));
          } else {
            resolve(false);
          }
        } catch (err) {
          console.error("Failed to parse labels file:", err);
          resolve(false);
        }
      }
    });
  });
}
/**
 * @function saveLabel
 * Saves a label for a specific day.
 *
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 * @param {string} label - The label to save.
 */
function saveLabel(day, month, year, label) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const labelFilePath = path.join(monthDir, `labels.json`);
  fs.mkdir(yearDir, { recursive: true }, (err) => {
    if (err) {
      console.error("Failed to create year directory", err);
    } else {
      fs.mkdir(monthDir, { recursive: true }, (err) => {
        if (err) {
          console.error("Failed to create month directory", err);
        } else {
          fs.readFile(labelFilePath, "utf-8", (err, data) => {
            let labels = [];
            if (!err && data) {
              labels = JSON.parse(data);
            }
            const existingLabel = labels.find((l) => l.day === day);
            if (existingLabel) {
              existingLabel.labels.push(label);
            } else {
              labels.push({ day, labels: [label] });
            }
            fs.writeFile(
              labelFilePath,
              JSON.stringify(labels, null, 2),
              "utf-8",
              (err) => {
                if (err) {
                  console.error("Failed to save labels file", err);
                } else {
                  console.log(
                    `Labels file saved for ${month + 1}-${day}-${year}`
                  );
                }
              }
            );
          });
        }
      });
    }
  });
}
/**
 * Saves a label with the associated date to a JSON file.
 *
 * @param {number} day - The day of the date.
 * @param {number} month - The month of the date.
 * @param {number} year - The year of the date.
 * @param {string} label - The label to be saved.
 */
function saveDatetoLabel(day, month, year, label) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const labelFilePath = path.join(dataDir, `DatetoLabel.json`);
  fs.readFile(labelFilePath, "utf-8", (err, data) => {
    let labels = {};
    if (!err && data) {
      labels = JSON.parse(data);
    }
    const date = { day, month, year };
    if (labels[String(label)]) {
      labels[String(label)].push(date);
    } else {
      labels[String(label)] = [date];
    }
    fs.writeFile(
      labelFilePath,
      JSON.stringify(labels, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Failed to save DatetoLabel file", err);
        } else {
          console.log(`DatetoLabel file saved for label ${label}`);
        }
      }
    );
  });
}
/**
 * Deletes a label for a specific day.
 *
 * @param {number} day - The day of the month.
 * @param {number} month - The month of the year.
 * @param {number} year - The year.
 * @param {string} label - The name of the label to delete.
 */
function deleteLabel(day, month, year, label) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const yearDir = path.join(dataDir, year.toString());
  const monthDir = path.join(yearDir, month.toString());
  const labelFilePath = path.join(monthDir, `labels.json`);
  fs.readFile(labelFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to read labels file", err);
      return;
    }
    let labels = JSON.parse(data);
    const existingLabel = labels.find((l) => l.day === day);
    if (existingLabel) {
      const labelIndex = existingLabel.labels.findIndex(
        (l) => l.name === label
      );
      if (labelIndex > -1) {
        existingLabel.labels.splice(labelIndex, 1);
        if (existingLabel.labels.length === 0) {
          labels = labels.filter((l) => l.day !== day);
        }
      }
    }
    fs.writeFile(
      labelFilePath,
      JSON.stringify(labels, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Failed to save labels file", err);
        } else {
          console.log(
            `Label ${label} deleted from ${month + 1}-${day}-${year}`
          );
        }
      }
    );
  });
}
/**
 * Deletes a date associated with a label from the DatetoLabel.json file.
 *
 * @param {number} day - The day of the date.
 * @param {number} month - The month of the date.
 * @param {number} year - The year of the date.
 * @param {string} label - The label to be deleted.
 */
function deleteDatetoLabel(day, month, year, label) {
  const dataDir = path.join(__dirname, "../../DevJournal/Data");
  const labelFilePath = path.join(dataDir, `DatetoLabel.json`);
  fs.readFile(labelFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to read DatetoLabel file", err);
      return;
    }
    let labels = JSON.parse(data);
    const dates = labels[String(label)];
    if (dates) {
      const dateIndex = dates.findIndex(
        (date) => date.day === day && date.month === month && date.year === year
      );
      if (dateIndex > -1) {
        dates.splice(dateIndex, 1);
        if (dates.length === 0) {
          if (labels.hasOwnProperty(String(label))) {
            delete labels[String(label)];
          }
        }
      }
    }
    fs.writeFile(
      labelFilePath,
      JSON.stringify(labels, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Failed to save DatetoLabel file", err);
        } else {
          console.log(
            `Date ${month + 1}-${day}-${year} deleted from label ${label}`
          );
        }
      }
    );
  });
}
module.exports = {
  labelExists,
  saveLabel,
  saveDatetoLabel,
  deleteLabel,
  deleteDatetoLabel,
};
