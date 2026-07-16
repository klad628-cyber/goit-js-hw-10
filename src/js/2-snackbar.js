import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Get form element
const form = document.querySelector('.form');

// Helper function to create a promise
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// Form submit handler
form.addEventListener('submit', event => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  // Create and handle promise
  createPromise(delay, state)
    .then(value => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${value}ms`,
      });
    });

  // Reset form
  form.reset();
});
