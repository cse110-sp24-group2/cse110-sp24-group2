document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-bar');
    const labelsContainer = document.getElementById('labels-container');

    const constSuggestions = ['important', 'personal', 'project1', 'project2', 'project3'];

    const displayLabels = (labels) => {
        labelsContainer.innerHTML = '';
        labels.forEach(label => {
            const labelElement = document.createElement('div');
            labelElement.textContent = label;
            labelElement.classList.add('label');

            labelElement.addEventListener('click', function () {
                searchInput.value = label;
                filterLabels(label);
            });

            labelsContainer.appendChild(labelElement);
        });
    };

    const filterLabels = (query) => {
        const filteredLabels = constSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(query.toLowerCase())
        );
        displayLabels(filteredLabels);
    };

    searchInput.addEventListener('input', function () {
        const query = this.value;
        filterLabels(query);
    });

    const updateButtonColor = () => {
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
    };

    updateButtonColor();
    displayLabels(constSuggestions);
});
