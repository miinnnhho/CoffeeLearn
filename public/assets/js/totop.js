/* SCROLL TO TOP */
const toTopEl = document.querySelector('#to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 700) {
    gsap.to(toTopEl, 0.5, {
      x: 0,
    });
  } else {
    gsap.to(toTopEl, 0.5, {
      x: 100,
    });
  }
});

toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});
