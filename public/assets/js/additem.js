//카테고리별 선택사항 비활성화 처리
const category = document.querySelector('.select-categogy');
console.log(category.value);

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

async function addProduct(e) {
    e.preventDefault();

    const category = selectCategogy.value;
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
        Category:category,
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

    const apiUrl = 'http://localhost:3000/admin/product/add';

    const res = await fetch(apiUrl, {
        method: 'POST',
        body: dataJson,
    });

    const result = await res.json();
    console.log(result);
}

submitButton.addEventListener('submit', addProduct);
