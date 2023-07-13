// 아이디 추출
// const urlParams = new URLSearchParams(window.location.search);
// const productId = urlParams.get("id");

const productId = window.location.pathname.split('/').at(-1)

// 서버에 데이터 요청
async function fetchProductDetails(productId) {
  try {
    const res = await fetch(`/assets/data/products.json/${productId}`);
    if (!res.ok) {
      throw new Error("상품 정보를 불러올 수 없습니다.");
    }
    const productDetails = await res.json();
    return productDetails;
  } catch (error) {
    console.error(error);
    // 오류 처리
  }
}

// 폼에 정보 채우기
async function fillFormWithProductDetails(productId) {
  const productDetails = await fetchProductDetails(productId);

  const form = document.querySelector("#addItemForm");
  form.querySelector(".select-category").value = productDetails.category;
  form.querySelector(".select-taste").value = productDetails.taste;
  form.querySelector(".select-origin").value = productDetails.origin;
  form.querySelector(".input-name").value = productDetails.name;
  form.querySelector(".input-price").value = productDetails.price;
  form.querySelector(".input-amount").value = productDetails.amount;
  form.querySelector(".input-main-img").value = productDetails.mainImg;
  form.querySelector(".input-sub-img").value = productDetails.subImg;
  form.querySelector(".input-description").value = productDetails.description;
  form.querySelector(".select-show").value = productDetails.show;
}

// 페이지 로드 시 폼 채우기 함수 실행
// window.addEventListener("DOMContentLoaded", fillFormWithProductDetails);
