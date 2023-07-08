function updateFieldsAndButton() {
  // 입력값 가져오기
  let id = document.getElementById("id").value;
  let pw = document.getElementById("pw").value;
  let pw_check = document.getElementById("pw_check").value;
  let phone_number = document.getElementById("phone_number").value;
  let username = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let detailed_address = document.getElementById("detailed_address").value;

  // 필드가 모두 채워졌는지 확인
  let allFieldsFilled =
    id &&
    pw &&
    pw_check &&
    phone_number &&
    username &&
    address &&
    detailed_address;

  // 결과 문자열 초기화
  let resultText = "";

  // 입력값 비교 후 결과 문자열 설정, 버튼 활성화/비활성화

  if (pw === pw_check && allFieldsFilled) {
    document.querySelector(".btn1").disabled = false; //둘 다 만족시
  } else if (pw !== pw_check) {
    resultText = "비밀번호가 일치하지 않습니다.";
    document.querySelector(".btn1").disabled = true; //비밀번호 틀릴시
  } else if (pw === pw_check) {
    // resultText = "비밀번호가 일치합니다.";
    document.querySelector(".btn1").disabled = true; //비밀번호 일치
  }
  // 결과 출력
  document.getElementById("result").innerText = resultText;
}
// ID, password, password check, phone number, name, address, detailed address 입력 필드 이벤트 리스너 추가
[
  "id",
  "pw",
  "pw_check",
  "phone_number",
  "name",
  "address",
  "detailed_address",
].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateFieldsAndButton);
});
// input1, input2 입력 필드 이벤트 리스너 추가
document.getElementById("pw").addEventListener("input", updateFieldsAndButton);
document
  .getElementById("pw_check")
  .addEventListener("input", updateFieldsAndButton);
// 버튼 초기 비활성화
document.querySelector(".btn1").disabled = true;
