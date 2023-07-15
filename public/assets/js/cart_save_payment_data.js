// 결제하기 버튼 클릭 시 처리
const paymentButton = document.querySelector('.btn-payment-final');
paymentButton.addEventListener('click', function () {
    // 받는 사람 정보 가져오기
    const receiverName = document.querySelector('#receiverName').value;
    const receiverPhone = document.querySelector('#receiverPhone').value;
    const address = document.querySelector('#address').value;
    const detailedAddress = document.querySelector('#detailedAddress').value;
    const receiverMessage = document.querySelector('#receiverMessage').value;

    // 주문 상품 정보 가져오기
    const products = [];
    const productList = document.querySelectorAll('.order-list-el');
    productList.forEach(function (product) {
        const productName = product.querySelector('.product-name').textContent;
        const productOption = product.querySelector('.product-option').textContent;
        const salePrice = product.querySelector('.salePrice').textContent;
        const amount = product.querySelector('.amount').textContent;

        const productInfo = {
            productName: productName,
            option: productOption,
            price: salePrice,
            amount: amount,
        };

        products.push(productInfo);
    });

    // LocalStorage에 저장
    const paymentItems = {
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        address: address,
        detailedAddress: detailedAddress,
        receiverMessage: receiverMessage,
        products: products,
    };
    localStorage.setItem('paymentItems', JSON.stringify(paymentItems));

    //  결제 완료 후 처리할 코드 작성
    // ...

    // 예시: 페이지 이동
    // window.location.href = '/order_complete';
});
