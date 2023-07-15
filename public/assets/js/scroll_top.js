/* SCROLL TO TOP */
const toTopEl = document.querySelector('#to-top');
toTopEl.style.opacity = '0'; // 탑 버튼 숨김

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    gsap.to(toTopEl, 0.5, {
      opacity: 1, // 스크롤 위치가 600 이상이면 탑 버튼을 표시
    });
  } else {
    gsap.to(toTopEl, 0.5, {
      opacity: 0, // 스크롤 위치가 600 미만이면 탑 버튼을 숨김
    });
  }
  toTopEl.classList.remove('on');
});

toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});
