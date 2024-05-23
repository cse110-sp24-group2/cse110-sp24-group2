// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  console.log("init");
  // Get the recipes from localStorage

  // Change this main element to the label bar holder, append all labels to label bar holder
  const mainElement = document.querySelector("main");
  if (!mainElement) {
    console.log("No main element");
    return;
  }

  let newLabel = document.createElement("custom-label");

  newLabel.data = {
    name: "HTML Task",
    color: "red", 
    done: false, // determines if the task is strikethrough
  };

  mainElement.appendChild(newLabel);

  let newLabel2 = document.createElement("custom-label");

  newLabel2.data = {
    name: "CSS Task",
    color: "green",
    done: true,
  };

  mainElement.appendChild(newLabel2);
}
