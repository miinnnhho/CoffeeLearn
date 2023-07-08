const userId = document.getElementById("id");
const userPw = document.getElementById("pw");
// const userPwCheck = document.getElementById("pw_check").value;
const userAddress = document.getElementById("address");
const userName = document.getElementById("name");
const userPhone_number = document.getElementById("phone_number");
const detailedAddress = document.getElementById("detailed_address");
const submitbtn = document.querySelector(".btn1");

submitbtn.addEventListener("click", register);

function register() {
  const req = {
    user_id: userId.value,
    password: userPw.value,
    name: userName.value,
    phone: userPhone_number.value,
    addr: userAddress.value,
    detailedAddress: detailedAddress.value,

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
//         location.href = "/login"; //성공하면 login으로 이동
//       } else {
//         alert(res.msg);
//       }
//     })
//     .catch((err) => {
//       console.error("회원가입 중 에러 발생");
//     });
}
