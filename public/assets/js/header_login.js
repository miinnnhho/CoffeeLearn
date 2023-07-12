function checkLoginStatus() {
    const auth_btn = document.getElementById('authBtn'); //버튼
    const isLoggedIn = localStorage.getItem('authToken') !== null; //토큰이 있으면

    if (isLoggedIn) {
        auth_btn.textContent = '로그아웃'; //로그아웃로 글 변경
        auth_btn.onclick = () => { //클릭하면
            localStorage.removeItem('authToken'); //토큰 제거
            alert('로그아웃이 되었습니다.'); //알림
            checkLoginStatus();
        };
    } else {
        auth_btn.textContent = '로그인'; 
        auth_btn.onclick = () => {
            location.href = '/login';
        };
    }
}

window.addEventListener('load', () => {
    checkLoginStatus();
});
