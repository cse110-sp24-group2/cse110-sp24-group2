document.addEventListener("DOMContentLoaded", function () {
  // Get the main components of the calendar and set date info
  const calendarContainer = document.getElementById("calendar");
  const monthLabel = document.getElementById("current-month");
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const monthNames = [
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

  const monthClasses = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const holidays = [
    new Date(currentYear, 0, 1), // New Year's Day
    new Date(currentYear, 1, 14), // Valentine's Day
    new Date(currentYear, 6, 4), // Independence Day
    new Date(currentYear, 9, 31), // Halloween
    new Date(currentYear, 10, 11), // Veterans Day
    new Date(currentYear, 11, 25), // Christmas Day
    new Date(currentYear, 11, 31), // New Year's Eve
  ];

  /**
   * Updates the month and year displayed on the calendar
   * @function updateMonthYear
   */
  function updateMonthYear() {
    monthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    monthLabel.className = ""; // Clear previous class
    monthLabel.classList.add(monthClasses[currentMonth]); // Apply new class for font color
  }

  /**
   * Returns the number of days in a given month of a given year.
   * @function daysInMonth
   * @param {number} month - The month (0-11).
   * @param {number} year - The year.
   * @returns {number} The number of days in the month.
   */
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * Creates the calendar for a specific month and year.
   * @function createCalendar
   * @param {number} month - The month of the calendar.
   * @param {number} year - The year of the calendar.
   */
  function createCalendar(month, year) {
    updateMonthYear();

    // Get some of the info to build dates
    let firstDay = new Date(year, month, 1).getDay();
    let lastDay = new Date(year, month + 1, 0).getDay();
    let lastDatePrevMonth = new Date(year, month, 0).getDate();

    calendarContainer.innerHTML = ""; // Clear previous calendar

    // Add the beginning days of the previous month
    for (let i = firstDay; i > 0; i--) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day", "diff-month");
      dayElement.textContent = lastDatePrevMonth - i + 1;
      dayElement.setAttribute("tabindex", "0"); // Add tabindex to make days keyboard accessible
      calendarContainer.appendChild(dayElement);
    }
    // Add the days of the current month
    for (let day = 1; day <= daysInMonth(month, year); day++) {
      const dayElement = document.createElement("div");
      // Adds specific month class
      dayElement.classList.add("day", monthClasses[parseInt(month, 10)]);
      dayElement.textContent = day;
      dayElement.setAttribute("tabindex", "0"); // Add tabindex to make days keyboard accessible
      calendarContainer.appendChild(dayElement);
      // Check if the date is a holiday
      const currentDate = new Date(year, month, day);
      const isHoliday = holidays.some(
        (holiday) =>
          holiday.getMonth() === currentDate.getMonth() &&
          holiday.getDate() === currentDate.getDate(),
      );
      if (isHoliday) {
        dayElement.classList.add("holiday");
      }
      // Highlight the current day
      highlightCurrentDay(month, year);
      // Determine what happens if the day is clicked
      dayElement.onclick = function () {
        // Create object of date info
        const dateInfo = {
          day: day,
          month: month,
          year: year,
        };
        // Set the date in localStorage for notes to access
        localStorage.setItem("date", JSON.stringify(dateInfo));
        // Navigate to the notes page
        window.location.href = escape("../Notes/index.html");
      };

      // Add event listener for keyboard navigation
      dayElement.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          // Create object of date info
          const dateInfo = {
            day: day,
            month: month,
            year: year,
          };
          // Set the date in localStorage for notes to access
          localStorage.setItem("date", JSON.stringify(dateInfo));
          // Navigate to the notes page
          window.location.href = escape("../Notes/index.html");
          e.preventDefault();
        }
      });
    }

    // Fill the week with days from the next month
    let num = 1;
    for (let i = lastDay + 1; i <= 6; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day", "diff-month");
      dayElement.textContent = num;
      dayElement.setAttribute("tabindex", "0"); // Add tabindex to make days keyboard accessible
      calendarContainer.appendChild(dayElement);
      num++;
    }
  }
  document
    .getElementById("prev-month")
    .addEventListener("click", () => changeMonth(-1));
  document
    .getElementById("next-month")
    .addEventListener("click", () => changeMonth(1));
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

  /**
   * Highlights the current day on the calendar.
   * @function highlightCurrentDay
   * @param {number} month - The month of the calendar.
   * @param {number} year - The year of the calendar.
   */
  function highlightCurrentDay(month, year) {
    const today = new Date();
    if (month === today.getMonth() && year === today.getFullYear()) {
      const days = document.getElementsByClassName("day");
      for (const day of days) {
        if (day.classList[1] != "diff-month") {
          if (parseInt(day.textContent, 10) === today.getDate()) {
            day.classList.add("current-day");
          }
        }
      }
    }
  }

  



});
