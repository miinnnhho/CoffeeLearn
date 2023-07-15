function createProductElements() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    cartItems.forEach((item) => {
        const productEl = document.createElement('li');
        productEl.classList.add('order-list-el');

        productEl.innerHTML = `
        <div class="product-txt">
            <p class="product-name">${item.productName}</p>
            <span class="product-option">옵션: ${item.option}</span>
        </div>
        <div class="product-price">
            <em class="salePrice">${item.salePrice}</em><span>원</span>
        </div>
        <div class="product-amount">
            <span>x</span><em class="amount">${item.amount}</em><span>개</span>
        </div>
        `;

        document.querySelector('.order-list').appendChild(productEl);
    });
}

let paymentItems = JSON.parse(localStorage.getItem('paymentItems'));
const totalOrderPrice = document.querySelector('#totalOrderPrice');
const totalProductPrice = document.querySelector('#totalProductPrice');
const deliveryPrice = document.querySelector('#deliveryPrice');

totalOrderPrice.innerHTML = paymentItems.totalPriceElement;
totalProductPrice.innerHTML = paymentItems.originPrice;
deliveryPrice.innerHTML = paymentItems.deliveryFee + '원';
createProductElements();
