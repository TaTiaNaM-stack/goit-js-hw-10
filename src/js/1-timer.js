console.log('Timer module loaded');

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const alertEl = document.querySelector('#alert-message');

let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    } else {
      iziToast.show({
        onClosed(){},
        message: 'Please choose a date in the future',
        position: 'topRight',
        color: 'red',
        timeout: 5000,
      });
      startBtn.disabled = true;
    }
  },
};
const datePicker = flatpickr("#datetime-picker", options);
let intervalId = null;

startBtn.addEventListener('click', () => {
       if (intervalId) {
    clearInterval(intervalId);
  }
  if (!userSelectedDate) {
    return;

  }   
  intervalId = setInterval(function() {
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

  startBtn.disabled = true;
  datePicker.input.disabled = true;

});

  datePicker.input.disabled = false;

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

export { };





