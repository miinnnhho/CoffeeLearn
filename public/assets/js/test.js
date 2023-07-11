

/* 상품 데이터 호출 */
// 상품 데이터 가져오기
async function getProducts() {
  const response = await fetch('/assets/products.json');
  const data = await response.json();
  return data;
}

// 커피 카테고리인지 확인
function isCoffeeCategory(product) {
  return product.category === '커피';
}

// 상품을 box에 표시
function displayProducts(products, itemBoxId, condition) {
  const itemBox = document.getElementById(itemBoxId);
  itemBox.innerHTML = '';

  const filteredProducts = products.filter(condition);

  // 상품은 최대 4개까지만 불러오기
  filteredProducts.slice(0, 4).forEach((product) => {
    const mainImgSrc = `/assets/img/items/item_main_${product.id}.jpg`;
    const salePrice = calculateSalePrice(product);
    const originPriceHTML =
      product.category !== '커피' ? `<p class="price">${product.price.toLocaleString()}원</p>` : '';
    const salePercentHTML = product.category !== '커피' ? `<p class="sale-percent">${product.salePercent}%</p>` : '';

    const itemList = document.createElement('div');
    itemList.className = 'item-list';

    const itemLink = document.createElement('a');
    itemLink.href = `items_info?id=${product.id}`;

    itemLink.innerHTML = `
      <div class="img-box">
        <img class="main-img" src="${mainImgSrc}" />
      </div>
      <div class="detail-box">
        <strong class="description">${product.description}</strong>
        <h3 class="name">${product.name}</h3>
        <div class="details">
          <div class="sale-box">
            ${salePercentHTML}
            <p class="sale-price"> ${salePrice.toLocaleString()}원</p>
          </div>
          <button class="cart-btn"><span class="material-symbols-outlined">shopping_cart</span></button>
        </div>
        ${originPriceHTML}
      </div>
    `;

    itemList.appendChild(itemLink);
    itemBox.appendChild(itemList);
  });
}

// 판매가격 계산
function calculateSalePrice(product) {
  const salePercent = product.salePercent;
  const price = product.price;
  const salePrice = price - (price * salePercent) / 100;
  return salePrice;
}

// 탭을 클릭했을 때 맛 분류에 따라 상품 표시
function displayProductsByTaste(products, taste, itemBoxId) {
  const filteredProducts = products.filter((product) => {
    if (taste === '블렌드') {
      return isCoffeeCategory(product) && product.origin === '블렌드';
    } else {
      return isCoffeeCategory(product) && product.taste === taste;
    }
  });

  displayProducts(filteredProducts, itemBoxId, isCoffeeCategory);
}

// 탭 상태 업데이트(css 작업을 위해 'on'클래스 추가)
function updateTabState(label, input) {
  if (input.checked) {
    label.classList.add('on');
  } else {
    label.classList.remove('on');
  }
}

// 페이지 로드 시 상품 표시
async function initializePage() {
  try {
    const products = await getProducts();
    // 각 itemBox에
    displayProducts(products, 'pickItemBox', isCoffeeCategory);
    displayProductsByTaste(products, '블렌드', 'blendItemBox');

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
  } catch (error) {
    console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
  }
}

// 페이지 로드 시 초기화 함수 호출
document.addEventListener('DOMContentLoaded', () => {
  loadYouTubeAPI();
  window.onYouTubePlayerAPIReady = createYouTubePlayer;
  initializeGiftSwiper();
  initializePage();
});
