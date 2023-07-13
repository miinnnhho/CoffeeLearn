/// 페이지 로드 시 호출
window.onload = function () {
    setHeaderClass();
    setNav();
    alertMessage()
    checkLoginStatus();
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
async function getProducts() {
    try {
        const response = await fetch('/assets/data/product_list.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function setNav() {
    const navList = document.getElementById('navList');
    navList.innerHTML = '';

    // 상품전체 li를 항상 먼저 추가한다.
    const allLi = `<li><a href="#">상품전체</a></li>`;

    // product_list.json에서 카테고리 이름을 가져온다.
    try {
        const data = await getProducts();
        const categories = Object.keys(data);

        // 최대 4개까지의 li를 추가한다.
        const categoryLis = categories
            .slice(0, 4)
            .map((category) => `<li><a href="#">${category}</a></li>`)
            .join('');

        // navList의 innerHTML에 상품전체 li와 카테고리 li들을 추가한다.
        navList.innerHTML = allLi + categoryLis;

        //li의 너비를 설정한다.
        const liWidth = navList.clientWidth / navList.childElementCount;
        const liElements = navList.querySelectorAll('li');
        liElements.forEach((li) => {
            li.style.width = `${liWidth}px`;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function checkLoginStatus() {
    const auth_btn = document.querySelector('.auth-btn'); //a tag
    const btn_span = document.querySelector('.btn-Span'); //버튼
    const isLoggedIn = localStorage.getItem('userId') !== null; //토큰이 있으면

    if (isLoggedIn) {
        btn_span.textContent = '로그아웃'; //로그아웃로 글 변경
        auth_btn.onclick = () => {
            //a태그전체 클릭하면
            localStorage.removeItem(''); //토큰 제거 -> 로그아웃
            alert('로그아웃이 되었습니다.'); //알림
            location.href = '/'; //홈으로 이동함
            checkLoginStatus();
        };
    } else {
        btn_span.textContent = '로그인';
        auth_btn.onclick = () => {
            //a태그전체 클릭하면
            location.href = 'login'; //login.html로 넘어감
        };
    }
  }
  window.addEventListener('load', () => {
      checkLoginStatus();
  });
