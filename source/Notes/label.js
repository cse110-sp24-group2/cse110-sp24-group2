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
                    let newLabel = document.createElement("div");
                    newLabel.classList.add("custom-label");
                    newLabel.innerHTML = `<button style="background-color: ${labelData.color}">${labelData.done ? `<s>${labelData.name}</s>` : `${labelData.name}`}</button>`;
                    
                    newLabel.querySelector("button").addEventListener("dblclick", () => {
                        newLabel.remove();
                    });
                    
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
        let newLabel = document.createElement("div");
        newLabel.classList.add("custom-label");
        newLabel.innerHTML = `<button style="background-color: ${color || "#F0F0F0"}">${name || "New Label"}</button>`;
        
        newLabel.querySelector("button").addEventListener("dblclick", () => {
            newLabel.remove();
        });
        
        document.getElementById("labels-container").appendChild(newLabel);

        // Save the label to the JSON file
        const dateInfo = JSON.parse(localStorage.getItem("date"));
        console.log("Saving label:", { name, color });
        saveLabel(dateInfo.day, dateInfo.month, dateInfo.year, { name, color });
    });

    // Render labels on load
    const dateInfo = JSON.parse(localStorage.getItem("date"));
    console.log("Rendering labels for:", dateInfo);
    renderLabels(dateInfo.day, dateInfo.month, dateInfo.year);
});