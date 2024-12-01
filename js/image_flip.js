// Select the flip container
const flipContainer = document.getElementById('image-flip-container');

// Add click event listener
flipContainer.addEventListener('click', function () {
  this.classList.toggle('flipped');
});
