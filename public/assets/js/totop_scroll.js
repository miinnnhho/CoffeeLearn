/* SCROLL TO TOP */
const toTopEl = document.querySelector('#to-top');
console.log(toTopEl);
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
  console.log('adf');
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});
