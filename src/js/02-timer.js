import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Timer from './Timer.js';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.2.min.css';

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
    Notify.failure('Please choose a date in the future');
  }
}

function onSuccess() {
  enableInput(elements.timerInput);
  Notify.success('Bemts, Time is up!');
  new Audio('media/sounds/success.mp3').play();
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

function disableInput(input) {
  input.setAttribute('disabled', 'true');
  input.style.pointerEvents = 'none';
}

function enableInput(input) {
  input.removeAttribute('disabled');
  input.style.pointerEvents = 'auto';
}
