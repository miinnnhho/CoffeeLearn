const paymentButton = document.querySelector('.btn-payment-final');
paymentButton.addEventListener('click', function () {
    // 상품금액 요소 가져오기
    const originPrice = document.querySelector('.origin-price span');
    // 총 결제 금액 요소 가져오기
    const totalPriceElement = document.querySelector('.all-price span');

    // 장바구니에 담긴 상품 수량을 가져오기
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const productCount = cartItems ? cartItems.length : 0;

    if (!localStorage.getItem('token')) {
        alert('회원만 주문가능 합니다.');
        window.location.href = '/login';
        return;
    }

    if (productCount === 0) {
        // 상품이 담겨있지 않으면 페이지 이동을 중단합니다.
        return alert('상품을 담아주세요');
    }

    // 상품이 담겨있을 경우, LocalStorage에 저장
    const paymentItems = {
        deliveryFee: 3000,
        originPrice: originPrice.innerHTML,
        totalPriceElement: totalPriceElement.innerHTML,
    };
    localStorage.setItem('paymentItems', JSON.stringify(paymentItems));

    // 페이지 이동
    window.location.href = '/cart/order';
});
