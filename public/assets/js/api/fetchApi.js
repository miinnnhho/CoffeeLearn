function fetchApi(path, params) {
    const token = localStorage.getItem('token');
    const URL = 'http://kdt-sw-5-team07.elicecoding.com:3000';
    return fetch(`${URL}${path}`, {
        ...params,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ?? undefined,
            ...params.headers,
        },
        // body: JSON.stringify(loginData),
    });
}
