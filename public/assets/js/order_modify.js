// 모달 열기
function openModal() {
    document.getElementById('myModal').style.display = 'block';
    const orderNumber = document.getElementById('orderNumber');
    const orderProducts = document.getElementById('orderProducts');
    const orderName = document.getElementById('orderName');
    const orderHp = document.getElementById('orderHp');
    orderNumber.innerHTML = '1';
    orderProducts.innerHTML = '2';
    orderName.value = '3';
    orderHp.value = '4';
}

// 모달 닫기
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}
