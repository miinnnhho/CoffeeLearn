// 상품 불러오기 

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








// 상품 목록 표시 (상품 선택 전)
async function displayProductList() {
  const productListElement = document.getElementById('sub-detail');
  productListElement.style.display = 'block';

  const products = await getProducts();

  products.forEach((product) => {
    const item = document.createElement('');
    item.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" />
      <p>${product.price}원</p>
    `;
    item.addEventListener('click', () => {
      displayProductDetails(product.id);
    });

    productListElement.appendChild(item);
  });
}

// 상품 상세 정보 표시 (상품 선택 후)
async function displayProductDetails(productId) {
  const productListElement = document.getElementById('sub-detail');
  const products = await getProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.error('상품을 찾을 수 없습니다');
    return;
  }

  productListElement.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" />
    <p>${product.price}원</p>
  `;
}

// 기본적으로 상품 목록을 표시
displayProductList();

































//상품 수량 옵션
// HTML 요소를 선택합니다
var downBtn = document.querySelector(".down-btn");
var upBtn = document.querySelector(".up-btn");
var amountCount = document.querySelector(".amount-count");

// 초기 수량을 설정합니다.
var count = 1;

// '+', '-' 버튼에 클릭 이벤트를 추가합니다
downBtn.addEventListener('click', function () {
  if (count > 1) { // 수량이 1보다 클 때만 감소
    count--;
    amountCount.textContent = count;

    // 수량이 1이 되면 'down' 버튼을 비활성화합니다
    if (count === 1) {
      downBtn.disabled = true;
    }
  }
});

upBtn.addEventListener('click', function () {
  count++;
  amountCount.textContent = count;

  // 수량이 1보다 크면 'down' 버튼을 활성화합니다
  if (count > 1) {
    downBtn.disabled = false;
  }
});



var totalCostElement = document.querySelector(".total-cost");

// 상품의 기본 가격을 설정합니다.
var itemPrice = 3400; // 이 값을 실제 상품 가격으로 변경하세요.

// 초기 주문 합계를 설정합니다.
var count = 1;



document.querySelector('.items-discount').textContent = product.discount + '%';
document.querySelector('.items-price').textContent = product.price + '원';

// 상품 가격 변수 업데이트
itemPrice = product.price;


displayProductDetails();





