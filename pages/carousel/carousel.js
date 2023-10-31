const carouselContainer = document.querySelector(".carousel-container");
const slidesContainer = document.querySelector(".carousel-slides");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let currentSlide = 1;
const images = [
  "../../assets/image1.png",
  "../../assets/image2.png",
  "../../assets/image3.png",
];

let intervalId;
const slideInterval = 2000;

images.forEach((image) => {
  const slide = document.createElement("div");
  slide.className = "carousel-slide";

  const img = document.createElement("img");
  img.src = image;
  img.alt = "Image";

  slide.appendChild(img);
  slidesContainer.appendChild(slide);
});

const slideLength = images.length;
const slideWidth = 500;
const slideSpeed = 300;

let firstChild = slidesContainer.firstElementChild;
let lastChild = slidesContainer.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slidesContainer.appendChild(clonedFirst);
slidesContainer.prepend(clonedLast);

slidesContainer.style.transition = "0ms";
slidesContainer.style.transform = `translate3d(-${
  slideWidth * currentSlide
}px, 0px, 0px)`;

function updateCarousel() {
  slidesContainer.style.transition = `${slideSpeed}ms`;
  slidesContainer.style.transform = `translateX(-${
    slideWidth * currentSlide
  }px)`;
}

function nextSlide() {
  if (currentSlide < slideLength) {
    currentSlide++;
    updateCarousel();
  }

  if (currentSlide === slideLength) {
    currentSlide = 0;
    setTimeout(function () {
      slidesContainer.style.transition = "0ms";
      slidesContainer.style.transform = "translate3d(0px, 0px, 0px)";
    }, slideSpeed);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }

  if (currentSlide === 0) {
    currentSlide = slideLength;
    setTimeout(function () {
      slidesContainer.style.transition = "0ms";
      slidesContainer.style.transform =
        "translate3d(-" + slideWidth * slideLength + "px, 0px, 0px)";
    }, slideSpeed);
  }
}

prevButton.addEventListener("click", () => {
  prevSlide();
  clearInterval(intervalId);
  startAutoSlide();
});

nextButton.addEventListener("click", () => {
  nextSlide();
  clearInterval(intervalId);
  startAutoSlide();
});

function startAutoSlide() {
  intervalId = setInterval(nextSlide, slideInterval);
}

startAutoSlide();
