// 서버에서 아이디에 해당하는 상품 정보 가져오기
async function fetchProductDetails(productId) {
  try {
      const res = await fetch('/assets/data/products.json', {
          method: 'GET',
      });
      if (!res.ok) {
          throw new Error('에러가 발생했습니다.');
      }
      const productList = await res.json();
      const productDetails = productList.find((product) => product.id === productId);
      console.log(productDetails)
      return productDetails;
  } catch (error) {
      console.error(error);
      // 오류 처리
      return null; // 오류 발생 시 null 반환
  }
}

// 페이지 로드 시 폼 채우기 함수 실행
window.addEventListener('DOMContentLoaded', async () => {
  const productId = window.location.pathname.split('/').at(-1);
  console.log(productId);
  const productDetails = await fetchProductDetails(productId);

  if (productDetails) {
      const categorySelect = document.querySelector('.select-category');
      const tasteSelect = document.querySelector('.select-taste');
      const originSelect = document.querySelector('.select-origin');
      const nameInput = document.querySelector('.input-name');
      const priceInput = document.querySelector('.input-price');
      const amountInput = document.querySelector('.input-amount');
      const mainImgInput = document.querySelector('.input-main-img');
      const subImgInput = document.querySelector('.input-sub-img');
      const descriptionInput = document.querySelector('.input-description');
      const showSelect = document.querySelector('.select-show');

      // 카테고리 옵션 설정
      const categoryOptions = productDetails.categories.map((category) => {
          return `<option value="${category}" ${category === productDetails.category ? 'selected' : ''}>${category}</option>`;
      });
      categorySelect.innerHTML = categoryOptions.join('');

      // 맛 옵션 설정
      const tasteOptions = productDetails.tastes.map((taste) => {
          return `<option value="${taste}" ${taste === productDetails.taste ? 'selected' : ''}>${taste}</option>`;
      });
      tasteSelect.innerHTML = tasteOptions.join('');

      // 원산지 옵션 설정
      const originOptions = productDetails.origins.map((origin) => {
          return `<option value="${origin}" ${origin === productDetails.origin ? 'selected' : ''}>${origin}</option>`;
      });
      originSelect.innerHTML = originOptions.join('');

      // 나머지 입력 필드 값 설정
      nameInput.value = productDetails.name;
      priceInput.value = productDetails.price;
      amountInput.value = productDetails.amount;
      mainImgInput.value = productDetails.mainImg;
      subImgInput.value = productDetails.subImg;
      descriptionInput.value = productDetails.description;

      // 상품 표시 옵션 설정
      showSelect.value = productDetails.show;
  }
});
