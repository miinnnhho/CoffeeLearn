get_api.js입니다.
function getProducts() {
  const response = fetch('/assets/products.json');
  const data = response.json();
  return data;
}

main_test.js입니다.
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