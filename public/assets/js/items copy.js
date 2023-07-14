// JSON 데이터를 가져옴
async function getProducts() {
  try {
    const response = await fetch("/assets/products.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품을 가져오는 동안 오류가 발생했습니다:", error);
    return [];
  }
}
// 상품을 그리드에 표시
function displayProducts(products, itemBoxId) {
  const itemBox = document.getElementById(itemBoxId);
  itemBox.innerHTML = "";

  const filteredProducts = products.filter(
    (product) => product.category === "커피"
  );

  filteredProducts.forEach((product) => {
    const mainImgSrc = `/assets/img/items/item_main_${product.id}.jpg`;
    const salePrice = calculateSalePrice(product);

    let originPrice = "";
    let salePercent = "";
    if (product.category !== "커피") {
      originPrice = `<p class="price">${product.price.toLocaleString()}원</p>`;
      salePercent = `<p class="sale-percent">${product.salePercent}%</p>`;
    }
    const itemList = document.createElement("div");
    itemList.className = "item-list";

    const itemLink = document.createElement("a");
    itemLink.href = `/items_info/${product.id}`;

    itemLink.innerHTML = `
        <div class="img-box">
          <img class="main-img" src="${mainImgSrc}" />
        </div>
        <div class="detail-box">
          <strong class="description">${product.description}</strong>
          <h3 class="name">${product.name}</h3>
          <div class="details">
            <div class="sale-box">
              ${salePercent}
              <p class="sale-price">${salePrice.toLocaleString()}원</p>
            </div>
            <button class="cart-btn"><span class="material-symbols-outlined">shopping_cart</span></button>
          </div>
        ${originPrice}
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

// 탭을 클릭했을 때 상품 표시
function displayProductsByTaste(products, taste, itemBoxId) {
  const filteredProducts = products.filter(
    (product) => product.category === "커피" && product.taste === taste
  );
  displayProducts(filteredProducts, itemBoxId);

  // 모든 탭에서 "on" 클래스 제거
  const tabLabels = document.querySelectorAll(".tab-label");
  tabLabels.forEach((label) => {
    label.classList.remove("on");
  });

  // 클릭한 탭에 "on" 클래스 추가
  const clickedTabLabel = document.querySelector(
    `.tab-label input[data-taste="${taste}"]`
  ).parentElement;
  clickedTabLabel.classList.add("on");
}

// 페이지 로드 시 상품 표시
document.addEventListener("DOMContentLoaded", async () => {
  const itemBoxId = "pickItemBox";

  try {
    const products = await getProducts();
    const coffeeProducts = products.filter(
      (product) => product.category === "커피"
    );
    displayProducts(coffeeProducts, itemBoxId);

    // 탭 클릭 이벤트 처리
    const tabLabels = document.querySelectorAll(".tab-label");
    tabLabels.forEach((label) => {
      const input = label.querySelector("input");
      const taste = input.getAttribute("data-taste");

      label.addEventListener("click", (event) => {
        displayProductsByTaste(coffeeProducts, taste, itemBoxId);

        // 화면 맨 위로 올라가는 기본 동작 방지
        event.preventDefault();

        // 모든 탭에서 "on" 클래스 제거
        tabLabels.forEach((tabLabel) => {
          tabLabel.classList.remove("on");
        });

        // 클릭한 탭에 "on" 클래스 추가
        label.classList.add("on");
      });

      // input의 checked 상태에 따라 아이콘 변경 ** 동작 안함
      input.addEventListener("change", () => {
        const icon = label.querySelector(".material-icons");
        if (input.checked) {
          icon.innerText = "radio_button_checked";
        } else {
          icon.innerText = "radio_button_unchecked";
        }
      });
    });
  } catch (error) {
    console.error("상품을 가져오는 동안 오류가 발생했습니다:", error);
  }
});
