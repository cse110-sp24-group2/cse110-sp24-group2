document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-bar');
    const suggestions = document.getElementById('suggestions');

    searchInput.addEventListener('input', function () {
        const query = this.value;
        fetchSuggestions(query);
    });

    const fetchSuggestions = (query) => {
        const constSuggestions = ['important', 'personal', 'project1', 'project2', 'project3'];

        const filteredSuggestions = constSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );

        suggestions.innerHTML = '';

        filteredSuggestions.forEach(suggestion => {
            const suggestionElement = document.createElement('div');
            suggestionElement.textContent = suggestion;
            suggestionElement.classList.add('suggestion');

            suggestionElement.addEventListener('click', function () {
                searchInput.value = suggestion;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(suggestionElement);
        });

        if (filteredSuggestions.length > 0) {
            suggestions.style.display = 'block';
            return true;
        } else {
            suggestions.style.display = 'none';
            return false;
        }
    };

    document.addEventListener('click', function (event) {
        if (!document.querySelector('.search-container').contains(event.target)) {
            suggestions.style.display = 'none';
        }
    });

    const updateButtonColor = () => {
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
            "december"
        ];

        const monthColors = {
            january: "#c14300",
            february: "#f29cac",
            march: "#28a745",
            april: "#e83e8c",
            may: "#790258",
            june: "#154a27",
            july: "#17a2b8",
            august: "#d1890c",
            september: "#dc3545",
            october: "#d45810",
            november: "#343a40",
            december: "#53697d"
        };

        const currentMonthClass = monthClasses[new Date().getMonth()];
        const searchButton = document.getElementById('search-button');
        searchButton.style.backgroundColor = monthColors[currentMonthClass];
    };

    updateButtonColor();
});
