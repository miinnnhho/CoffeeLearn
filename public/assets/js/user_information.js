async function fetchUserInfo() {
    const response = await fetch('/users/mypage', { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const userInfo = await response.json();
        // 사용자 정보를 input 필드에 채우기
        fillUserInfo(userInfo);
    } else {
        console.error('서버로부터 사용자 정보를 가져오는 데 실패했습니다.');
    }
}

function fillUserInfo(userInfo) {
    document.getElementById("id").value = userInfo.id;
    document.getElementById("pw").value = userInfo.pw;
    document.getElementById("pwCheck").value = userInfo.pw;
    document.getElementById("phoneNumber").value = userInfo.phoneNumber;
    document.getElementById("name").value = userInfo.name;
    document.getElementById("address").value = userInfo.address;
    document.getElementById("detailedAddress").value = userInfo.detailedAddress;
}
