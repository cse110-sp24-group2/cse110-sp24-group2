class SearchBar extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Create a container element
        const container = document.createElement('div');
        const styleElement = document.createElement('style');

        styleElement.textContent = `
        .search-container {
            display: flex;
            position: relative;
            align-items: center;
            gap: 10px;
            margin-left: 20px;
        }
        
        #search-bar {
            padding: 5px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        
        #search-button {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: var(--month-color);
            color: white;
            cursor: pointer;
        }
        
        #search-button:hover {
            background-color: red;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        }

        #suggestions {
            position: absolute;
            margin-top: auto;
            bottom: auto;
            display: none
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .suggestion {
            padding: 10px;
            background-color: #f9f9f9;
            color: black; 
            cursor: pointer;
        }
        
        .suggestion:hover {
            background-color: #f0f0f0;
        }
        `;

        container.innerHTML = `
            <div class="search-container">
                <input type="text" id="search-bar" placeholder="Search notes...">
                <button id="search-button">Search</button>
            </div>
            <div class = "suggestions-content" id="suggestions"></div>
        `;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(container);
        
        const searchInput = container.querySelector('#search-bar');
        const suggestions = container.querySelector('#suggestions');
        
        // Event listener for the search input
        searchInput.addEventListener('input', function () {
            const query = this.value;
            fetchSuggestions(query);
        });
        
    
        // Function to fetch suggestions
        const fetchSuggestions = (query) => {
            const constSuggestions = ['important', 'personal', 'project1', 'project2', 'project3'];
            
            // Filter the suggestions based on query
            const filteredSuggestions = constSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query.toLowerCase())
            );
            
            // Clear previous suggestions
            suggestions.innerHTML = '';
            
            // Display filtered suggestions
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

            // Show suggestions if there are any
            if (filteredSuggestions.length > 0) {
                suggestions.style.display = 'block';
            } else {
                suggestions.style.display = 'none';
            }

        };

        // Event listener for clicks outside the dropdown
        document.addEventListener('click', function(event) {
            if (!container.contains(event.target)) {
                suggestions.style.display = 'none';
            }
        });

        // Set the button color based on the current month
        this.updateButtonColor();
    }

    
    // I tried matching the color of the search button with the color of the current month but could not get it to work.
    // I have set the default color of the search button as red for now but it can be changed from search button style code above.
    
    updateButtonColor(currentMonth) {
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

        const currentMonthClass = monthClasses.currentMonth;
        const searchButton = this.shadowRoot.getElementById('search-button');
        searchButton.style.backgroundColor = monthColors[currentMonthClass];
    }
}

// Define the new custom element
customElements.define('search-bar-element', SearchBar);
