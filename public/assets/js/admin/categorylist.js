const categoryList = document.querySelector('#categoryList');

//리스트 불러오기
insertCategoryElement();

async function insertCategoryElement() {
    try {
        const res = await fetch('/assets/data/categories.json');
        if (!res.ok) {
            throw new Error('에러가 발생했습니다.');
        }
        const categories = await res.json();

        console.log(res);
        console.log(categories);

        categories.forEach((category) => {
            const categoryNumber = category.id;
            const categoryName = category.name;
            const categoryDescription = category.description;

            categoryList.insertAdjacentHTML(
                'beforeend',
                `
                <tbody>
                <tr>
                    <td class="category-number">${categoryNumber}</td>
                    <td class="category-name">
                        <a href="#" style = "text-decoration:underline">${categoryName}</a>
                    </td>
                    <td class="category-description">${categoryDescription}</td>
                    <td><button class="delete-button">삭제</button></td>
                </tr>
            </tbody>
        `
            );
        });

        // 카테고리 삭제하기
        const deleteBtns = document.querySelectorAll('.delete-button');
        console.log(deleteBtns);

        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', async (e) => {
                const eventTarget = e.target;
                if (window.confirm('해당 카테고리를 삭제하시겠습니까?')) {
                    eventTarget.parentNode.parentNode.remove();
                    const apiUrl = `/api/products/${e.target.id}`;
                    const res = await fetch(apiUrl, {
                        method: 'DELETE',
                    });
                    if (!res.ok) {
                        throw new Error('카테고리 삭제 중 에러가 발생했습니다.');
                    }
                }
            });
        });
    } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다.');
    }
}
