import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const btnSubmit = document.querySelector('button[type="submit"]');

const delay = document.querySelector('input[name="delay"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('select[value="rejected"]');

btnSubmit.addEventListener('click', () => {
    const promise = new Promise((resolve, reject) => {
        delay = Number(delay.value); 
        if (isNaN(delay) || delay < 0) {
            reject('Invalid delay value');
        } else {
            setTimeout(() => {
                resolve
                    inputFulfilled.checked = `✅ Fulfilled promise in ${delay}ms`;
                    inputRejected.checked = `❌ Rejected promise in ${delay}ms`;
            }, delay);
        }
    });
    promise
        .then((message) => {
            iziToast.success({  
                title: 'Success',
                message: message,
                position: 'topRight',
            });
        })
        .catch((error) => {
            iziToast.error({
                title: 'Error',
                message: error,
                position: 'topRight',
            });
        }); 
});

