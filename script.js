document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/objects.json")
        .then(response => response.json())
        .then(data => {
            let randomIndex = Math.floor(Math.random() * data.length);
            let selectedObject = data[randomIndex];

            // Set background image
            document.getElementById("background").src = "assets/images/" + selectedObject.background;

            // Set object path
            let overlay = document.getElementById("overlay");
            overlay.innerHTML = `
                <path d="${selectedObject.path}" 
                    fill="transparent" stroke="red" stroke-width="2"
                    onclick="showMessage(true)" pointer-events="all"/>
            `;
        })
        .catch(error => console.error("Error loading objects:", error));
});

function showMessage(isCorrect) {
    event.stopPropagation();
    document.getElementById("result").textContent = isCorrect ? "Yes, you found it!" : "No, try again!";
}
