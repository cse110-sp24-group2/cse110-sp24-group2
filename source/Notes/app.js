document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the date from local storage
    var dateInfo = localStorage.getItem("date");

    // Parse the JSON string back into an object
    dateInfo = JSON.parse(dateInfo);

    // Create an array of month names
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    // Format the date
    var formattedDate = monthNames[dateInfo.month] + ' ' + dateInfo.day + ' ' + dateInfo.year;

    // Display the date
    document.getElementById('dateDisplay').textContent = formattedDate;
    var markdownTextarea = document.getElementById('markdown');
    markdownTextarea.addEventListener('input', function() {
        var markdown = markdownTextarea.value;
        var html = marked(markdown);
        document.getElementById('markdownPreview').innerHTML = html;
    });

    // Simulate a click on the "Markdown" button
    document.querySelector('.tablinks[onclick*="Markdown"]').click();
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}