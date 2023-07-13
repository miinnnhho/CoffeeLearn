// 결제하기 버튼 클릭 시 처리
const paymentButton = document.querySelector('.btn-payment-final');
paymentButton.addEventListener('click', function () {
    // 상품금액 요소 가져오기
    const originPrice = document.querySelector('.origin-price span');
    // 총 결제 금액 요소 가져오기
    const totalPriceElement = document.querySelector('.all-price span');
    // LocalStorage에 저장
    const paymentItems = {
        deliveryFee: 3000,
        originPrice: originPrice.innerHTML,
        totalPriceElement: totalPriceElement.innerHTML,
    };
    localStorage.setItem('paymentItems', JSON.stringify(paymentItems));
    // localStorage.removeItem('cartItems');
    //  결제 완료 후 처리할 코드 작성
    // ...

    // 예시: 페이지 이동
    window.location.href = '/cart_order';
});
