const hourInput = document.querySelector(".hour-input");
const minInput = document.querySelector(".min-input");
const secInput = document.querySelector(".sec-input");

const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const resetButton = document.querySelector(".reset-button");

let timer;

const handleStartTimer = () => {
  const hourValue = Number(hourInput.value);
  const minValue = Number(minInput.value);
  const secValue = Number(secInput.value);

  if (hourValue === 0 && minValue === 0 && secValue === 0) {
    alert("시간을 입력하세요");
    hourInput.focus();
    return;
  }

  let totalSecond = hourValue * 3600 + minValue * 60 + secValue;

  timer = setInterval(() => {
    if (totalSecond === 0) {
      clearInterval(timer);
      alert("타이머 종료");
      return;
    } else {
      totalSecond--;

      const hour = Math.floor(totalSecond / 3600);
      const min = Math.floor((totalSecond % 3600) / 60);
      const sec = totalSecond % 60;

      hourInput.value = String(hour).padStart(2, "0");
      minInput.value = String(min).padStart(2, "0");
      secInput.value = String(sec).padStart(2, "0");
    }
  }, 1000);
};

const handleStopTimer = () => {
  clearInterval(timer);
};

const handleResetTimer = () => {
  clearInterval(timer);
  hourInput.value = "00";
  minInput.value = "00";
  secInput.value = "00";
};

startButton.addEventListener("click", handleStartTimer);
stopButton.addEventListener("click", handleStopTimer);
resetButton.addEventListener("click", handleResetTimer);

const handleClearInput = (e) => {
  e.target.value = "";
};

hourInput.addEventListener("focus", handleClearInput);
minInput.addEventListener("focus", handleClearInput);
secInput.addEventListener("focus", handleClearInput);
