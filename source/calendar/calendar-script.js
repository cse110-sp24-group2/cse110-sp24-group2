document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const monthLabel = document.getElementById('current-month');
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let entries = {};
    const monthBackgrounds = [];


    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    const monthClasses = ["january", "february", "march", "april", "may", "june",
                          "july", "august", "september", "october", "november", "december"];
    const holidays = [
    new Date(currentYear, 0, 1), // New Year's Day
    new Date(currentYear, 1, 14), // Valentine's Day
    new Date(currentYear, 6, 4), // Independence Day
    new Date(currentYear, 10, 11), // Veterans Day
    new Date(currentYear, 11, 25), // Christmas Day
    ];
    /**
     * Updates the month and year displayed on the calendar
     */

    function updateMonthYear() {
        monthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        document.body.style.backgroundImage = monthBackgrounds[currentMonth];
        monthLabel.className = ''; // Clear previous class
        monthLabel.classList.add(monthClasses[currentMonth]); // Apply new class for font color
    }
    /**
    * Returns the number of days in a given month of a given year.
    * @param {number} month - The month (0-11).
    * @param {number} year - The year.
    * @returns {number} The number of days in the month.
    */
    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }
    // Get the form and the entries list
    const entryForm = document.getElementById('entry-form');
    const entryInput = document.getElementById('entry');
    const entryInputTime = document.getElementById('entryTime');
    const entriesList = document.getElementById('entries');

    /**
     * Handles the form submission event.
     * @param {Event} e - The form submission event.
     */
    entryForm.onsubmit = function(e) {
        e.preventDefault();
        // Add the new entry
        addEntry(currentDay, currentMonth, currentYear, (entryInput.value + " @ " + entryInputTime.value));
        // Clear the input field
        entryInput.value = '';
        // Reload the entries
        loadEntries(currentDay, currentMonth, currentYear);
    }


   /**
     * Adds a new entry to the entries object.
     * @param {number} day - The day of the entry.
     * @param {number} month - The month of the entry.
     * @param {number} year - The year of the entry.
     * @param {string} entry - The entry text.
     */
    function addEntry(day, month, year, entry) {
        // Get the date string
        let dateString = `${day}-${month}-${year}`;
        // If there are no entries for this date, create an array
        if (!entries[dateString]) {
            entries[dateString] = [];
        }
        // Add the new entry
        entries[dateString].push(entry);
    }

    /**
     * Loads the entries for a specific day and displays them in the entries list.
     * @param {number} day - The day of the entries.
     * @param {number} month - The month of the entries.
     * @param {number} year - The year of the entries.
     */
    function loadEntries(day, month, year) {
        // Clear the entries list
        entriesList.innerHTML = '';
        // Display the entries
        for (let i = 0; i < getEntries(day, month, year).length; i++) {
            let entry = document.createElement('li');
            entry.setAttribute("class", "entry-item");
            entry.textContent = getEntries(day, month, year)[i];
            // Add a delete button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = function() {
                // Delete this entry
                getEntries(day, month, year).splice(i, 1);
                // Reload the entries
                loadEntries(day, month, year);
            };
            entry.appendChild(deleteButton);
            entriesList.appendChild(entry);
        }
    }

    /**
     * Returns the entries for a specific day.
     * @param {number} day - The day of the entries.
     * @param {number} month - The month of the entries.
     * @param {number} year - The year of the entries.
     * @returns {Array} The entries for the specified day.
     */
    function getEntries(day, month, year) {
        // Get the date string
        let dateString = `${day}-${month}-${year}`;
        // If there are no entries for this date, return an empty array
        if (!entries[dateString]) {
            return [];
        }
        // Otherwise, return the entries for this date
        return entries[dateString].sort((a,b) => {
            
            const time1 = a.substring(a.length - 5);
            const time2 = b.substring(b.length - 5);

            return time1.localeCompare(time2);
        });
    }
    /**
     * Creates the calendar for a specific month and year.
     * @param {number} month - The month of the calendar.
     * @param {number} year - The year of the calendar.
     */
    function createCalendar(month, year) {
        updateMonthYear();

        // Get some of the info to build dates
        let firstDay = new Date(year, month, 1).getDay();
        let lastDay = new Date(year, month + 1, 0).getDay();
        let lastDatePrevMonth = new Date(year, month, 0).getDate();

        calendarContainer.innerHTML = ''; // Clear previous calendar

        // Add the beginning days of the previous month
        for (let i = firstDay; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'diff-month');
            dayElement.textContent = lastDatePrevMonth - i + 1;
            calendarContainer.appendChild(dayElement);
        }
        // Add the days of the current month
        for (let day = 1; day <= daysInMonth(month, year); day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', monthClasses[month]); // Adds specific month class
            dayElement.textContent = day;
            calendarContainer.appendChild(dayElement);
            const currentDate = new Date(year, month, day);
            const isHoliday = holidays.some(holiday => holiday.toDateString() === currentDate.toDateString());
            if (isHoliday){
                dayElement.classList.add('holiday');
            }
            dayElement.onclick = function() {
                currentDay = day;
                currentMonth = month;
                currentYear = year;
                loadEntries(currentDay, currentMonth, currentYear);
                // modal.style.display = "block";
                // modalDate.textContent = `${day} of ${monthNames[month]}, ${year}`;
                const modal = document.getElementById('modal'); 
                const modalDate = document.getElementById('modal-date'); // Get the modal date element
                modal.style.display = "block";
                modalDate.textContent = `${day} of ${monthNames[month]}, ${year}`;

                //Set background colour class for modal
                modal.className = 'modal ' + monthClasses[month];
            };
            calendarContainer.appendChild(dayElement);

        }


        // Fill the week with days from the next month
        let num = 1;
        for (let i = lastDay+1; i <= 6; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'diff-month');
            dayElement.textContent = num;
            calendarContainer.appendChild(dayElement);
            num++;
        }
    }

    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
    /**
     * Changes the current month by a specified amount.
     * @param {number} change - The amount to change the month by.
     */
    function changeMonth(change) {
        currentMonth += change;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        createCalendar(currentMonth, currentYear);
    }
    createCalendar(currentMonth, currentYear);
    const closeButton = document.getElementById('close-form');
    closeButton.onclick = function() {
        // Hide the form
        document.getElementById('modal').style.display = 'none';
    };

    const crossButton = document.querySelector('.close');
    crossButton.onclick = function() {
        // Hide the form
        document.getElementById('modal').style.display = 'none';
    };
});
