const userId = document.getElementById('id');
const userPw = document.getElementById('pw');
// const userPwCheck = document.getElementById('pwCheck');
const userName = document.getElementById('name');
const userPhone_number = document.getElementById('phoneNumber');
const userAddress = document.getElementById('address');
const userdetailedAddress = document.getElementById('detailedAddress');
const submitBtn = document.querySelector('.btn1');

submitBtn.addEventListener('click', register);

function register() {
    const req = {
        email: userId.value,
        password: userPw.value,
        // passwordCheck: userPwCheck.value, 필요없으면 빼기
        name: userName.value,
        phone: userPhone_number.value,
        addr: userAddress.value + ' ' + userdetailedAddress.value,
    };
    console.log(req);
    fetch('/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = 'finish_signup'; //성공하면 finish_signup으로 이동
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error('회원가입 중 에러 발생');
            alert('회원가입 중 에러 발생');
        });
}
