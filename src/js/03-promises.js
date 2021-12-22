import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';

export default () => {
  const elements = {
    form: document.querySelector('.promise .form'),
  };

  const promisesByTime = {
    setUpTimeout({ delay, step, amount } = {}) {
      this.delay = parseInt(delay, 10);
      this.step = parseInt(step, 10);
      this.amount = parseInt(amount, 10);
    },

    create(cb) {
      for (let i = 0; i < this.amount; i += 1) {
        const addedTimeByPosition = i * this.step;
        const delay = this.delay + addedTimeByPosition;

        setTimeout(() => {
          cb()
            .then((message) => Notify.success(`${message} promise #${i + 1} was created in ${delay}ms`))
            .catch((message) => Notify.failure(`${message} promise #${i + 1} was rejected in ${delay}ms`));
        }, delay);
      }
    },
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = Object.fromEntries(formData);

    promisesByTime.setUpTimeout(data);
    promisesByTime.create(createPromise);
  };

  elements.form.addEventListener('submit', onFormSubmit);
};

function createPromise() {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve('Yehoo! Success!');
    } else {
      reject('Oops, Error.');
    }
  });
}
