'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delay = document.querySelector('input[type="number"]'),
  form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  const radioValue = form.elements.state.value;
  console.log(radioValue);

  const value = delay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioValue === 'fulfilled') {
        resolve(value);
      } else {
        reject(value);
      }
    }, value);
  });

  promise
    .then(value =>
      iziToast.show({
        title: 'OK',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: `✅ Fulfilled promise in ${value}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#59a10d',
        position: 'topRight',
        theme: 'dark',
      })
    )
    .catch(error =>
      iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: `❌ Rejected promise in ${value}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
        theme: 'dark',
      })
    );

  form.reset();
}
