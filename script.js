let objects = [];
let currentIndex = -1;

// Load objects from JSON file
async function fetchObjects() {
    try {
        const response = await fetch("assets/objects.json");
        objects = await response.json();
        loadNextChallenge(); // Load first challenge after fetching data
    } catch (error) {
        console.error("Error loading objects.json:", error);
    }
}

// Load a new random object
function loadNextChallenge() {
    if (objects.length === 0) return;

    currentIndex = Math.floor(Math.random() * objects.length);
    let object = objects[currentIndex];

    document.getElementById("background-img").src = "assets/images/" + object.background;
    document.getElementById("object-path").setAttribute("d", object.path);
    document.getElementById("result").textContent = "";
}

// Show message based on whether the correct object was clicked
function showMessage(isCorrect) {
    event.stopPropagation();
    document.getElementById("result").textContent = isCorrect
        ? `Yes, it is a ${objects[currentIndex].name}!`
        : "No, try again!";
}

// Navigate back to main menu
function goToMainMenu() {
    window.location.href = "index.html";
}

// Fetch objects when page loads
window.onload = fetchObjects;
