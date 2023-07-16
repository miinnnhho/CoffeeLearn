//입력하지 않으면 붉은 글씨로 변하면서 흔들림 효과
let id = $("#id");
let pw = $("#pw");
let pwCheck = $("#pwCheck");
let phoneNumber = $("#phoneNumber");
let address = $("#address");
let detailedAddress = $("#detailedAddress");
let btn = $(".btn1");

$(btn).on("click", function () {
  if ($(id).val() == "") {
    $(id).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(pw).val() == "") {
    $(pw).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(pwCheck).val() == "") {
    $(pwCheck).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(phoneNumber).val() == "") {
    $(phoneNumber).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(address).val() == "") {
    $(address).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(detailedAddress).val() == "") {
    $(detailedAddress).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  }
});


// 각 입력폼 중 입력하지 않은 값이 있으면 붉은 글씨가 흔들리며 경고창을 띄워줌