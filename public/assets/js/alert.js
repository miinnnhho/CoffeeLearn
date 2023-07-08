//입력하지 않으면 붉은 글씨로 변하면서 흔들림 효과
let id = $("#id");
let pw = $("#pw");
let btn = $(".btn1");

$(btn).on("click", function () {
  if ($(id).val() == "") {
    $(id).next("label").addClass("warning");
    //label을 선택하고 warning class 추가
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(pw).val() == "") {
    $(pw).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  }
});
