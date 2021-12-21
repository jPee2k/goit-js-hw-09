export default () => {
  const elements = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
  };

  if (!elements.buttonStart || !elements.buttonStop) {
    return;
  }

  const colorSwitcher = {
    isStarted: false,
    intervalID: null,
    interval: 1000,

    getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },

    switchButtons (firstButton, secondButton) {
      if (this.isStarted) {
        firstButton.disabled = true;
        secondButton.disabled = false;
      } else {
        firstButton.disabled = false;
        secondButton.disabled = true;
      }
    },
  };

  const onStartClickHandler = () => {
    colorSwitcher.isStarted = true;
    colorSwitcher.switchButtons(elements.buttonStart, elements.buttonStop);
    colorSwitcher.intervalID = setInterval(() => {
      document.body.style.backgroundColor = colorSwitcher.getRandomHexColor();
      document.body.style.transition = `background-color ${colorSwitcher.interval / 2}ms ease-in-out`;
    }, colorSwitcher.interval);
  };

  const onStopClickHandler = () => {
    colorSwitcher.isStarted = false;
    colorSwitcher.switchButtons(elements.buttonStart, elements.buttonStop);
    clearInterval(colorSwitcher.intervalID);
  };

  elements.buttonStart.addEventListener('click', onStartClickHandler);
  elements.buttonStop.addEventListener('click', onStopClickHandler);

  colorSwitcher.switchButtons(elements.buttonStart, elements.buttonStop);
};
