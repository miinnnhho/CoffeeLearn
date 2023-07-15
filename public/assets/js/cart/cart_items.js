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
      showCartModal(product.name, salePrice);
    });
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
    } catch (error) {
      console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
    }
  };
  