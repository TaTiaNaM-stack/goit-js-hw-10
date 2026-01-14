console.log('Timer module loaded');

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";


import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const datePicker = flatpickr("#datetime-picker", options);

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const alertEl = document.querySelector('#alert-message');

let userSelectedDate = null;


datePicker.config.onClose.push(function(selectedDates) {
  const selectedDate = selectedDates[0];

  if (selectedDates[0] > Date.now()) {
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startBtn.disabled = true;

  }
});

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





