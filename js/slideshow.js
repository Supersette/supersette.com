let slideIndex = 0;

function showSlides() {
  let slides = document.querySelectorAll('.slides');
  slides.forEach(slide => (slide.style.display = 'none'));
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

function plusSlides(n) {
  slideIndex += n - 1; // Adjust index based on button click
  showSlides();
}

document.addEventListener('DOMContentLoaded', showSlides);
