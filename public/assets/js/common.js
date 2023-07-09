// 페이지 로드 시 호출
window.onload = function () {
  setHeaderClass();
  setNav();
};

// 페이지에 경로에 따라 Header에 class 추가
function setHeaderClass() {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const header = document.getElementById('header');

  if (path.includes('/items') || path.includes('/admin') || searchParams.toString() !== '') {
    const className = path.substr(1).split('?')[0] + '-header';
    header.classList.add(className);
  }
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
