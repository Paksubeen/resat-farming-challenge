const carouselContainer = document.querySelector(".carousel-container");
const slidesContainer = document.querySelector(".carousel-slides");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const carouselDots = document.querySelector(".carousel-dots");

let currentSlide = 1;
const images = [
  "../../assets/image1.png",
  "../../assets/image2.png",
  "../../assets/image3.png",
];

let intervalId;
const slideInterval = 2000;
const slideLength = images.length;
const slideWidth = 500;
const slideSpeed = 300;

images.forEach((image) => {
  const slide = document.createElement("div");
  slide.className = "carousel-slide";

  const img = document.createElement("img");
  img.src = image;
  img.alt = "Image";

  slide.appendChild(img);
  slidesContainer.appendChild(slide);
});

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

for (let i = 0; i < slideLength; i++) {
  const dot = document.createElement("span");
  dot.className = "carousel-dot";
  dot.addEventListener("click", () => {
    goToSlide(i);
    clearInterval(intervalId);
    startAutoSlide();
  });
  carouselDots.appendChild(dot);
}

function updateDots() {
  const dots = document.querySelectorAll(".carousel-dot");
  dots.forEach((dot, idx) => {
    if (idx === currentSlide - 1) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updateCarousel() {
  slidesContainer.style.transition = `${slideSpeed}ms`;
  slidesContainer.style.transform = `translateX(-${
    slideWidth * currentSlide
  }px)`;
  updateDots();
}

function nextSlide() {
  if (currentSlide < slideLength + 1) {
    currentSlide++;
    updateCarousel();
  }

  if (currentSlide === slideLength + 1) {
    currentSlide = 1;
    setTimeout(function () {
      slidesContainer.style.transition = "0ms";
      slidesContainer.style.transform = `translate3d(-${slideWidth}px, 0px, 0px)`;
    }, slideSpeed);
    updateDots();
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
    updateDots();
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

function goToSlide(slideIndex) {
  currentSlide = slideIndex + 1;
  updateCarousel();
  updateDots();
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    nextSlide();
    updateDots();
  }, slideInterval);
}

goToSlide(0);
startAutoSlide();
