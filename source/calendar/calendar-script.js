document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar');
    const monthLabel = document.getElementById('current-month');
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
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

    /**
     * Handles the form submission event.
     * @param {Event} e - The form submission event.
     */
    entryForm.onsubmit = function(e) {
        e.preventDefault();
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
                // modal.style.display = "block";
                // modalDate.textContent = `${day} of ${monthNames[month]}, ${year}`;
                const modal = document.getElementById('modal'); 
                const modalDate = document.getElementById('modal-date'); // Get the modal date element
                modal.style.display = "block";
                //Set background colour class for modal
                modal.className = 'modal ' + monthClasses[month];
                const event = new CustomEvent('hasClicked', { detail: {currentDay, currentMonth, currentYear} });
                document.dispatchEvent(event);
            };
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