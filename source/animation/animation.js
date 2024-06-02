document.addEventListener("DOMContentLoaded", function () {
  const animationDuration = 6000;
  setTimeout(function () {
    document.getElementById('centerText').classList.remove('hidden');
    setTimeout(function () {
      window.location.href = "../calendar/index.html";
    }, animationDuration);
  }, animationDuration);
});
