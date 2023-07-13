// 상품 데이터 호출
async function getProducts() {
  const response = await fetch('/assets/products.json');
  const data = await response.json();
  return data;
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

// 공통 함수: 상품 이미지 경로 생성
function getProductImageSrc(productId) {
  return `/assets/img/items/item_main_${productId}.jpg`;
}

// 공통 함수: 상품 가격 표시 HTML 생성
function generatePriceHTML(price, category) {
  return category !== '커피' ? `<p class="price">${price.toLocaleString()}원</p>` : '';
}

// 공통 함수: 상품 할인 가격 계산
function calculateSalePrice(product, amountCount) {
  const salePercent = product.salePercent;
  const price = product.price;
  const salePrice = price - (price * salePercent) / 100;
  return salePrice * amountCount; // 변경: salePrice와 amountCount를 곱한 값을 반환
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
    showCartModal(product.name, salePrice);
  });
}

// 장바구니 모달창 안의 내용 표시
function showCartModal(productName, salePrice) {
  const cartModal = document.getElementById('cartModal');
  const cartItemName = document.querySelector('.cart-item-name');
  const cartTotalPrice = document.querySelector('.total-price');

  // cartModal에 class "on" 추가
  cartModal.classList.add('on');

  // 클릭한 상품의 이름을 .cart-item-name에 표시
  cartItemName.innerHTML = productName;

  // 상품 가격과 수량을 곱하여 합계를 계산하여 표시
  updateTotalPrice();

  // 함수: 합계 가격 업데이트
  function updateTotalPrice() {
    const amountCount = parseInt(document.querySelector('.amount-count').textContent);
    const totalPrice = salePrice * amountCount;
    cartTotalPrice.innerHTML = totalPrice.toLocaleString();
  }
}

// 공통 함수 : 장바구니 모달의 내용 초기화
function initializeOptions() {
  const optionSelect = document.querySelector('.option-select');
  const amountCount = document.querySelector('.amount-count');
  const selectMenu = optionSelect.querySelector('.select-menu');

  selectMenu.selectedIndex = 0; // 초기 선택값을 첫 번째 옵션으로 설정
  amountCount.innerHTML = 1; // 초기 수량을 1로 설정
}

// 장바구니 모달창 안의 내용 표시
function showCartModal(productName, salePrice) {
  const cartModal = document.getElementById('cartModal');
  const cartItemName = document.querySelector('.cart-item-name');
  const cartTotalPrice = document.querySelector('.total-price');

  // cartModal에 class "on" 추가
  cartModal.classList.add('on');

  // 클릭한 상품의 이름을 .cart-item-name에 표시
  cartItemName.innerHTML = productName;

  // 상품 가격과 수량을 곱하여 합계를 계산하여 표시
  updateTotalPrice();

  // 함수: 합계 가격 업데이트
  function updateTotalPrice() {
    const amountCount = parseInt(document.querySelector('.amount-count').textContent);
    const totalPrice = salePrice * amountCount;
    cartTotalPrice.innerHTML = totalPrice.toLocaleString();
  }
}

// 함수: 수량 선택 버튼 클릭 이벤트 처리
function handleAmountButtonClick() {
  const amountCount = document.querySelector('.amount-count');
  const downBtn = document.querySelector('.down-btn');
  const upBtn = document.querySelector('.up-btn');
  downBtn.disabled = true;

  downBtn.addEventListener('click', () => {
    let count = parseInt(amountCount.textContent);
    if (count > 1) {
      count--;
      amountCount.textContent = count;
      upBtn.disabled = false;
      updateTotalPrice();
    } else if (count < 1) {
      downBtn.disabled = true;
    }
  });

  upBtn.addEventListener('click', () => {
    let count = parseInt(amountCount.textContent);
    if (count >= 10) {
      alert('🤠 같은 상품은 최대 10개까지만 담을 수 있습니다.');
      return;
    }
    amountCount.textContent = count + 1;
    downBtn.disabled = false;
    updateTotalPrice();
  });

  // 함수: 합계 가격 업데이트
  function updateTotalPrice() {
    const salePrice = parseFloat(document.querySelector('.sale-price').textContent.replace(/,/g, ''));
    const amountCount = parseInt(document.querySelector('.amount-count').textContent);
    const totalPrice = salePrice * amountCount;
    const cartTotalPrice = document.querySelector('.total-price');
    cartTotalPrice.innerHTML = totalPrice.toLocaleString();
    console.log(amountCount)
  }
}

// 모달창 닫기
function removeOnClass() {
  const cartModal = document.getElementById('cartModal');
  cartModal.classList.remove('on');
}

// 취소 버튼 클릭 이벤트 처리
function handleCancelBtnClick(btn) {
  const cartContentWrap = document.querySelector('.cart-content-wrap');
  const cartCompleteContent = document.querySelector('.cart-complete-content');

  if (btn.closest('.cart-modal-buttons.complete')) {
    cartContentWrap.classList.remove('on');
    cartCompleteContent.classList.remove('on');
    removeOnClass();
  } else {
    removeOnClass();
  }
  initializeOptions();
}

// 배경 클릭 이벤트 처리
function handleCartBackgroundClick() {
  const cartContentWrap = document.querySelector('.cart-content-wrap');
  const cartCompleteContent = document.querySelector('.cart-complete-content');

  cartContentWrap.classList.remove('on');
  cartCompleteContent.classList.remove('on');
  initializeOptions();
  removeOnClass();
}

// 확인 버튼 클릭 이벤트 처리
function handleConfirmBtnClick(confirmBtn) {
  const optionSelect = document.querySelector('.option-select');
  const selectedOption = optionSelect.querySelector('select').value;
  const cartContentWrap = document.querySelector('.cart-content-wrap');
  const cartCompleteContent = document.querySelector('.cart-complete-content');

  if (confirmBtn.id === 'btnCartConfirm') {
    if (selectedOption === '') {
      alert('☕ 분쇄 옵션을 선택하세요.');
    } else {
      cartContentWrap.classList.add('on');
      cartCompleteContent.classList.add('on');
      initializeOptions();
    }
  } else if (confirmBtn.id === 'btnGoCart') {
    window.location.href = '/cart';
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

    handleAmountButtonClick();

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

    // 확인 버튼 클릭 이벤트 처리
    const confirmBtns = document.querySelectorAll('.btn-confirm');
    confirmBtns.forEach((confirmBtn) => {
      confirmBtn.addEventListener('click', () => {
        handleConfirmBtnClick(confirmBtn);
      });
    });
  } catch (error) {
    console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
  }
};
