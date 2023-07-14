// JSON 데이터를 가져옴
async function getProducts() {
  try {
    const response = await fetch('/assets/products.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
    return [];
  }
}

// 상품을 그리드에 표시
function displayProducts(products, itemBoxId) {
  const itemBox = document.getElementById(itemBoxId);
  itemBox.innerHTML = '';

  const filteredProducts = products.filter(({ category }) => category === '커피');

  filteredProducts.forEach((product) => {
    const { id, description, name, price, salePercent } = product;
    const mainImgSrc = `/assets/img/items/item_main_${id}.jpg`;
    const salePrice = calculateSalePrice(price, salePercent);

    const itemEl = document.createElement('div');
    itemEl.className = 'item-list';

    const itemLink = document.createElement('a');
    itemLink.href = `/items_info/${id}`;

    itemLink.innerHTML = `
      <div class="img-box">
        <img class="main-img" src="${mainImgSrc}" />
      </div>
      <div class="detail-box">
        <strong class="description">${description}</strong>
        <h3 class="name">${name}</h3>
    `;

    const priceBox = document.createElement('div');
    priceBox.classList.add('price-box');
    priceBox.innerHTML = `
      <p class="sale-price">${salePrice.toLocaleString()}원</p>
      <button class="cart-btn">
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
    `;

    itemEl.appendChild(itemLink);
    itemEl.appendChild(priceBox);
    itemBox.appendChild(itemEl);
  });
}

// 판매가격 계산
function calculateSalePrice(price, salePercent) {
  const salePrice = price - (price * salePercent) / 100;
  return salePrice;
}

// 탭을 클릭했을 때 상품 표시
function displayProductsByTaste(products, taste, itemBoxId) {
  const filteredProducts = products.filter(({ category, taste }) => category === '커피' && taste === taste);
  displayProducts(filteredProducts, itemBoxId);

  // 모든 탭에서 "on" 클래스 제거
  const tabLabels = document.querySelectorAll('.tab-label');
  tabLabels.forEach((label) => {
    label.classList.remove('on');
  });

  // 클릭한 탭에 "on" 클래스 추가
  const clickedTabLabel = document.querySelector(`.tab-label input[data-taste="${taste}"]`).parentElement;
  clickedTabLabel.classList.add('on');
}

// 페이지 로드 시 상품 표시
window.onload = async () => {
  const itemBoxId = 'pickItemBox';

  try {
    const products = await getProducts();
    const coffeeProducts = products.filter(({ category }) => category === '커피');
    displayProducts(coffeeProducts, itemBoxId);

    // .item-list의 개수 표시
    const productsCountEl = document.querySelector('.productsCount');
    productsCountEl.innerHTML = coffeeProducts.length;

    // 탭 클릭 이벤트 처리
    const tabLabels = document.querySelectorAll('.tab-label');
    tabLabels.forEach((label) => {
      const { taste } = label.querySelector('input');
      label.addEventListener('click', (event) => {
        displayProductsByTaste(coffeeProducts, taste, itemBoxId);

        // 화면 맨 위로 올라가는 기본 동작 방지
        event.preventDefault();

        // 모든 탭에서 "on" 클래스 제거
        tabLabels.forEach((tabLabel) => {
          tabLabel.classList.remove('on');
        });

        // 클릭한 탭에 "on" 클래스 추가
        label.classList.add('on');
      });
    });
  } catch (error) {
    console.error('상품을 가져오는 동안 오류가 발생했습니다:', error);
  }
};
