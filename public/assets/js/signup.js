const userId = document.getElementById('id');
const userPw = document.getElementById('pw');
// const userPwCheck = document.getElementById('pwCheck');
const userName = document.getElementById('name');
const userPhone_number = document.getElementById('phoneNumber');
const userAddress = document.getElementById('address');
const userdetailedAddress = document.getElementById('detailedAddress');

const submitBtn = document.querySelector('.btn1');

// submitBtn.addEventListener('click', register);

// async function register() {
// const req = {
//     email: userId.value,
//     password: userPw.value,
//     // passwordCheck: userPwCheck.value, 필요없으면 빼기
//     name: userName.value,
//     phone: userPhone_number.value,
//     addr: userAddress.value + ' ' + userdetailedAddress.value,
// };
// console.log(req);
//     try {
//         const responce = await fetch('/user/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(req), //{ email, password, name, phone, addr }
//         });
//         // .then((res) => res.json())
//         // .then((res) => {
//         const data = await responce.json();

//         if (data.success) {
//             localStorage.setItem('userId', JSON.stringify(req));
//             location.href = 'finish_signup'; //성공하면 finish_signup으로 이동
//         } else {
//             alert(data.msg);
//         }
//     } catch (err) {
//         console.error('회원가입 중 에러 발생');
//         alert('회원가입 중 에러 발생');
//     }
// }




// 이거로 로컬에 회원가입정보 들어가는건 확인함
submitBtn.addEventListener('click', function () {
    const req = {
        email: userId.value,
        password: userPw.value,
        // passwordCheck: userPwCheck.value, 필요없으면 빼기
        name: userName.value,
        phone: userPhone_number.value,
        addr: userAddress.value + ' ' + userdetailedAddress.value,
    };
    console.log(req);
    localStorage.setItem('userId', JSON.stringify(req));
    location.href = 'finish_signup';
});
