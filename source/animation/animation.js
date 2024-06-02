/**
 * Wait for 5 seconds and then redirect to the calendar page
 * @function updateMonthYear
 */
document.addEventListener("DOMContentLoaded", function () {
  const animationDuration = 5000;
  setTimeout(function () {
    window.location.href = "../calendar/index.html";
  }, animationDuration);
});
