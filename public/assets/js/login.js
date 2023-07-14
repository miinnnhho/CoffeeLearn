const useremail = document.getElementById('id');
const userpassword = document.getElementById('pw');
const loginBtn = document.querySelector('.btn1');

window.addEventListener('load', () => {
    checkLoginStatus();
});

//로그인
window.handleLoginSubmit = function (event) {
    event.preventDefault();

    const loginData = {
        email: useremail.value,
        password: userpassword.value,
    };

    // 로그인 API 호출 예시
    fetchApi('/users/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then((data) => {
            if (data.token) {
                // 로그인 성공 후 처리
                localStorage.setItem('token', data.token);
                window.location.href = '/'; //홈으로 이동
                checkLoginStatus();
            }
        })
        .catch((error) => {
            // 로그인 실패 처리
            console.error(error);
            alert('e-mail 혹은 비밀번호를 재확인해 주세요.');
        });

    // fetchApi('/users/login', {
    //     method: 'POST',
    //     body: JSON.stringify(loginData),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         if (data.token) {
    //             // 로그인 성공 후 처리
    //             localStorage.setItem('token', data.token);
    //             window.location.href = '/'; //홈으로 이동
    //         } else {
    //             // 로그인 실패 처리
    //             alert('회원정보를 찾을 수 없습니다.');
    //         }
    //     });

    // //로그인시 로그인 버튼 -> 로그아웃 버튼으로 변함(반대도)
    // document.addEventListener('DOMContentLoaded', function () {
    //     const loginBtn = document.getElementById('loginBtn');
    //     const logoutBtn = document.getElementById('logoutBtn');

    //     const token = localStorage.getItem('token');

    //     if (token) {
    //         // 로그인 상태일 때
    //         loginBtn.style.display = 'none';
    //         logoutBtn.style.display = 'block';
    //     } else {
    //         // 로그아웃 상태일 때
    //         loginBtn.style.display = 'block';
    //         logoutBtn.style.display = 'none';
    //     }
    // });
    //로그아웃 처리
    function logout() {
        localStorage.removeItem('token');
        // 로그아웃 후 메인 페이지 새로고침 또는 이동
        window.location.reload();
    }

    // unsubscrib.addEventListener('click', logout);
};

// get API 만들어서 패치를 사용하는데 로컬에서 꺼내서 쓰지 않도록 항상 나오게?
// 관리자로그인 들어가면 admin/product로 연결되게?
