// URL에서 상품 ID 가져오기
const productId = getProductIdFromURL();

// 상품 정보 가져오기
fetchProductDetails(productId)
    .then((product) => {
        // 상품 정보를 사용하여 페이지 업데이트
        updatePageWithProductDetails(product);
    })
    .catch((error) => {
        console.error(error);
        alert('상품 정보를 가져오는 중에 오류가 발생했습니다.');
    });

// URL에서 상품 ID를 추출하는 함수
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// 상품 상세 정보를 가져오는 함수
async function fetchProductDetails(productId) {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) {
        throw new Error('상품 정보를 가져오는 중에 오류가 발생했습니다.');
    }
    const product = await res.json();
    return product;
}

// 페이지를 상품 상세 정보로 업데이트하는 함수
function updatePageWithProductDetails(product) {
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

    selectCategory.value = product.category;
    selectTaste.value = product.taste;
    selectOrigin.value = product.origin;
    inputName.value = product.name;
    inputPrice.value = product.price;
    inputAmounut.value = product.price;
    inputMainImg.value = product.mainImg;
    inputSubImg.value = product.subImg;
    inputDescription.value = product.description;
    selectShow.value = product.show;
}

