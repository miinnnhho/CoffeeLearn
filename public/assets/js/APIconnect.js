getAPI('/assets/data/order.json')
    .then((data) => {
        // 데이터 처리
        console.log('data:', data);
    })
    .catch((error) => {
        // 에러 처리
    });
