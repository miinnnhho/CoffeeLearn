// 상품 데이터 호출
async function getProducts() {
    const response = await fetch('/assets/products.json');
    const data = await response.json();
    return data;
}

// 커피 카테고리인지 확인
function isCoffeeCategory(product) {
    return product.category === '커피';
}

// 공통 함수: 상품 이미지 경로 생성
function getProductImageSrc(productId) {
    return `/assets/img/items/item_main_${productId}.jpg`;
}

// 공통 함수: 상품 가격 표시 HTML 생성
function generatePriceHTML(price, category) {
    return category !== '커피' ? `<p class="price">${price.toLocaleString()}원</p>` : '';
}

// 공통 함수: 상품 목록 표시
function displayProductList(products, itemBoxId, condition) {
    const itemBox = document.getElementById(itemBoxId);
    itemBox.innerHTML = '';

    const filteredProducts = products.filter(condition);

    // 상품은 최대 4개까지만 불러오기
    filteredProducts.slice(0, 4).forEach((product) => {
        createProductElement(product, itemBoxId);
    });
}

// 공통 함수: 상품 할인 가격 계산
function calculateSalePrice(product, amountCount) {
    const salePercent = product.salePercent;
    const price = product.price;
    const salePrice = price - (price * salePercent) / 100;
    return salePrice * amountCount;
}

// 공통 함수: 상품 HTML 요소 생성
function createProductElement(product, itemBoxId) {
    const mainImgSrc = getProductImageSrc(product.id);
    const amountCount = 1;
    const salePrice = calculateSalePrice(product, amountCount);
    const originPriceHTML = generatePriceHTML(product.price, product.category);
    const salePercentHTML = generatePriceHTML(product.salePercent, product.category);

    const itemEl = document.createElement('div');
    itemEl.classList.add('item-list');

    const itemLink = document.createElement('a');
    itemLink.href = `items_info?id=${product.id}`;

    itemLink.innerHTML = `
    <div class="img-box">
      <img class="main-img" src="${mainImgSrc}" />
    </div>
    <div class="detail-box">
      <strong class="description">${product.description}</strong>
      <h3 class="name">${product.name}</h3>
    </div>
  `;

    const priceBox = document.createElement('div');
    priceBox.classList.add('price-box');
    priceBox.innerHTML = `
    <div class="details">
      <p class="sale-price">${salePrice.toLocaleString()}원</p>
      <button class="cart-btn">
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
      ${product.salePercent === 0 ? originPriceHTML : salePercentHTML}
    </div>
  `;

    itemEl.appendChild(itemLink);
    itemEl.appendChild(priceBox);
    document.getElementById(itemBoxId).appendChild(itemEl);

    // cart-btn 클릭 이벤트 처리
    const cartBtn = itemEl.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        const productName = itemEl.querySelector('.name').textContent;
        const salePrice = parseFloat(itemEl.querySelector('.sale-price').textContent.replace(/,/g, ''));
        showCartModal(productName, salePrice);
        addModalOnClass();
    });
}

// 장바구니 모달창 안의 내용 표시
function showCartModal(productName, salePrice) {
    const cartItemName = document.querySelector('.cart-item-name');
    const cartTotalPrice = document.querySelector('.total-price');
    const amountCount = document.querySelector('.amount-count');
    const downBtn = document.querySelector('.down-btn');
    const upBtn = document.querySelector('.up-btn');

    cartItemName.innerHTML = productName;

    let quantity = 1; // 상품 수량 초기값
    let totalPrice = salePrice; // 총 가격 초기값

    amountCount.innerHTML = quantity;
    cartTotalPrice.innerHTML = totalPrice.toLocaleString() + '원';

    // 수량 증가 버튼 클릭 이벤트 처리
    upBtn.addEventListener('click', () => {
        quantity++;
        amountCount.innerHTML = quantity;
        totalPrice = salePrice * quantity;
        cartTotalPrice.innerHTML = totalPrice.toLocaleString() + '원';
    });

    // 수량 감소 버튼 클릭 이벤트 처리
    downBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            amountCount.innerHTML = quantity;
            totalPrice = salePrice * quantity;
            cartTotalPrice.innerHTML = totalPrice.toLocaleString() + '원';
        }
    });
}
// 모달창 열기
function addModalOnClass() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('on');
}

// 모달창 닫기
function removeModalOnClass() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('on');
}

// 장바구니 담기완료 모달 열고 닫기
function toggleCartContent(isVisible) {
    const cartContentWrap = document.querySelector('.cart-content-wrap');
    const cartCompleteContent = document.querySelector('.cart-complete-content');

    if (isVisible) {
        cartContentWrap.classList.add('on');
        cartCompleteContent.classList.add('on');
    } else {
        cartContentWrap.classList.remove('on');
        cartCompleteContent.classList.remove('on');
        removeModalOnClass();
    }
    initializeOptions();
}

// 공통 함수 : 장바구니 모달의 내용 초기화
function initializeOptions() {
    const optionSelect = document.querySelector('.option-select');
    const amountCount = document.querySelector('.amount-count');
    const selectMenu = optionSelect.querySelector('.select-menu');

    selectMenu.selectedIndex = 0; // 초기 선택값을 첫 번째 옵션으로 설정
    amountCount.innerHTML = 1; // 초기 수량을 1로 설정
}

