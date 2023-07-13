// 로컬 스토리지에서 데이터 가져오기
let data = JSON.parse(localStorage.getItem('cartItems'));

// 데이터가 존재하고 배열인지 확인
if (!Array.isArray(data) || data.length === 0) {
    // 카트 아이템 컨테이너 요소 가져오기
    const cartContainer = document.querySelector('.cart-items');
    // "담은 상품이 없습니다" 메시지 표시
    cartContainer.innerHTML = `<div class="cart-item">
    <p class="no-items"> ☕ 장바구니에 상품이 없습니다. </p>
  </div>`;
} else {
    // 카트 아이템 컨테이너 요소 가져오기
    const cartContainer = document.querySelector('.cart-items');
    // 상품금액 요소 가져오기
    const originPrice = document.querySelector('.origin-price span');
    // 총 결제 금액 요소 가져오기
    const totalPriceElement = document.querySelector('.all-price span');
    // 배송비
    const deliveryFee = 3000;

    // 총 상품금액 초기화
    let totalPrice = 0;

    // 데이터 아이템을 반복 처리
    data.forEach((item, index) => {
        // 카트 아이템 템플릿 복제
        const cartItemTemplate = document.querySelector('.cart-item');
        const newItem = cartItemTemplate.cloneNode(true);

        const chkBox = newItem.querySelector('.cart-chk');

        // 상품 이름 업데이트
        const itemName = newItem.querySelector('.item-name');
        itemName.textContent = item.productName;

        // 옵션 업데이트
        const option = newItem.querySelector('.option em');
        option.textContent = item.option;

        // 수량 업데이트
        const amountCount = newItem.querySelector('.amount-count');
        amountCount.textContent = item.amount;

        // 총 가격 계산
        const totalPriceElement = newItem.querySelector('.price-current-total');
        const salePrice = item.salePrice;
        const total = item.amount * salePrice;
        totalPriceElement.textContent = total + '원';

        // 총 상품금액 업데이트
        totalPrice += total;

        // 새로운 아이템을 카트 컨테이너에 추가
        cartContainer.appendChild(newItem);

        // 수량 증가 버튼 이벤트 처리
        const increaseBtn = newItem.querySelector('.up-btn');
        increaseBtn.addEventListener('click', () => {
            item.amount++;
            amountCount.textContent = item.amount;
            const newTotal = item.amount * salePrice;
            totalPriceElement.textContent = newTotal + '원';
            updateLocalStorage(data);
            updatePaymentInformation();
        });

        // 수량 감소 버튼 이벤트 처리
        const decreaseBtn = newItem.querySelector('.down-btn');
        decreaseBtn.addEventListener('click', () => {
            if (item.amount >= 2) {
                item.amount--;
                amountCount.textContent = item.amount;
                const newTotal = item.amount * salePrice;
                totalPriceElement.textContent = newTotal + '원';
                updateLocalStorage(data);
                updatePaymentInformation();
            }
        });

        // 항목 삭제 버튼 이벤트 처리
        const deleteBtn = newItem.querySelector('.btn-clear');
        deleteBtn.addEventListener('click', () => {
            data.splice(index, 1); // 배열에서 해당 항목 삭제
            newItem.remove(); // HTML에서 해당 아이템 제거
            updateLocalStorage(data); // 로컬 스토리지 업데이트
            updatePaymentInformation(); // 결제 정보 업데이트
        });
    });

    // 원본 카트 아이템 템플릿 제거
    const cartItemTemplate = document.querySelector('.cart-item');
    cartItemTemplate.remove();

    // 결제 정보 업데이트 함수
    function updatePaymentInformation() {
        // 총 상품금액 초기화
        totalPrice = 0;

        // 각 상품별로 총 가격 계산
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach((item) => {
            const totalElement = item.querySelector('.price-current-total');
            const total = parseInt(totalElement.textContent);
            totalPrice += total;
        });

        // 상품금액 업데이트
        originPrice.textContent = totalPrice + '원';

        // 총 결제 금액 업데이트
        const totalPayment = totalPrice + deliveryFee;
        totalPriceElement.textContent = totalPayment + '원';
    }

    // 항목 전체 삭제 버튼 이벤트 처리
    const allDelBtn = document.querySelector('.btn-all-clear');
    allDelBtn.addEventListener('click', () => {
        localStorage.removeItem('cartItems');
        cartContainer.innerHTML = `<div class="cart-item">
        <p class="no-items"> ☕ 장바구니에 상품이 없습니다. </p>
      </div>`; // 카트 아이템 컨테이너 비우고 "담은 상품이 없습니다" 메시지 표시
        updatePaymentInformation(); // 결제 정보 업데이트
    });

    // 초기 결제 정보 업데이트
    updatePaymentInformation();
}

// 로컬 스토리지 업데이트 함수
function updateLocalStorage(data) {
    localStorage.setItem('cartItems', JSON.stringify(data));
}
