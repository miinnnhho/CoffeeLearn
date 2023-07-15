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
const inputSalePercent = document.querySelector('.input-sale-percent');
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
    const salePercent = inputSalePercent.value;
    const amount = inputAmounut.value;
    const mainImg = inputMainImg.files[0];
    console.log(inputMainImg.files[0]);
    const subImg = inputSubImg.files[0];
    const description = inputDescription.value;
    const show = selectShow.value;

    const product = JSON.stringify({
        category,
        taste,
        origin,
        name,
        price,
        salePercent,
        amount,
        description,
        show,
    });

    const token = localStorage.getItem('token');
    console.log(token);
    const apiUrl = 'http://kdt-sw-5-team07.elicecoding.com:3000/products/admin';


    const payload = new FormData();
    payload.append('data', product);
    payload.append('main', mainImg);
    payload.append('sub', subImg);

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: payload,
    });

    if (!res.ok) {
        alert('에러가 발생했습니다.');
        return;
    }

    form.reset();

    const result = await res.json();
    console.log(result);
});

