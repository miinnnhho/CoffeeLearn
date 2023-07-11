// 공통 함수: 상품 이미지 경로 생성
function getProductImageSrc(productId) {
  return `/assets/img/items/item_main_${productId}.jpg`;
}

// 공통 함수: 상품 가격 표시 HTML 생성
function generatePriceHTML(price, category) {
  return category !== '커피' ? `<p class="price">${price.toLocaleString()}원</p>` : '';
}

// 공통 함수: 상품 할인 가격 계산
function calculateSalePrice(product) {
  const salePercent = product.salePercent;
  const price = product.price;
  const salePrice = price - (price * salePercent) / 100;
  return salePrice;
}

// 공통 함수: 상품 HTML 요소 생성
function createProductElement(product, itemBoxId) {
  const mainImgSrc = getProductImageSrc(product.id);
  const salePrice = calculateSalePrice(product);
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
    handleCartButtonClick(product.name);
  });
}

// 공통 함수: cart-btn 클릭 이벤트 처리
function handleCartButtonClick(productName) {
  const cartModal = document.getElementById('cartModal');
  const cartItemName = document.querySelector('.cart-item-name');

  // cartModal에 class "on" 추가
  cartModal.classList.add('on');

  // 클릭한 상품의 이름을 .cart-item-name에 표시
  cartItemName.innerHTML = productName;
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

// 나라별 상품은 최대 2개까지만 불러오기
function displayOriginItems(products, origin, originId) {
  const originList = document.getElementById(originId);
  const originItems = originList.querySelector('.origin-items');
  originItems.innerHTML = '';

  const filteredProducts = products.filter((product) => product.origin === origin);

  filteredProducts.slice(0, 2).forEach((product) => {
    const mainImgSrc = getProductImageSrc(product.id);

    const originItem = document.createElement('li');
    originItem.classList.add('origin-item-list');

    const itemLink = `items_info?id=${product.id}`;

    originItem.innerHTML = `
    <div>
        <div class="prod-img">
            <img src="${mainImgSrc}" alt="${product.name}" />
        </div>
        <a href=${itemLink} class="item-name">${product.name}</a>
    </div>
    `;

    const cartBtn = document.createElement('button');
    cartBtn.classList.add('cart-btn', 'small');
    cartBtn.innerHTML = `<span class="material-symbols-outlined">shopping_cart</span></button>`;

    originItem.appendChild(cartBtn);
    originItems.appendChild(originItem);

    // cart-btn 클릭 이벤트 처리
    cartBtn.addEventListener('click', () => {
      handleCartButtonClick(product.name);
    });
  });
}

// 공통 함수: 스크롤 고정 및 cartModal.on 제거
function removeOnClass() {
  const cartModal = document.getElementById('cartModal');
  cartModal.classList.remove('on');
}

// 공통 함수: 상품 데이터 저장
function saveProductToLocalStorage(product, optionValue) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const existingProductIndex = products.findIndex((p) => p.name === product.name);

  if (existingProductIndex !== -1) {
    // 이미 상품이 존재하는 경우 기존 상품을 업데이트
    products[existingProductIndex] = { ...product, option: optionValue };
  } else {
    // 새로운 상품을 추가
    products.push({ ...product, option: optionValue });
  }

  localStorage.setItem('products', JSON.stringify(products));
}

// 함수 : 장바구니 모달의 select option 초기화
function initializeOptions() {
  const optionSelect = document.querySelector('.option-select');
  const selectMenu = optionSelect.querySelector('.select-menu');

  selectMenu.selectedIndex = 0; // 초기 선택값을 첫 번째 옵션으로 설정
}

window.onload = async () => {
  try {
    const products = await getProducts();
    // 각 itemBox에
    displayProductList(products, 'pickItemBox', isCoffeeCategory);
    displayProductsByTaste(products, '블렌드', 'blendItemBox');
    displayOriginItems(products, '아프리카', 'africa-origin');
    displayOriginItems(products, '아시아/태평양', 'asia-origin');
    displayOriginItems(products, '중남미', 'latin-america-origin');

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

    // 취소 버튼 클릭 이벤트 처리
    const cancelBtn = document.querySelector('.btn-cancel');
    cancelBtn.addEventListener('click', () => {
      removeOnClass();
      initializeOptions();
    });

    // 배경 클릭 이벤트 처리
    const cartBackground = document.getElementById('cartBackground');
    cartBackground.addEventListener('click', removeOnClass);

    // 확인 버튼 클릭 이벤트 처리
    const confirmBtn = document.querySelector('.btn-confirm');
    confirmBtn.addEventListener('click', () => {
      const optionSelect = document.querySelector('.option-select');
      const selectedOption = optionSelect.querySelector('select').value;

      if (selectedOption === '') {
        alert('☕ 분쇄 옵션을 선택하세요.');
      } else {
        const productName = document.querySelector('.cart-item-name').textContent;
        const selectedProduct = products.find((product) => product.name === productName);

        saveProductToLocalStorage(selectedProduct, selectedOption);
        alert('🛍상품이 장바구니에 담겼습니다.');
      }

      initializeOptions();
      removeOnClass();
    });
  } catch (error) {
    console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
  }
};
