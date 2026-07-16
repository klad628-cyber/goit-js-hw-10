import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Get DOM elements
const datetimePickerInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

// State
let userSelectedDate = null;
let timerInterval = null;

// Helper function to add leading zeros
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Convert milliseconds to time components
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Update timer display
function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

// Initialize flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Check if date is in the past
    if (selectedDate.getTime() < new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }

    // Valid future date
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(datetimePickerInput, options);

// Start button click handler
startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  // Disable input and button
  datetimePickerInput.disabled = true;
  startBtn.disabled = true;

  // Update display immediately
  const initialMs = userSelectedDate.getTime() - new Date().getTime();
  updateTimerDisplay(initialMs);

  // Start countdown
  timerInterval = setInterval(() => {
    const remainingMs = userSelectedDate.getTime() - new Date().getTime();

    if (remainingMs <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(0);
      datetimePickerInput.disabled = false;
      return;
    }

    updateTimerDisplay(remainingMs);
  }, 1000);
});
