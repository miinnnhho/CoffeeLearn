// Tab 메뉴 클릭에 따른 내용 변경
tabMenus.forEach(function(menu, index) {
    menu.addEventListener('click', function() {
      // css 처리를 위한 on 클래스 모두 제거
      tabCons.forEach(function(tabCon) {
        tabCon.classList.remove('on');
      });
  
      // 해당하는 contents에만 on 클래스 추가
      const conNumber = index + 1;
      const targetTabCon = document.querySelector('.tab-con.con' + conNumber);
      targetTabCon.classList.add('on');
    });
});
  
window.onload = function () {
    handleTabMenuClick();
  };