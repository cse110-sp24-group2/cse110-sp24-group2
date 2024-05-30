import {monthColors} from '../calendar/monthValues.js';   
// const {monthColors} = require('../calendar/shared.js');
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
        
    
        /** 
         * @method fetchSuggestions
         * Function to fetch autofill suggestions for the "search day entries for label" bar.
         * 
         * @param {string} query - The current state of the search query entered by the user. Most likely, 
         * it will be an incomplete word that the function will use to suggest completions.
         * 
         * @returns {boolean} - Returns true if there are suggestions to display, false otherwise.
         * 
        */
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
                return true;
            } else {
                suggestions.style.display = 'none';
                return false;
            }

        };

        /**
         * 
         * 
         * @returns {Array} - Returns an array of labels that can be used for the autocomplete bar
         */
        const getLabels = () =>  {
            return ['important', 'personal', 'project1', 'project2', 'project3'];
        }

        // Event listener for clicks outside the dropdown
        document.addEventListener('click', function(event) {
            if (!container.contains(event.target)) {
                suggestions.style.display = 'none';
            }
        });

        // Set the button color based on the current month
        this.updateButtonColor();
    }



    /**
     * @function updateButtonColor
     * Updates the color of the search button based on the current month.
     * 
     */
    updateButtonColor() {

        const searchButton = this.shadowRoot.getElementById('search-button');
        searchButton.style.backgroundColor = monthColors.currentMonthClass;
    }
}

// Make custom component so user can create multiple copies 
customElements.define('search-bar-element', SearchBar);
