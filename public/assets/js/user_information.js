// const userEmail = document.querySelector('.user-email');
// const userPassword = document.querySelector('.user-password');
// const userName = document.querySelector('.user-name');
// const userPhone = document.querySelector('.user-phone');
// const userAddress = document.querySelector('.user-addr');

// const editBtn = document.querySelector('.edit-btn'); //수정 버튼
// const unsubscrib = document.querySelector('.unsubscrib'); // 탈퇴 버튼

// // 사용자 로그인 여부 확인 함수
// function isLoggedIn() {
//     // 로그인 상태 확인 방법에 따라 이 로직을 수정하세요
//     if (localStorage.getItem('token')) {
//         return true;
//     }
//     return false;
// }

// async function fetchUserInfo() {
//     if (isLoggedIn()) {
//         const response = await fetchApi('/users/mypage', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response) {
//             const userInfo = await response.json();
//             fillUserInfo(userInfo);
//         } else {
//             alert('서버로부터 사용자 정보를 가져오는 데 실패했습니다.');
//         }
//     } else {
//         alert('로그인이 되어있지 않습니다. 로그인 후 다시 시도해주세요.');
//         // 필요시 로그인 페이지로 리다이렉트 할 수 있습니다.
//     }
// }

// function fillUserInfo(userInfo) {
//     userEmail.textContent = userInfo.email; // <p>태그의 경우 텍스트 콘텐츠를 수정해야 합니다.
//     userPassword.textContent = userInfo.password; // <p>태그의 경우 텍스트 콘텐츠를 수정해야 합니다.
//     userName.value = userInfo.name;
//     userPhone.value = userInfo.phone;
//     userAddress.value = userInfo.address;
// }

// // 페이지 로드 시 사용자 정보 가져오기
// window.addEventListener('load', fetchUserInfo);

// // 수정완료 버튼 클릭 이벤트
// editBtn.addEventListener('click', async function () {
//     // 서버에 변경된 회원 정보를 보내줄 객체를 만듭니다.
//     const updatedUserInfo = {
//         email: userEmail.textContent,
//         password: userPassword.textContent,
//         name: userName.value,
//         phone: userPhone.value,
//         addr: userAddress.value,
//     };

//     // 서버에 수정된 회원 정보를 보내는 API 호출
//     const response = await fetchApi('/users/mypage', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedUserInfo),
//     });

//     if (response) {
//         alert('회원 정보가 성공적으로 수정되었습니다.');
//     } else {
//         alert('회원 정보 수정에 실패했습니다. 다시 시도해주세요.');
//     }
// });

// // 회원탈퇴 버튼 클릭 이벤트 (이전 로직에 맞춰서 수정되어야 함)
// unsubscrib.addEventListener('click', async function () {
//     if (confirm('정말로 탈퇴하시겠습니까?')) {
//         // 회원 탈퇴 API 호출 - 이전 로직에 맞춰서 수정되어야 함
//         const response = await fetchApi('/users/mypage', {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ _id: userInfo._id }),
//         });

//         if (response) {
//             alert('탈퇴가 완료되었습니다.');
//             // 로그아웃 및 메인 페이지로 이동
//             localStorage.removeItem('token');
//             window.location.href = '/';
//         } else {
//             alert('탈퇴에 실패했습니다. 다시 시도해주세요.');
//         }
//     }
// });
