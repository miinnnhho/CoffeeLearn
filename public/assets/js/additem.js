const category = document.querySelector('.select-categogy');
console.log(category.value)

// Select tag에 변화가 있을 때
category.addEventListener('change', () => {
    const tasteField = document.querySelector('.select-taste');
    const originField = document.querySelector('.select-origin');

    if (category.value === '커피') {
        tasteField.removeAttribute('disabled');
        originField.removeAttribute('disabled');
    } else {
        tasteField.setAttribute('disabled', true);
        originField.setAttribute('disabled', true);
    }
});

const selectCategogy = document.querySelector('.select-categogy');
const selectTaste = document.querySelector('.select-taste');
const selectOrigin = document.querySelector('.select-origin');
const inputName = document.querySelector('.input-name');
const inputPrice = document.querySelector('.input-price');
const inputAmounut = document.querySelector('.input-amount');
const inputMainImg = document.querySelector('.input-main-img');
const inputSubImg = document.querySelector('.input-sub-img');
const inputDescription = document.querySelector('.input-description');
const selectShow = document.querySelector('.select-show');
const submitButton = document.querySelector('submit-button');

submitButton.addEventListener('submit', async(e)=>{
    const category = selectCategogy.value;
    const taste = selectTaste.value;
    const origin = selectOrigin.value;
    const name = inputName.value;
    const price =inputPrice.value;
    const amount = inputAmounut.value;
    const img1 = inputMainImg.value;
    const img2 = inputSubImg.value;
    const description= inputDescription.value;
    const show = selectShow.value;

    const product = {
        category,
        taste,
        origin,
        name,
        price,
        amount,
        img1,
        img2,
        description,
        show
    }

    const dataJson = JSON.stringify(product);

    const apiUrl =  ``

    const res = await fetch(apiUrl, {
        method: 'POST',
        body: dataJson,
      });
})

