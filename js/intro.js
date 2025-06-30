document.getElementById("username").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const username = e.target.value.trim();
    if (username) {
      localStorage.setItem("githubUser", username);
      window.location.href = "html/dashboard.html"; // load the main dashboard
    }
  }
});

// Add a simple terminal-like effect
const terminalScreen = document.querySelector('.terminal-screen');
const prompt = document.getElementById('prompt');

function typeEffect(element, text, delay) {
  element.textContent = ''; // Clear existing text
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, delay);
    }
  }

  type();
}

// Start the type effect
typeEffect(prompt, "Enter GitHub username:", 100);
