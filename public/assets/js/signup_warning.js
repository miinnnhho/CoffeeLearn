//입력하지 않으면 붉은 글씨로 변하면서 흔들림 효과
let id = $("#id");
let pw = $("#pw");
let pw_check = $("#pw_check");
let phone_number = $("#phone_number");
let address = $("#address");
let detailed_address = $("#detailed_address");
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
  } else if ($(pw_check).val() == "") {
    $(pw_check).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(phone_number).val() == "") {
    $(phone_number).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(address).val() == "") {
    $(address).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  } else if ($(detailed_address).val() == "") {
    $(detailed_address).next("label").addClass("warning");
    setTimeout(function () {
      $("label").removeClass("warning");
    }, 1500);
  }
});


// 각 입력폼 중 입력하지 않은 값이 있으면 붉은 글씨가 흔들리며 경고창을 띄워줌