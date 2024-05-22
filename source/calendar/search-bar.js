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
            align-items: center;
            gap: 10px;
            margin-left: 20px;
        }
        
        #search-bar {
            padding: 5px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            flex: 1;
        }
        
        #search-button {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: red;
            color: white;
            cursor: pointer;
        }
        
        #search-button:hover {
            background-color: red;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        }
        `;

        container.innerHTML = `
            <div class="search-container">
                <input type="text" id="search-bar" placeholder="Search notes...">
                <button id="search-button">Search</button>
            </div>
        `;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(container);

        // Set the button color based on the current month
        //this.updateButtonColor();
    }

    // updateButtonColor() {
    //     const monthClasses = [
    //         "january",
    //         "february",
    //         "march",
    //         "april",
    //         "may",
    //         "june",
    //         "july",
    //         "august",
    //         "september",
    //         "october",
    //         "november",
    //         "december"
    //     ];

    //     const monthColors = {
    //         january: "#c14300",
    //         february: "#f29cac",
    //         march: "#28a745",
    //         april: "#e83e8c",
    //         may: "#790258",
    //         june: "#154a27",
    //         july: "#17a2b8",
    //         august: "#d1890c",
    //         september: "#dc3545",
    //         october: "#d45810",
    //         november: "#343a40",
    //         december: "#53697d"
    //     };

    //     const currentMonthClass = monthClasses[new Date().getMonth()];
    //     const searchButton = this.shadowRoot.getElementById('search-button');
    //     searchButton.style.backgroundColor = monthColors[currentMonthClass];
    // }
}

// Define the new custom element
customElements.define('search-bar-element', SearchBar);
