document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-bar');
    const labelsContainer = document.getElementById('labels-container');
    
    const labels = ['important', 'personal', 'project1', 'project2', 'project3'];
    
    const displayLabels = (labelsToDisplay) => {
        labelsContainer.innerHTML = '';
        labelsToDisplay.forEach(label => {
            const labelElement = document.createElement('div');
            labelElement.textContent = label;
            labelElement.classList.add('label');
            labelsContainer.appendChild(labelElement);
        });
    };
    
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredLabels = labels.filter(label =>
            label.toLowerCase().includes(query)
        );
        displayLabels(filteredLabels);
    });
    
    // Display all labels initially
    displayLabels(labels);
});
