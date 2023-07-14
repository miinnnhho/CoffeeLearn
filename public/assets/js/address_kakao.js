window.onload = function () {
  document.querySelector(".addr-btn").addEventListener("click", function () {
    //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
      oncomplete: function (data) {
        //선택시 입력값 세팅
        document.getElementById("address").value = data.address; // 주소 넣기
        document.querySelector("input[name=detailedAddress]").focus(); //상세입력 포커싱
      },
    }).open();
  });
};

