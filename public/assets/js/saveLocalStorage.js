// 저장할 정보를 localStorage에 저장하는 함수
function saveToLocalStorage(productName, quantity, totalPrice, option) {
  const cartItem = {
    productName: productName,
    quantity: quantity,
    totalPrice: totalPrice,
    option: option
  };

  // 이전에 저장된 장바구니 정보가 있다면 가져온 후, 새로운 상품 정보를 추가합니다.
  let cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    cartItems.push(cartItem);
  } else {
    cartItems = [cartItem];
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

window.onload = () => {
  const confirmBtn = document.getElementById('btnCartConfirm');
  confirmBtn.addEventListener('click', () => {
    const productName = document.querySelector('.cart-item-name').innerHTML;
    const quantity = parseInt(document.querySelector('.amount-count').innerHTML);
    const totalPrice = parseInt(document.querySelector('.total-price').textContent.replace(/,/g, ''));
    const option = document.querySelector('.option-select select').value;

    saveToLocalStorage(productName, quantity, totalPrice, option);
  });
};
