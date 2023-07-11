//모든 주문 목록 (임시)
//추후 fetch로 바꿀예정

let orderList;

function getProducts() {
    return new Promise((resolve, reject) => {
        fetch('/assets/data/order.json')
            .then((response) => response.json())
            .then((data) => {
                orderList = data;
                console.log(orderList);
                resolve(); // 데이터 할당 후에 Promise를 해결합니다.
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
                reject(error); // 에러가 발생한 경우 Promise를 거부합니다.
            });
    });
}

// async 함수를 정의하여 비동기적으로 실행합니다.
async function initialize() {
    try {
        await getProducts(); // getProducts() 함수를 await하여 데이터를 가져옵니다.
        // 데이터가 할당된 후에 원하는 작업을 수행합니다.
        console.log('Products data has been initialized.');
        // ...
    } catch (error) {
        console.error('Error initializing products data:', error);
    }
}

// initialize() 함수를 호출하여 초기화 작업을 시작합니다.
initialize();

function clickSearchBtn() {
    console.log(orderList);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const orders = getOrdersByDateRange(startDate, endDate);
    //기간에 맞는 order 배열
    displayOrders(orders);
} //조회 날짜별 검색

function getOrdersByDateRange(startDate, endDate) {
    const filteredOrders = orderList.filter(function (order) {
        return order.orderDate >= startDate && order.orderDate <= endDate;
    });

    return filteredOrders;
} // input으로 기간 입력받아서 모든 주문 목록에서 기간에 맞는 필터함수 사용

function displayOrders(orders) {
    //기간에 맞는 order 배열입력받음
    const reverseOrders = orders.reverse();
    const emptyOrder = document.querySelector('.empty-order');
    const button = document.createElement('input');
    button.type = 'button';
    button.className = 'order-btn';
    button.value = '주문 취소';
    const button2 = Object.assign(document.createElement('input'), {
        type: 'button',
        className: 'order-btn',
        id: 'onOrderModal',
        value: '주문 수정',
    });

    // 해야될거
    // 3. 각 parentschild랑 연결해서 수정 가능하게 만들기

    const orderRows = orders
        .map((order) => {
            const deliveryStatusCell = order.deliveryStatus === '배송준비중' ? button.outerHTML : '-';
            const orderStatusCell = order.deliveryStatus === '배송준비중' ? button2.outerHTML : '-';
            //배송준비중 일 때만 취소버튼 생성 취소버튼 구현은 다음에
            return `
            
      <tr>
        <td>${order.orderNumber}<p> ${order.orderDate}</td>
        <td>${order.name}</td>
        <td>${order.quantity}</td>
        <td>${order.salePrice}</td>
        <td>${order.orderStatus}</td>
        <td>${order.deliveryStatus}</td>
        <td>${deliveryStatusCell}</td>
        <td>${orderStatusCell}</td>
      </tr>
    `; //테이블 양식에 맞춰 넣어주기
        })
        .join('');
    if (!orders.length == 0) {
        emptyOrder.classList.add('clicked');
    }
    if (orders.length == 0 && emptyOrder.classList.contains('clicked')) {
        emptyOrder.classList.remove('clicked');
    }
    // 주문 내역 여부에 따라서 class 추가해서 주문 내역이 없습니다 안내 여부 판단
    document.getElementById('order-rows').innerHTML = orderRows;

    // 모달작업!!
    const onOrderModifyModal = document.querySelector('#onOrderModal');
    onOrderModifyModal.addEventListener('click', ModifyModal);
    function ModifyModal() {
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
}

//조회 기간 버튼 - 오늘
function dateChangeToday() {
    const today = new Date().toISOString().split('T')[0];
    //Date 쪼개기
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;
    resetButtonStyles();
    btnToday.style.backgroundColor = '#288341';
    btnToday.style.color = 'white';
}

//조회 기간 버튼 - 7일
function dateChangeWeek() {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];
    document.getElementById('start-date').value = startDate;
    document.getElementById('end-date').value = endDate;
    resetButtonStyles();
    btnWeek.style.backgroundColor = '#288341';
    btnWeek.style.color = 'white';
}

//조회 기간 버튼 - 1개월
function dateChangeMonth() {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1)
        .toISOString()
        .split('T')[0];
    const endDate = today.toISOString().split('T')[0];
    document.getElementById('start-date').value = startDate;
    document.getElementById('end-date').value = endDate;
    resetButtonStyles();
    btnMonth.style.backgroundColor = '#288341';
    btnMonth.style.color = 'white';
}

//조회 기간 버튼 - 3개월
function dateChange3Month() {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate() + 1)
        .toISOString()
        .split('T')[0];
    const endDate = today.toISOString().split('T')[0];
    document.getElementById('start-date').value = startDate;
    document.getElementById('end-date').value = endDate;
    resetButtonStyles();
    btn3Month.style.backgroundColor = '#288341';
    btn3Month.style.color = 'white';
}

//조회 기간 버튼 - 1년
function dateChangeYear() {
    const today = new Date();
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() + 1)
        .toISOString()
        .split('T')[0];
    const endDate = today.toISOString().split('T')[0];
    document.getElementById('start-date').value = startDate;
    document.getElementById('end-date').value = endDate;
    resetButtonStyles();
    btnYear.style.backgroundColor = '#288341';
    btnYear.style.color = 'white';
}
//버튼 클릭시 모든 버튼 배경색 흰색, 글꼴 검정으로 초기화하는 함수
function resetButtonStyles() {
    btnToday.style.backgroundColor = '#fff';
    btnWeek.style.backgroundColor = '#fff';
    btnMonth.style.backgroundColor = '#fff';
    btn3Month.style.backgroundColor = '#fff';
    btnYear.style.backgroundColor = '#fff';
    btnToday.style.color = 'black';
    btnWeek.style.color = 'black';
    btnMonth.style.color = 'black';
    btn3Month.style.color = 'black';
    btnYear.style.color = 'black';
}
const searchBtn = document.getElementById('search-button');
const btnToday = document.getElementById('btnToday');
const btnWeek = document.getElementById('btnWeek');
const btnMonth = document.getElementById('btnMonth');
const btn3Month = document.getElementById('btn3Month');
const btnYear = document.getElementById('btnYear');

searchBtn.addEventListener('click', clickSearchBtn); //조회 버튼 클릭 이벤트 등록
btnToday.addEventListener('click', dateChangeToday); //오늘 버튼 클릭 이벤트 등록
btnWeek.addEventListener('click', dateChangeWeek); //7일 버튼 클릭 이벤트 등록
btnMonth.addEventListener('click', dateChangeMonth); //1개월 버튼 클릭 이벤트 등록
btn3Month.addEventListener('click', dateChange3Month); //3개월 버튼 클릭 이벤트 등록
btnYear.addEventListener('click', dateChangeYear); //1년 버튼 클릭 이벤트 등록
