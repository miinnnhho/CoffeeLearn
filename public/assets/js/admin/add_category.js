// 입력된 내용 서버로 전송
const categoryName = document.querySelector('.category-name');
const categoryDescription = document.querySelector('.category-description');
const form = document.querySelector('#addCategoryForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = categoryName.value;
    const description = categoryDescription.value;

    const category = {
        name,
        description,
    };

    const dataJson = JSON.stringify(category);

    const token = localStorage.getItem('token');
    console.log(token);

    const apiUrl = 'http://kdt-sw-5-team07.elicecoding.com:3000/categories/admin';

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: dataJson,
    });

    if (!res.ok) {
        alert('에러가 발생했습니다.');
        return;
    }

    const result = await res.json();
    console.log(result);
});
