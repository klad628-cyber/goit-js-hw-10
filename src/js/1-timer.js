'use strict';

import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker'),
  btn = document.querySelector('button[data-start]'),
  days = document.querySelector('span[data-days]'),
  hours = document.querySelector('span[data-hours]'),
  minutes = document.querySelector('span[data-minutes]'),
  seconds = document.querySelector('span[data-seconds]'),
  values = document.querySelectorAll('.value');

btn.disabled = true;
let userSelectedDate = null;
btn.addEventListener('click', setTime);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();

    if (selectedDate <= Date.now()) {
      btn.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        messageSize: '16px',
        position: 'topRight',
        transitionIn: 'ease',
        transitionOut: 'ease',
        backgroundColor: '#EF4040',
        close: true,
        messageColor: '#fff',
      });
      return;
    }

    btn.disabled = false;
    userSelectedDate = selectedDate;
  },
};

flatpickr(input, options);

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

function setTime() {
  btn.disabled = true;
  input.disabled = true;
  const timerId = setInterval(() => {
    let delta = userSelectedDate - Date.now();

    if (delta <= 0) {
      clearInterval(timerId);
      input.disabled = false;
      values.forEach(value => {
        value.textContent = '00';
      });
      return;
    }
    const time = convertMs(delta);
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
