/// 페이지 로드 시 호출
window.onload = function () {
  setHeaderClass();
  alertMessage();
};

// 페이지에 경로에 따라 Header에 class 추가
function setHeaderClass() {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const header = document.getElementById('header');

  if (path.includes('/items') || path.includes('/admin') || searchParams.toString() !== '') {
    const className = path.slice(1).split('?')[0] + '-header'; // Replaced substr with slice
    header.classList.add(className);
  }
}

// 기능 준비중 메세지 alert
function alertMessage() {
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    alert('☕ 상품 검색 기능 준비중입니다.');
  });
}
