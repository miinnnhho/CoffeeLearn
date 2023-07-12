async function getAPI(url) {
    const res = await fetch(url, {
        method: 'POST',
        body: dataJson,
    });
    if (!res.ok) {
        alert('에러가 발생했습니다.');
        return;
    }
    return res.json();
}

// async function getAPI(url, params) {
//     return fetch(url, {
//         method: 'POST',
//         ...params,
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 alert('에러가 발생했습니다.');
//             }
//             return response.json();
//         })
//         .then((json) => {
//             console.log(json);
//         })
//         .catch((error) => {
//             console.error('Error fetching product data:', error);
//         });
// }