// 저장할 정보를 localStorage에 저장하는 함수
function saveToLocalStorage(productName, amount, totalPrice, option) {
    const cartItem = {
        productName: productName,
        amount: amount,
        totalPrice: totalPrice,
        option: option,
        salePrice: totalPrice / amount,
    };

    // 이전에 저장된 장바구니 정보가 있다면 가져온 후, 새로운 상품 정보를 추가합니다.
    let cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        cartItems.push(cartItem);
    } else {
        cartItems = [cartItem];
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// 확인 버튼 클릭 이벤트 처리
function handleConfirmBtnClick(confirmBtn) {
    const selectedOption = document.querySelector('.option-select select').value;

    if (confirmBtn.id === 'btnCartConfirm') {
        if (selectedOption === '') {
            alert('☕ 분쇄 옵션을 선택하세요.');
        } else {
            const productName = document.querySelector('.cart-item-name').innerHTML;
            const quantity = parseInt(document.querySelector('.amount-count').innerHTML);
            const totalPrice = parseInt(document.querySelector('.total-price').textContent.replace(/,/g, ''));
            const option = document.querySelector('.option-select select').value;

            saveToLocalStorage(productName, quantity, totalPrice, option);
            toggleCartContent(true);
        }
    } else if (confirmBtn.id === 'btnGoCart') {
        window.location.href = '/cart';
    }
}

// 취소 버튼 클릭 이벤트 처리
function handleCancelBtnClick(btn) {
    if (btn.closest('.cart-modal-buttons.complete')) {
        toggleCartContent(false);
    } else {
        removeModalOnClass();
    }
}

// 배경 클릭 이벤트 처리
function handleCartBackgroundClick() {
    toggleCartContent(false);
}

// 탭을 클릭했을 때 맛 분류에 따라 상품 표시
function displayProductsByTaste(products, taste, itemBoxId) {
    const filteredProducts = products.filter((product) => {
        if (taste === '블렌드') {
            return isCoffeeCategory(product) && product.origin === '블렌드' && product.taste !== '달콤 쌉싸름';
        } else {
            return isCoffeeCategory(product) && product.taste === taste;
        }
    });

    displayProductList(filteredProducts, itemBoxId, isCoffeeCategory);
}

// 탭 상태 업데이트(css 작업을 위해 'on'클래스 추가)
function updateTabState(label, input) {
    if (input.checked) {
        label.classList.add('on');
    } else {
        label.classList.remove('on');
    }
}

window.onload = async () => {
    try {
        const products = await getProducts();
        // 각 itemBox에
        displayProductList(products, 'pickItemBox', isCoffeeCategory);

        // 탭 클릭 이벤트 처리
        const tabLabels = document.querySelectorAll('.tab-label');
        const defaultTab = document.querySelector('.tab-label.on input');
        const defaultTaste = defaultTab.getAttribute('data-taste');
        let isTabClicked = false;

        tabLabels.forEach((label) => {
            const input = label.querySelector('input');
            const taste = input.getAttribute('data-taste');

            // 상품 표시 조건 변경
            label.addEventListener('click', (event) => {
                const itemBoxId = taste === '블렌드' ? 'blendItemBox' : 'pickItemBox';

                // 해당 맛에 해당하는 상품을 해당 박스에 표시
                displayProductsByTaste(products, taste, itemBoxId);

                event.preventDefault();

                // 모든 탭에서 "on" 클래스 제거
                tabLabels.forEach((tabLabel) => {
                    tabLabel.classList.remove('on');
                });

                // 클릭한 탭에 "on" 클래스 추가
                label.classList.add('on');

                isTabClicked = true; // 탭이 클릭되었음
            });

            // input의 변경 이벤트 처리
            input.addEventListener('change', () => {
                updateTabState(label, input);
            });

            // 초기 탭 상태 업데이트
            updateTabState(label, input);
        });

        // 아무 탭도 클릭되지 않은 경우, 기본 탭에 해당하는 맛의 상품을 표시
        if (!isTabClicked) {
            const itemBoxId = defaultTaste === '블렌드' ? 'blendItemBox' : 'pickItemBox';
            displayProductsByTaste(products, defaultTaste, itemBoxId);
        }

        // 확인 버튼 클릭 이벤트 처리
        const confirmBtns = document.querySelectorAll('.btn-confirm');
        confirmBtns.forEach((confirmBtn) => {
            confirmBtn.addEventListener('click', () => {
                handleConfirmBtnClick(confirmBtn);
            });
        });

        // 취소 버튼 클릭 이벤트 처리
        const cancelBtns = document.querySelectorAll('.btn-cancel');
        cancelBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                handleCancelBtnClick(btn);
            });
        });

        // 배경 클릭 이벤트 처리
        const cartBackground = document.getElementById('cartBackground');
        cartBackground.addEventListener('click', () => {
            handleCartBackgroundClick();
        });
    } catch (error) {
        console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
    }
};
