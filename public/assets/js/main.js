// Youtube Video
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
  new YT.Player('player', {
    videoId: 'tpHjY4_XvO8',
    playerVars: {
      autoplay: true,
      loop: true,
      playlist: 'tpHjY4_XvO8',
    },
    events: {
      onReady: function (event) {
        event.target.mute();
      },
    },
  });
}

// Pick Swiper
new Swiper('.pick-swiper', {
  slidesPerView: 6,
  spaceBetween: 10,
});

// Gift Swiper
new Swiper('.gift-swiper', {
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.gift .swiper-pagination',
    clickable: true,
  },
  navigation: {
    prevEl: '.gift .swiper-prev',
    nextEl: '.gift .swiper-next',
  },
});
