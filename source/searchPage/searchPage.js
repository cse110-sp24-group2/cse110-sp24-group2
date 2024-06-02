console.log('searchPage.js loaded');
const fs = require('fs');
const path = require('path');

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-bar');
    const labelsContainer = document.getElementById('labels-container');
    const labelToDate = JSON.parse(fs.readFileSync(path.join(__dirname, "../DevJournal",'/Data', 'DatetoLabel.json'), 'utf8'));
    // Event listener for input event on search input
    searchInput.addEventListener('input', function () {
        const query = this.value;
        console.log(`Input event triggered with query: ${query}`);
        filterLabels(query, labelsContainer, searchInput);
        const datesContainer = document.getElementById('dates-container');
        // If the query matches a label, display the dates for that label
        if (labelToDate.hasOwnProperty(query)) {
            console.log(`Query matches a label in labelToDate: ${query}`);
            displayDates(query, labelToDate);
        } else {
            console.log(`Query does not match any label in labelToDate: ${query}`);
            datesContainer.innerHTML = '';
        }
    });

    updateButtonColor();
    filterLabels('', labelsContainer, searchInput);
});

/**
 * Display labels in the labels container.
 * @param {Array} labels - The labels to display.
 * @param {HTMLElement} labelsContainer - The container to display labels in.
 * @param {HTMLElement} searchInput - The search input element.
 */
function displayLabels(labels, labelsContainer, searchInput) {
    labelsContainer.innerHTML = '';
    labels.forEach(label => {
        const labelElement = document.createElement('div');
        labelElement.textContent = label;
        labelElement.classList.add('label');

        // Event listener for click event on label element
        labelElement.addEventListener('click', function () {
            searchInput.value = label;
            displayDates(label, JSON.parse(fs.readFileSync(path.join(__dirname, "../DevJournal", '/Data', 'DatetoLabel.json'), 'utf8')));
        });

        labelsContainer.appendChild(labelElement);
    });
}
/**
 * Display dates as clickable buttons for a given label.
 * @param {string} label - The label to display dates for.
 * @param {Object} labelToDate - The label to date mapping.
 */
function displayDates(label, labelToDate) {
    const datesContainer = document.getElementById('dates-container');
    datesContainer.innerHTML = '';

    console.log(`Displaying dates for label: ${label}`);

    if (labelToDate.hasOwnProperty(label)) {
        console.log(`Found label in labelToDate: ${label}`);
        labelToDate[label].forEach(dateObj => {
            const dateStr = `${dateObj.month+1}/${dateObj.day}/${dateObj.year}`;
            console.log(`Creating button for date: ${dateStr}`);
            const dateButton = document.createElement('button');
            dateButton.textContent = dateStr;
            dateButton.classList.add('date-button');

            // Event listener for click event on date button
            dateButton.addEventListener('click', function () {
                localStorage.setItem('date', JSON.stringify(dateObj));
                // Navigate to the Notes Page
                window.location.href = escape('../Notes/index.html');
            });

            datesContainer.appendChild(dateButton);
        });
    } else {
        console.log(`Label not found in labelToDate: ${label}`);
    }
}
/**
 * Filter labels based on a query and display them.
 * @param {string} query - The query to filter labels.
 * @param {HTMLElement} labelsContainer - The container to display labels in.
 * @param {HTMLElement} searchInput - The search input element.
 */
function filterLabels(query, labelsContainer, searchInput) {
    const constSuggestions = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, '../DevJournal', '/Data', 'DatetoLabel.json'), 'utf8')));
    const filteredLabels = constSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );
    displayLabels(filteredLabels, labelsContainer, searchInput, filterLabels);
}

/**
 * Update the color of the search button based on the current month.
 */
function updateButtonColor() {
    const monthClasses = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];

    const monthColors = {
        january: "#c14300", february: "#f29cac", march: "#28a745", april: "#e83e8c",
        may: "#790258", june: "#154a27", july: "#17a2b8", august: "#d1890c",
        september: "#dc3545", october: "#d45810", november: "#343a40", december: "#53697d"
    };

    const currentMonthClass = monthClasses[new Date().getMonth()];
    const searchButton = document.getElementById('search-button');
    searchButton.style.backgroundColor = monthColors[currentMonthClass];
}
// Navigate back to calendar
document.getElementById('backToCalendar').addEventListener('click', function() {
    window.location.href = escape('../calendar/index.html');
});