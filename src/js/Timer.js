export default class Timer {
  #timerID = null;
  #restOfTime = null;
  #interval = 1000;

  constructor(timerElements) {
    this.elements = timerElements;
  }

  setUpTimer(toDate, onSuccess) {
    clearInterval(this.#timerID);

    this.#timerID = setInterval(() => {
      this.#restOfTime = toDate - Date.now();
      this.#restOfTime = (this.#restOfTime > 0) ? this.#restOfTime : 0;

      if (this.#restOfTime <= 0) {
        clearInterval(this.#timerID);
        onSuccess();
      }

      this.renderTimer();
    }, this.#interval);
  }

  renderTimer() {
    const timerData = this.convertMs(this.#restOfTime);

    Object.keys(this.elements).forEach((key) => {
      this.elements[key].textContent = this.addLeadingZero(timerData[key]);
    });
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return {
      days, hours, minutes, seconds,
    };
  }

  addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
};
