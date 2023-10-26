const yearMonth = document.querySelector(".year-month");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const calendarTable = document.querySelector(".calendar-table");
const memoModal = document.querySelector(".modal-container");
const memoText = document.querySelector(".memo-text");
const registerButton = document.querySelector(".register-button");
const cancelButton = document.querySelector(".cancel-button");

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let selectedDate = null;

function showCalendar(month, year) {
  const prevHeader = document.querySelector(".calendar-table thead tr");

  while (prevHeader.firstChild) {
    prevHeader.removeChild(prevHeader.firstChild);
  }

  const header = document.querySelector(".calendar-table thead tr");

  for (let day = 0; day < 7; day++) {
    const dayName = document.createElement("th");
    dayName.textContent = getDayName(day);
    header.appendChild(dayName);
  }

  const table = document.querySelector(".calendar-table tbody");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  yearMonth.textContent = `${year}년 ${getMonthName(month)}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  let dayCounter = 1;

  for (let row = 0; dayCounter <= totalDays; row++) {
    const newRow = document.createElement("tr");

    for (let col = 0; col < 7; col++) {
      const cell = document.createElement("td");

      if (row === 0 && col < firstDay.getDay()) {
        cell.textContent = "";
      } else if (dayCounter <= totalDays) {
        cell.textContent = dayCounter;
        dayCounter++;

        const date = new Date(year, month, parseInt(cell.textContent, 10));

        if (getMemo(date)) {
          const memoIcon = document.createElement("span");
          memoIcon.className = "memo-icon";
          cell.appendChild(memoIcon);
        }
      }

      newRow.appendChild(cell);
    }

    table.appendChild(newRow);
  }

  const cells = document.querySelectorAll(".calendar-table tbody td");

  cells.forEach((cell) => {
    cell.addEventListener("click", handleDateClick);
  });
}

function getDayName(day) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[day];
}

function getMonthName(month) {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return months[month];
}

function showPrevMonth() {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  showCalendar(currentMonth, currentYear);
}

function showNextMonth() {
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  showCalendar(currentMonth, currentYear);
}

function handleDateClick(event) {
  const clickedDate = event.target.textContent;
  if (clickedDate !== "") {
    selectedDate = new Date(currentYear, currentMonth, clickedDate);
    openMemoModal(selectedDate);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

function saveMemo(date, memo) {
  const memoKey = formatDate(date);
  localStorage.setItem(memoKey, memo);
}

function getMemo(date) {
  const memoKey = formatDate(date);
  return localStorage.getItem(memoKey) || "";
}

function HandleRegisterClick() {
  const memo = memoText.value;
  saveMemo(selectedDate, memo);
  closeMemoModal();
  showCalendar(currentMonth, currentYear);
}

registerButton.addEventListener("click", HandleRegisterClick);

function openMemoModal(date) {
  registerButton.removeEventListener("click", HandleRegisterClick);

  memoModal.style.display = "block";
  memoText.value = getMemo(date);

  registerButton.addEventListener("click", HandleRegisterClick);

  cancelButton.addEventListener("click", function () {
    closeMemoModal();
  });
}

function closeMemoModal() {
  memoModal.style.display = "none";
}

showCalendar(currentMonth, currentYear);

prevButton.addEventListener("click", showPrevMonth);
nextButton.addEventListener("click", showNextMonth);
