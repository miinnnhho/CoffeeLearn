const allOrders = [
  {
    orderNumber: "001",
    orderDate: "2023-06-01",
    productName: "미미 미떼",
    options: "여과지",
    quantity: 2,
    price: 10000,
    orderStatus: "결제완료",
    deliveryStatus: "배송완료",
    cancellationRequested: "아니오",
  },
  {
    orderNumber: "002",
    orderDate: "2023-07-02",
    productName: "스타 블렌드",
    options: "텀블러",
    quantity: 1,
    price: 20000,
    orderStatus: "결제완료",
    deliveryStatus: "배송완료",
    cancellationRequested: "아니오",
  },
  {
    orderNumber: "003",
    orderDate: "2023-07-03",
    productName: "케냐 AA 키암부",
    options: "여과지",
    quantity: 3,
    price: 30000,
    orderStatus: "결제완료",
    deliveryStatus: "배송중",
    cancellationRequested: "아니오",
  },
  {
    orderNumber: "004",
    orderDate: "2023-07-06",
    productName: "콜롬비아 ",
    options: "빨대",
    quantity: 2,
    price: 15000,
    orderStatus: "결제완료",
    deliveryStatus: "배송준비중",
    cancellationRequested: "아니오",
  },
]; //모든 주문 목록 (임시)
//추후 fetch로 바꿔야 할 듯?
function clickSearchBtn() {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const orders = getOrdersByDateRange(startDate, endDate);
  //기간에 맞는 order 배열
  displayOrders(orders);
} //조회 날짜별 검색

function getOrdersByDateRange(startDate, endDate) {
  const filteredOrders = allOrders.filter(function (order) {
    return order.orderDate >= startDate && order.orderDate <= endDate;
  });

  return filteredOrders;
} // input으로 기간 입력받아서 모든 주문 목록에서 기간에 맞는 필터함수 사용

function displayOrders(orders) {
  //기간에 맞는 order 배열입력받음
  const reverseOrders = orders.reverse();
  const emptyOrder = document.querySelector(".emptyOrder");
  const button = document.createElement("input");
  button.type = "button";
  button.className = "cancleBtn";
  button.value = "주문 취소";

  //취소버튼 생성
  const orderRows = orders
    .map((order) => {
      const deliveryStatusCell =
        order.deliveryStatus === "배송준비중" ? button.outerHTML : "-";
      //배송준비중 일 때만 취소버튼 생성 취소버튼 구현은 다음에
      return `
      <tr>
        <td>${order.orderNumber}</td>
        <td>${order.orderDate}</td>
        <td>${order.productName} <br> (${order.options})</td>
        <td>${order.quantity}</td>
        <td>${order.price}</td>
        <td>${order.orderStatus}</td>
        <td>${order.deliveryStatus}</td>
        <td>${deliveryStatusCell}</td>
      </tr>
    `; //테이블 양식에 맞춰 넣어주기
    })
    .join("");
  if (!orders.length == 0) {
    emptyOrder.classList.add("clicked");
  }
  if (orders.length == 0 && emptyOrder.classList.contains("clicked")) {
    emptyOrder.classList.remove("clicked");
  }
  // 주문 내역 여부에 따라서 class 추가해서 주문 내역이 없습니다 안내 여부 판단
  document.getElementById("order-rows").innerHTML = orderRows;
}

//조회 기간 버튼 - 오늘
function dateChangeToday() {
  const today = new Date().toISOString().split("T")[0];
  //Date 쪼개기
  document.getElementById("start-date").value = today;
  document.getElementById("end-date").value = today;
  resetButtonStyles();
  btnToday.style.backgroundColor = "#288341";
  btnToday.style.color = "white";
}

//조회 기간 버튼 - 7일
function dateChangeWeek() {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  )
    .toISOString()
    .split("T")[0];
  const endDate = today.toISOString().split("T")[0];
  document.getElementById("start-date").value = startDate;
  document.getElementById("end-date").value = endDate;
  resetButtonStyles();
  btnWeek.style.backgroundColor = "#288341";
  btnWeek.style.color = "white";
}

//조회 기간 버튼 - 1개월
function dateChangeMonth() {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate() + 1
  )
    .toISOString()
    .split("T")[0];
  const endDate = today.toISOString().split("T")[0];
  document.getElementById("start-date").value = startDate;
  document.getElementById("end-date").value = endDate;
  resetButtonStyles();
  btnMonth.style.backgroundColor = "#288341";
  btnMonth.style.color = "white";
}

//조회 기간 버튼 - 3개월
function dateChange3Month() {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate() + 1
  )
    .toISOString()
    .split("T")[0];
  const endDate = today.toISOString().split("T")[0];
  document.getElementById("start-date").value = startDate;
  document.getElementById("end-date").value = endDate;
  resetButtonStyles();
  btn3Month.style.backgroundColor = "#288341";
  btn3Month.style.color = "white";
}

//조회 기간 버튼 - 1년
function dateChangeYear() {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear() - 1,
    today.getMonth() + 1,
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const endDate = today.toISOString().split("T")[0];
  document.getElementById("start-date").value = startDate;
  document.getElementById("end-date").value = endDate;
  resetButtonStyles();
  btnYear.style.backgroundColor = "#288341";
  btnYear.style.color = "white";
}
//버튼 클릭시 모든 버튼 배경색 흰색, 글꼴 검정으로 초기화하는 함수
function resetButtonStyles() {
  btnToday.style.backgroundColor = "#fff";
  btnWeek.style.backgroundColor = "#fff";
  btnMonth.style.backgroundColor = "#fff";
  btn3Month.style.backgroundColor = "#fff";
  btnYear.style.backgroundColor = "#fff";
  btnToday.style.color = "black";
  btnWeek.style.color = "black";
  btnMonth.style.color = "black";
  btn3Month.style.color = "black";
  btnYear.style.color = "black";
}
const searchBtn = document.getElementById("search-button");
const btnToday = document.getElementById("btnToday");
const btnWeek = document.getElementById("btnWeek");
const btnMonth = document.getElementById("btnMonth");
const btn3Month = document.getElementById("btn3Month");
const btnYear = document.getElementById("btnYear");

searchBtn.addEventListener("click", clickSearchBtn); //조회 버튼 클릭 이벤트 등록
btnToday.addEventListener("click", dateChangeToday); //오늘 버튼 클릭 이벤트 등록
btnWeek.addEventListener("click", dateChangeWeek); //7일 버튼 클릭 이벤트 등록
btnMonth.addEventListener("click", dateChangeMonth); //1개월 버튼 클릭 이벤트 등록
btn3Month.addEventListener("click", dateChange3Month); //3개월 버튼 클릭 이벤트 등록
btnYear.addEventListener("click", dateChangeYear); //1년 버튼 클릭 이벤트 등록
