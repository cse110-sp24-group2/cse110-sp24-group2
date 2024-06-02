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
    
        // Get the date information
        const dateInfo = JSON.parse(localStorage.getItem("date"));
        
        // User must enter a name for the label
        if(!name) {
            alert("No input entered");
            return;
        }
        // Check if the label already exists
        labelExists(dateInfo.day, dateInfo.month, dateInfo.year, name).then(exists => {
            if (exists) {
                // If the label already exists, alert the user and stop the function
                alert("A label with this name already exists for this date.");
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
        });
    });
  
    // Render labels on load
    const dateInfo = JSON.parse(localStorage.getItem("date"));
    console.log("Rendering labels for:", dateInfo);
    renderLabels(dateInfo.day, dateInfo.month, dateInfo.year);
});
/**
 * Checks if a label exists for a given day
 */
function labelExists(day, month, year, name) {
    const dataDir = path.join(__dirname, '../DevJournal/Data');
    const yearDir = path.join(dataDir, year.toString());
    const monthDir = path.join(yearDir, month.toString());
    const labelFilePath = path.join(monthDir, 'labels.json');
    return new Promise((resolve, reject) => {
        fs.readFile(labelFilePath, 'utf-8', (err, data) => {
            if (err) {
                if (err.code !== 'ENOENT') {
                    console.error('Failed to read labels file:', err);
                }
                resolve(false);
            } else {
                try {
                    const labels = JSON.parse(data);
                    const dayLabels = labels.find(l => l.day === day);
                    if (dayLabels) {
                        resolve(dayLabels.labels.some(label => label.name === name));
                    } else {
                        resolve(false);
                    }
                } catch (err) {
                    console.error('Failed to parse labels file:', err);
                    resolve(false);
                }
            }
        });
    });
}
/**
 * Saves a label to its corresponding subdirectories
 */
function saveLabel(day, month, year, label) {
    const dataDir = path.join(__dirname, '../DevJournal/Data');
    const yearDir = path.join(dataDir, year.toString());
    const monthDir = path.join(yearDir, month.toString());
    const labelFilePath = path.join(monthDir, `labels.json`);
    fs.mkdir(yearDir, { recursive: true}, (err) => {
        if (err) {
            console.error('Failed to create year directory', err);
        } else {
            fs.mkdir(monthDir, { recursive: true}, (err) => {
                if (err) {
                    console.error('Failed to create month directory', err);
                } else {
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
 * Saves a label with the associated date to a JSON file.
 *
 * @param {number} day - The day of the date.
 * @param {number} month - The month of the date.
 * @param {number} year - The year of the date.
 * @param {string} label - The label to be saved.
 */
function saveDatetoLabel(day, month, year, label) {
    const dataDir = path.join(__dirname, '../DevJournal/Data');
    const labelFilePath = path.join(dataDir, `DatetoLabel.json`);
    fs.readFile(labelFilePath, 'utf-8', (err, data) => {
        let labels = {};
        if (!err && data) {
            labels = JSON.parse(data);
        }
        const date = { day, month, year };
        if (labels[label]) {
            labels[label].push(date);
        } else {
            labels[label] = [date];
        }
        fs.writeFile(labelFilePath, JSON.stringify(labels, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error('Failed to save DatetoLabel file', err);
            } else {
                console.log(`DatetoLabel file saved for label ${label}`);
            }
        });
    });
}
/**
 * Renders labels for the current day into the labels container.
 */
function renderLabels(day, month, year) {
    const dataDir = path.join(__dirname, '../DevJournal/Data');
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
                    let newLabel = document.createElement("div");
                    newLabel.classList.add("custom-label");
                    newLabel.innerHTML = `<button style="background-color: ${labelData.color || '#F0F0F0'}">${labelData.done ? `<s>${labelData.name}</s>` : `${labelData.name}`}</button>`;                    
                    document.getElementById("labels-container").appendChild(newLabel);
                    // Add the dblclick event listener to the new label
                    newLabel.querySelector("button").addEventListener("dblclick", () => {
                        console.log("Deleting label:", labelData.name);
                        newLabel.remove();
                        // Delete the label from the JSON files
                        const dateInfo = JSON.parse(localStorage.getItem("date"));
                        deleteLabel(dateInfo.day, dateInfo.month, dateInfo.year, labelData.name);
                        deleteDatetoLabel(dateInfo.day, dateInfo.month, dateInfo.year, labelData.name);
                    });
                });
            }
        }
    });
}
/**
 * Deletes a label from its corresponding subdirectories
 */
function deleteLabel(day, month, year, label) {
    const dataDir = path.join(__dirname, '../DevJournal/Data');
    const yearDir = path.join(dataDir, year.toString());
    const monthDir = path.join(yearDir, month.toString());
    const labelFilePath = path.join(monthDir, `labels.json`);
    fs.readFile(labelFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Failed to read labels file', err);
            return;
        }
        let labels = JSON.parse(data);
        const existingLabel = labels.find(l => l.day === day);
        if (existingLabel) {
            const labelIndex = existingLabel.labels.findIndex(l => l.name === label);
            if (labelIndex > -1) {
                existingLabel.labels.splice(labelIndex, 1);
                if (existingLabel.labels.length === 0) {
                    labels = labels.filter(l => l.day !== day);
                }
            }
        }
        fs.writeFile(labelFilePath, JSON.stringify(labels, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error('Failed to save labels file', err);
            } else {
                console.log(`Label ${label} deleted from ${month + 1}-${day}-${year}`);
            }
        });
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
    const dataDir = path.join(__dirname, '../DevJournal/Data');
    const labelFilePath = path.join(dataDir, `DatetoLabel.json`);
    fs.readFile(labelFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Failed to read DatetoLabel file', err);
            return;
        }
        let labels = JSON.parse(data);
        const dates = labels[label];
        if (dates) {
            const dateIndex = dates.findIndex(date => date.day === day && date.month === month && date.year === year);
            if (dateIndex > -1) {
                dates.splice(dateIndex, 1);
                if (dates.length === 0) {
                    delete labels[label];
                }
            }
        }
        fs.writeFile(labelFilePath, JSON.stringify(labels, null, 2), 'utf-8', (err) => {
            if (err) {
                console.error('Failed to save DatetoLabel file', err);
            } else {
                console.log(`Date ${month + 1}-${day}-${year} deleted from label ${label}`);
            }
        });
    });
}