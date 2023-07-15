function checkLoginStatus() {
    const auth_btn = document.querySelector('.authBtn'); //a tag
    const btn_span = document.querySelector('.btn-Span'); //버튼
    const isLoggedIn = localStorage.getItem('userId') !== null; //토큰이 있으면

    if (isLoggedIn) {
        btn_span.textContent = '로그아웃'; //로그아웃로 글 변경
        auth_btn.onclick = () => {
            //a태그전체 클릭하면
            localStorage.removeItem(''); //토큰 제거 -> 로그아웃
            alert('로그아웃이 되었습니다.'); //알림
            location.href = '/'; //홈으로 이동함
            checkLoginStatus();
        };
    } else {
        btn_span.textContent = '로그인';
        auth_btn.onclick = () => {
            //a태그전체 클릭하면
            location.href = '/login'; //login.html로 넘어감
        };
    }
}

window.addEventListener('load', () => {
    checkLoginStatus();
});
