import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.querySelector('form');
formRef.addEventListener('submit', (event) => {
    event.preventDefault();

    const promise = createPromise(formRef.elements.delay.value);
});

function createPromise(delay) {
    
    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formRef.elements.state.value === 'fulfilled') {
        resolve(delay)
      }else if (formRef.elements.state.value === 'rejected') {
        reject(delay)
      }
    }, delay);
  })
  .then((delay) => {
    iziToast.success({  
      title: 'Success',
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
    });
  })
  .catch((delay) => {
    iziToast.error({
      title: 'Error',
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
    })
  });   
  return promise;
};




