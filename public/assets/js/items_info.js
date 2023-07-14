const path = window.location.pathname;
const pathNumber = path.split('/items_info/')[1];

// 상품 데이터 호출
function getProducts() {
  return fetch('http://kdt-sw-5-team07.elicecoding.com:3000/products').then((res) => res.json());
}

// salePrice를 계산하는 함수
function calculateSalePrice(originPrice, salePercent) {
  if (salePercent === 0 || salePercent === undefined) {
    return originPrice;
  } else {
    return Math.round((originPrice - (originPrice * salePercent) / 100) / 10) * 10;
  }
}

// 상품 정보 업데이트 함수
function updateProductInfo(product) {
  const itemName = document.querySelector('.item-name');
  const salePercent = document.querySelector('.sale-percent');
  const salePrice = document.querySelector('.sale-price');
  const originPrice = document.querySelector('.origin-price');
  const amountCount = document.querySelector('.amount-count');

  // name 업데이트
  itemName.innerText = product.name;

  // salePercent 업데이트
  salePercent.innerText = product.salePercent || 0;

  // originPrice 업데이트
  originPrice.innerText = product.price.toLocaleString();

  // salePrice 계산 및 업데이트
  const calculatedSalePrice = calculateSalePrice(product.price, product.salePercent);
  salePrice.innerText = calculatedSalePrice.toLocaleString();

  // amountCount 업데이트
  amountCount.innerText = product.amount;
}

// 수량 버튼 이벤트 핸들러
function handleAmountButtons() {
  const amountCount = document.querySelector('.amount-count');
  const upButton = document.querySelector('.up-btn');
  const downButton = document.querySelector('.down-btn');
  const salePrice = document.querySelector('.sale-price');
  const total = document.querySelector('.total-price');

  // upButton 클릭 시
  upButton.addEventListener('click', () => {
    let count = parseInt(amountCount.innerText);
    count += 1;
    amountCount.innerText = count;

    // downButton 활성화
    if (count > 1) {
      downButton.removeAttribute('disabled');
    }

    // totalPrice 계산 및 업데이트
    const totalPrice = count * parseInt(salePrice.innerText.replace(/,/g, ''));
    total.innerText = totalPrice.toLocaleString();
  });

  // downButton 클릭 시
  downButton.addEventListener('click', () => {
    let count = parseInt(amountCount.innerText);

    // count가 1 이상일 때만 감소
    if (count > 1) {
      count -= 1;
      amountCount.innerText = count;

      // totalPrice 계산 및 업데이트
      const totalPrice = count * parseInt(salePrice.innerText.replace(/,/g, ''));
      total.innerText = totalPrice.toLocaleString();
    }

    // downButton 비활성화
    if (count === 1) {
      downButton.setAttribute('disabled', true);
    }
  });
}

// 초기화 함수
function init() {
  // 데이터 가져오기
  getProducts().then((products) => {
    const product = products.find((product) => product._id === pathNumber);
    updateProductInfo(product); // 상품 정보 업데이트
    updateTotalPrice(product); // totalPrice 업데이트
  });

  // 수량 버튼 이벤트 처리
  handleAmountButtons();
}

// totalPrice 업데이트 함수
function updateTotalPrice(product) {
  const total = document.querySelector('.total-price');
  const amountCount = document.querySelector('.amount-count');
  const salePrice = document.querySelector('.sale-price');

  // totalPrice 계산
  const totalPrice = product.amount * parseInt(salePrice.innerText.replace(/,/g, ''));

  // total 업데이트
  total.innerText = totalPrice.toLocaleString();
}

// 초기화 함수 호출
init();
