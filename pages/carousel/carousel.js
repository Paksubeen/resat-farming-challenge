const carouselContainer = document.querySelector(".carousel-container");
const slidesContainer = document.querySelector(".carousel-slides");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let currentSlide = 0;
const images = [
  "../../assets/image1.png",
  "../../assets/image2.png",
  "../../assets/image3.png",
];

images.forEach((image) => {
  const slide = document.createElement("div");
  slide.className = "carousel-slide";

  const img = document.createElement("img");
  img.src = image;
  img.alt = "Image";

  slide.appendChild(img);
  slidesContainer.appendChild(slide);
});

function updateCarousel() {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevButton.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + images.length) % images.length;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % images.length;
  updateCarousel();
});

updateCarousel();
