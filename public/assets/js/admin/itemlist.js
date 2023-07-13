const productList = document.querySelector('#productList');

//리스트 불러오기
insertProductElement();

async function insertProductElement() {
    try {
        const res = await fetch('/assets/data/products.json', {
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error('에러가 발생했습니다.');
        }
        const products = await res.json();

        console.log(res);
        console.log(products);

        products.forEach((product) => {
            const productNumber = product.id;
            const categoryName = product.category;
            const productName = product.name;
            const productPrice = product.price;

            productList.insertAdjacentHTML(
                'beforeend',
                `
        <tbody>
            <tr>
                <td>${productNumber}</td>
                <td>${categoryName}</td>
                <td><a href="#" class="product-name" style="text-decoration:underline">${productName}</a></td>
                <td>${productPrice}</td>
                <td><button id="${productNumber}" class="delete-button">상품삭제</button></td>
            </tr>
        </tbody>
        `
            );
        });

        // 상품삭제하기
        const deleteBtns = document.querySelectorAll('.delete-button');
        console.log(deleteBtns);

        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', async (e) => {
                const eventTarget = e.target;
                if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
                    eventTarget.parentNode.parentNode.remove();
                    const apiUrl = `/api/products/${e.target.id}`;
                    const res = await fetch(apiUrl, {
                        method: 'DELETE',
                    });
                    if (!res.ok) {
                        throw new Error('상품 삭제 중 에러가 발생했습니다.');
                    }
                }
            });
        });

        const productNames = document.querySelectorAll('.product-name');

        productNames.forEach((productName) => {
            productName.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.target.getAttribute('data-id');
                // 상품 고유 식별자(ID) 가져오기
                // 제품 상세 정보 페이지로 이동하는 코드 작성
                window.location.href = `products/${productId}`;
            });
        });
    } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다.');
    }
}
