document.addEventListener("DOMContentLoaded", () => {
  const gameWindow = document.getElementById("game-window");
  const scoreDisplay = document.getElementById("score-display");
  let score = 0;
  let gameActive = true; // Tracks if the game is active

  // Function to create a new falling object
  function createFallingObject() {
    if (!gameActive) return; // Stop creating balls if the game is inactive

    const object = document.createElement("div");
    object.classList.add("falling-object");

    // Randomly decide the ball type: orange or red
    const isRedBall = Math.random() < 0.2; // 20% chance of red ball
    if (isRedBall) {
      object.classList.add("red-ball");
    }

    // Random size between 50px and 100px
    const size = Math.random() * (100 - 50) + 50;
    object.style.width = `${size}px`;
    object.style.height = `${size}px`;

    // Set random horizontal position
    object.style.left = `${Math.random() * (gameWindow.clientWidth - size)}px`;

    // Start at the top of the game window
    object.style.top = "0px";
    gameWindow.appendChild(object);

    // Add click event listener
    object.addEventListener("click", () => {
      if (isRedBall) {
        // If red ball is clicked, reset score and end the game
        alert("Game Over! You clicked a red ball.");
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        resetGame(); // Reset game
      } else {
        // If orange ball is clicked, increase score
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        object.remove();

        // Check if the player has won
        if (score >= 100) {
          alert("Congratulations! You reached a score of 100 and won the game! Go to supersette.com/reward");
          resetGame(); // Reset game after winning
        }
      }
    });

    // Generate a random falling speed
    const speed = Math.random() * (2 - 1) + 1;

    // Animate the falling object
    let currentTop = 0;

    function fall() {
      currentTop += speed; // Use the random speed
      object.style.top = `${currentTop}px`;

      if (currentTop >= gameWindow.clientHeight - size) {
        // Remove object if it reaches the bottom
        object.remove();
      } else {
        // Continue the animation
        requestAnimationFrame(fall);
      }
    }

    requestAnimationFrame(fall);

    // Schedule the next falling object
    scheduleNextObject();
  }

  // Function to schedule the next object
  function scheduleNextObject() {
    if (gameActive) {
      setTimeout(createFallingObject, 1000); // Spawn every 1 second
    }
  }

  // Function to reset the game
  function resetGame() {
    // Clear all falling objects
    const allObjects = document.querySelectorAll(".falling-object");
    allObjects.forEach((obj) => obj.remove());

    // Restart score
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    scheduleNextObject(); // Resume spawning objects
  }

  // Listen for visibility change events
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Tab is inactive, pause the game
      gameActive = false;
    } else {
      // Tab is active, resume the game
      gameActive = true;
      scheduleNextObject(); // Resume spawning objects
    }
  });

  // Start the game
  scheduleNextObject();
});
