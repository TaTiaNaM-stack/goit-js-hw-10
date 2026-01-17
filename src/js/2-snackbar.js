import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnSubmit = document.querySelector('button[type="submit"]');

const delay = document.querySelector('input[name="delay"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('select[value="rejected"]');

const promise = new Promise((resolve, reject) => {
        delay = Number(delay.value); 
        if (isNaN(delay) || delay <= 0) {
            reject('Invalid delay value');
        } else {
            resolve(`Promise fulfilled in ${delay}ms`);
        };
}    
btnSubmit.addEventListener('submit', () => {
    if (promise) {
        setTimeout(() => {
                resolve
                    inputFulfilled.checked = `✅ Fulfilled promise in ${delay}ms`;
                reject
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


