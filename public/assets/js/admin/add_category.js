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

    const apiUrl = 'http://localhost:3000/admin/products';

    const res = await fetch(apiUrl, {
        method: 'POST',
        body: dataJson,
    });

    if (!res.ok) {
        alert('에러가 발생했습니다.');
        return;
    }

    const result = await res.json();
    console.log(result);
});
