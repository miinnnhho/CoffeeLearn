//카테고리별 선택사항 비활성화 처리
const category = document.querySelector('.select-category');

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

// 입력된 내용 서버로 전송
const selectCategory = document.querySelector('.select-category');
const selectTaste = document.querySelector('.select-taste');
const selectOrigin = document.querySelector('.select-origin');
const inputName = document.querySelector('.input-name');
const inputPrice = document.querySelector('.input-price');
const inputAmounut = document.querySelector('.input-amount');
const inputMainImg = document.querySelector('.input-main-img');
const inputSubImg = document.querySelector('.input-sub-img');
const inputDescription = document.querySelector('.input-description');
const selectShow = document.querySelector('.select-show');
const form = document.querySelector('#addItemForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = selectCategory.value;
    const taste = selectTaste.value;
    const origin = selectOrigin.value;
    const name = inputName.value;
    const price = inputPrice.value;
    const amount = inputAmounut.value;
    const mainImg = inputMainImg.value;
    const subImg = inputSubImg.value;
    const description = inputDescription.value;
    const show = selectShow.value;

    const product = {
        category,
        taste,
        origin,
        name,
        price,
        amount,
        mainImg,
        subImg,
        description,
        show,
    };

    const dataJson = JSON.stringify(product);

    const apiUrl = 'http://kdt-sw-5-team07.elicecoding.com:3000/products/admin';

    const res = await fetch(apiUrl, {
        method: 'POST',
        body: dataJson,
    });

    if (!res.ok) {
        alert('에러가 발생했습니다.');
        return;
    }

    const result = await res.json();
    console.log(result);
});
