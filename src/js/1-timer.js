console.log('Timer module loaded');

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

// 
const datePicker = flatpickr("#datetime-picker", options);

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const alertEl = document.querySelector('.js-alert');

datePicker.config.onClose.push(function(selectedDates) {
  const selectedDate = selectedDates[0];
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    alertEl.textContent = 'Please choose a date in the future';
    startBtn.disabled = true;
  } else {
    alertEl.textContent = '';
    startBtn.disabled = false;
  }
});

let userSelectedDate = null;

datePicker.config.onClose.push(function(selectedDates) {
  userSelectedDate = selectedDates[0];
});

startBtn.addEventListener('click', function() {
  if (!userSelectedDate) {
    return;
  }   
  const intervalId = setInterval(function() {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay(0, 0, 0, 0);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}
