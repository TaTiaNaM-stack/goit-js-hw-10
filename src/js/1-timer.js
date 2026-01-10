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

const NOTIFICATION_DELAY = 3000;
let timeoutId = null;
const notification = document.querySelector('.js-alert');

showNotification();

function showNotificationClick() {}

function showNotification() {
  notification.classList.add('visible');

  setTimeout(() => {
    notification.classList.remove('visible');
}, NOTIFICATION_DELAY);

console.log('Timer module initialized');
}

function hideNotification() {}