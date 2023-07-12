const email = document.getElementById('id').value;
const password = document.getElementById('pw').value;
const loginBtn = document.getElementById('pw').value;
const loginData = {
    email: email,
    password: password,
};
window.handleLoginSubmit = function (event) {
    event.preventDefault();

    // 로그인 API 호출 예시
    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // 로그인 성공 후 처리
                localStorage.setItem('token', data.token);
                window.location.href = '/'; //홈으로 이동
            } else {
                // 로그인 실패 처리
                console.error('로그인 실패:', error.message);
                alert('등록되지 않은 e-mail 이거나 비밀번호가 일치하지 않습니다');
            }
        });

    //로그인시 로그인 버튼 -> 로그아웃 버튼으로 변함(반대도)
    document.addEventListener('DOMContentLoaded', function () {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        const token = localStorage.getItem('token');

        if (token) {
            // 로그인 상태일 때
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            // 로그아웃 상태일 때
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    });
    //로그아웃 처리
    function logout() {
        localStorage.removeItem('token');
        // 로그아웃 후 메인 페이지 새로고침 또는 이동
        window.location.reload();
    }

    logoutBtn.addEventListener('click', logout);
};
