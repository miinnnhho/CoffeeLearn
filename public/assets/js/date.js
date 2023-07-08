const userId = document.getElementById("id");
const userPw = document.getElementById("pw");
const userPwCheck = document.getElementById("pwCheck");
const userName = document.getElementById("name");
const userPhone_number = document.getElementById("phoneNumber");
const userAddress = document.getElementById("address");
const userdetailedAddress = document.getElementById("detailedAddress");
const submitBtn = document.querySelector(".btn1");

submitBtn.addEventListener("click", register);

function register() {
  const req = {
    id: userId.value,
    password: userPw.value,
    passwordCheck: userPwCheck.value,
    name: userName.value,
    phone: userPhone_number.value,
    addr: userAddress.value,
    detail_addr: userdetailedAddress.value,

  };
  console.log(req);
//   fetch("/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(req),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       if (res.success) {
//         location.href = "/"; //성공하면 finish_signup으로 이동
//       } else {
//         alert(res.msg);
//       }
//     })
//     .catch((err) => {
//       console.error("회원가입 중 에러 발생");
//     });
}
