import flatpickr from 'flatpickr';
import Timer from './Timer.js';

import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  timerInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  timer: {
    days: document.querySelector('.timer [data-days]'),
    hours: document.querySelector('.timer [data-hours]'),
    minutes: document.querySelector('.timer [data-minutes]'),
    seconds: document.querySelector('.timer [data-seconds]'),
  },
};

// TODO notify
// TODO styles

export default () => {
  if (!elements.timerInput) {
    return;
  }

  const picker = init(elements.timerInput);
  const timer = new Timer(elements.timer);

  const onStartButtonClick = () => {
    disableButton(elements.startButton);
    disableInput(elements.timerInput);
    timer.setUpTimer(picker.selectedDates[0], onSuccess);
  };

  elements.startButton.addEventListener('click', onStartButtonClick);
  disableButton(elements.startButton);
};

function init(element) {
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
  };
  return flatpickr(element, options);
}

function onClose(selectedDates) {
  if (selectedDates[0] > Date.now()) {
    enableButton(elements.startButton);
  } else {
    enableInput(elements.timerInput);
    alert('Please choose a date in the future');
  }
}

function onSuccess() {
  enableInput(elements.timerInput);
  alert('Congrats');
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

function disableInput(input) {
  input.style.pointerEvents = 'none';
}

function enableInput(input) {
  input.style.pointerEvents = 'auto';
}
