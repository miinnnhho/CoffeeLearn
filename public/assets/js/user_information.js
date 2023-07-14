const userId = document.getElementById('id');
const userPw = document.getElementById('pw');
const userPwCheck = document.getElementById('pwCheck');
const userName = document.getElementById('name');
const userPhone_number = document.getElementById('phoneNumber');
const userAddress = document.getElementById('address');
const userdetailedAddress = document.getElementById('detailedAddress');


async function fetchUserInfo() {
    const response = await fetch('http://kdt-sw-5-team07.elicecoding.com:3000/users/mypage', { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response) {
        const userInfo = await response.json();
        // 사용자 정보를 input 필드에 채우기
        fillUserInfo(userInfo);
    } else {
        alert('서버로부터 사용자 정보를 가져오는 데 실패했습니다.');
    }
}

function fillUserInfo(userInfo) {
    userId.value = userInfo.id;
    userPw.value = userInfo.pw;
    userPhone_number.value = userInfo.phoneNumber;
    userName.value = userInfo.name;
    userAddress.value = userInfo.address;
    userdetailedAddress.value = userInfo.detailedAddress;
}
