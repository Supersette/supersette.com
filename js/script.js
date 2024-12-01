const textElement = document.querySelector('.looping-text');

// Text states and their display durations (in milliseconds)
const textStates = [
  { text: "hi", duration: 2000 },      // Stay longer
  { text: "hi.", duration: 200 },
  { text: "hi..", duration: 200 },
  { text: "hi...", duration: 2000 },  // Stay longer
  { text: "hi..", duration: 200 },
  { text: "hi.", duration: 200 }
];

let index = 0;

function updateText() {
  // Update the text content
  textElement.textContent = textStates[index].text;

  // Set a timeout for the next update based on the current state's duration
  setTimeout(() => {
    index = (index + 1) % textStates.length; // Loop back to the start
    updateText(); // Recursively call the function
  }, textStates[index].duration);
}

// Start the animation
updateText();
