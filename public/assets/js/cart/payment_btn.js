// 결제하기 버튼 클릭 시 처리
const paymentButton = document.querySelector('.btn-payment-final');
paymentButton.addEventListener('click', function () {
    // 받는 사람 요소 가져오기
    const receiverName = document.querySelector('#receiverName');
    // 연락처 요소 가져오기
    const receiverPhone = document.querySelector('#receiverPhone');
    // 받는 사람 요소 가져오기
    const address = document.querySelector('#address');
    // 받는 사람 요소 가져오기
    const detailedAddress = document.querySelector('#detailedAddress');
    // 받는 사람 요소 가져오기
    const receiverMessage = document.querySelector('#receiverMessage');

    // LocalStorage에 저장
    const orderInfo = {
        receiverName: receiverName.value,
        receiverPhone: receiverPhone.value,
        address: address.value,
        detailedAddress: detailedAddress.value,
        receiverMessage: receiverMessage.value,
    };
    console.log(orderInfo);

    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

    //  결제 완료 후 처리할 코드 작성: 로컬스토리지 초기화, 페이지 이동
    localStorage.removeItem('cartItems');
    localStorage.removeItem('paymentItems');
    localStorage.removeItem('orderInfo');
    window.location.href = '/cart/order_complete';
});
