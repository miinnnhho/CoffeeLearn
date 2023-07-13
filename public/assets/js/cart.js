// 로컬 스토리지에서 데이터 가져오기
const data = JSON.parse(localStorage.getItem('cartItems'));

// 데이터가 존재하고 배열인지 확인
if (Array.isArray(data)) {
    // 카트 아이템 컨테이너 요소 가져오기
    const cartItem = document.querySelector('.cart-item');

    // 데이터 아이템을 반복 처리
    data.forEach((item) => {
        // 카트 아이템 템플릿 복제
        const newItem = cartItem.cloneNode(true);

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
        const totalPrice = newItem.querySelector('.price-current-total');
        const salePrice = item.salePrice;
        const total = item.amount * salePrice;
        totalPrice.textContent = total + '원';

        // 새로운 아이템을 카트 컨테이너에 추가
        cartItem.parentNode.appendChild(newItem);

        // 수량 증가 버튼 이벤트 처리
        const increaseBtn = newItem.querySelector('.up-btn');
        increaseBtn.addEventListener('click', () => {
            item.amount++;
            amountCount.textContent = item.amount;
            const newTotal = item.amount * salePrice;
            totalPrice.textContent = newTotal + '원';
            updateLocalStorage(data);
            console.log('올리기');
        });

        // 수량 감소 버튼 이벤트 처리
        const decreaseBtn = newItem.querySelector('.down-btn');
        decreaseBtn.addEventListener('click', () => {
            if (item.amount >= 2) {
                item.amount--;
                amountCount.textContent = item.amount;
                const newTotal = item.amount * salePrice;
                totalPrice.textContent = newTotal + '원';
                updateLocalStorage(data);
                console.log('내리기');
            }
        });
    });

    // 원본 카트 아이템 템플릿 제거
    cartItem.remove();
}

// 로컬 스토리지 업데이트 함수
function updateLocalStorage(data) {
    localStorage.setItem('cartItems', JSON.stringify(data));
}
