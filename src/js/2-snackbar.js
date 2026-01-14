console.log('Snackbar module loaded');

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const btnSubmit = document.querySelector('button[type="submit"]');

const delay = document.querySelector('input[name="delay"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('select[value="rejected"]');

btnSubmit.addEventListener('click', () => {
    const promise = new Promise((resolve, reject) => {
        const delay = Number(delay.value); 
        if (isNaN(delay) || delay < 0) {
            reject('Invalid delay value');
        } else {
            setTimeout(() => {
                resolve
                    if (inputFulfilled.checked) {
                        return (`✅ Fulfilled promise in ${delay}ms`);
                    } else {
                        throw (`❌ Rejected promise in ${delay}ms`);
                    }
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

