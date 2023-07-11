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
  document.getElementById(itemBoxId).appendChild(itemList);
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
      return isCoffeeCategory(product) && product.origin === '블렌드';
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
    originItem.className = 'origin-item-list';

    const itemLink = document.createElement('a');
    itemLink.href = `items_info?id=${product.id}`;

    itemLink.innerHTML = `
      <div class="prod-img">
        <img src="${mainImgSrc}" alt="${product.name}" />
      </div>
      <p class="item-name">${product.name}</p>
      <button class="cart-btn small"><span class="material-symbols-outlined">shopping_cart</span></button>
    `;

    originItem.appendChild(itemLink);
    originItems.appendChild(originItem);
  });
}

// 선물 상품은 최대 5개까지만 불러오기
function displayGiftProducts(products) {
  const giftSwiperWrapper = document.getElementById('giftSwiperWrapper');
  giftSwiperWrapper.innerHTML = '';

  const giftProducts = products.filter((product) => product.category === '선물세트');

  giftProducts.slice(0, 5).forEach((product) => {
    const giftSlide = document.createElement('div');
    giftSlide.className = 'swiper-slide';

    const itemLink = document.createElement('a');
    itemLink.href = `items_info?id=${product.id}`;

    const giftImage = document.createElement('img');
    giftImage.src = getProductImageSrc(product.id);
    giftImage.alt = `선물세트 추천: ${product.name}`;

    itemLink.appendChild(giftImage);
    giftSlide.appendChild(itemLink);
    giftSwiperWrapper.appendChild(giftSlide);
    
    const giftName = document.createElement('p');
    giftName.className = 'gift-name';
    giftName.innerHTML = product.name;
    giftSlide.appendChild(giftName);
  });
}

// 페이지 로드 시 초기화 함수 호출
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await getProducts();
    // 각 itemBox에
    displayProductList(products, 'pickItemBox', isCoffeeCategory);
    displayProductsByTaste(products, '블렌드', 'blendItemBox');
    displayOriginItems(products, '아프리카', 'africa-origin');
    displayOriginItems(products, '아시아/태평양', 'asia-origin');
    displayOriginItems(products, '중남미', 'latin-america-origin');
    displayGiftProducts(products);

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

  // Gift Swiper 초기 셋팅
  new Swiper('.gift-swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: 1,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.gift .swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.gift .swiper-prev',
      nextEl: '.gift .swiper-next',
    },
  });
});
