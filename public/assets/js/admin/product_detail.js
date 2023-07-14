const productId = window.location.pathname.split('/').at(-1);

fetch('/assets/data/products.json')
    .then((response) => response.json())
    .then((data) => {
        // 상품 목록 중 찾고자 하는 상품을 id로 필터링하여 선택합니다.
        const product = data.filter((item) => {
            return item.id === productId;
        })[0];

        // HTML 폼 요소를 선택하거나 생성하여, 상품 정보를 채웁니다.
        document.querySelector('.select-category').value = product.category;
        document.querySelector('.select-taste').value = product.taste;
        document.querySelector('.select-origin').value = product.origin;
        document.querySelector('.input-name').value = product.name;
        document.querySelector('.input-price').value = product.price;
        //document.querySelector('.input-amount').value = product.amount;
        //document.querySelector('.input-main-img').value = product.mainImg;
       // document.querySelector('.input-sub-img').value = product.subImg;
        document.querySelector('.input-description').value = product.description;
        //document.querySelector('.select-show').value = product.show;
        checkCategory(product.category);
    })
    .catch((error) => console.log(error));

function handleChangeCategory() {
    const select = document.querySelector('.select-category');

    checkCategory(select.value);
}

function checkCategory(target) {
    if (target === '커피') {
        document.querySelector('.select-taste').disabled = false;
        document.querySelector('.select-origin').disabled = false;
    } else {
        document.querySelector('.select-taste').disabled = true;
        document.querySelector('.select-origin').disabled = true;
    }
}
