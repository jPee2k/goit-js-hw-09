import runColorSwitcherApp from './01-color-switcher.js';
import runTimerApp from './02-timer.js';
import runPromisesApp from './03-promises.js';

import '../scss/main.scss';

document.addEventListener('DOMContentLoaded',() => {
  runColorSwitcherApp();
  runTimerApp();
  runPromisesApp();
});
