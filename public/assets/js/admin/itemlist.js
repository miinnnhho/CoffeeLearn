const productList = document.querySelector('#productList');

//리스트 불러오기
insertProductElement();

async function insertProductElement() {
    try {
        const res = await fetch('http://kdt-sw-5-team07.elicecoding.com:3000/products', {
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error('에러가 발생했습니다.');
        }
        const products = await res.json();

        console.log(res);
        console.log(products);

        products.forEach((product) => {
            const productNumber = product._id;
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
                <td><a href="#" class="product-name" data-product-id="${productNumber}" style="text-decoration: underline">${productName}</a></td>
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

                const token = localStorage.getItem('token');
                console.log(token);

                if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
                    const productNumber = eventTarget.id;
                    const apiUrl = `http://kdt-sw-5-team07.elicecoding.com:3000/products/admin/${productNumber}`;

                    const res = await fetch(apiUrl, {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!res.ok) {
                        throw new Error('상품 삭제 중 에러가 발생했습니다.');
                    }
                    eventTarget.parentNode.parentNode.remove();
                }
            });
        });

        //상품 상세페이지 이동

        const productNames = document.querySelectorAll('.product-name');
        console.log(productNames);

        productNames.forEach((productLink) => {
            productLink.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.target.dataset.productId; // 상품 아이디 가져오기
                const url = `/admin/productdetails/${productId}`; // 상세 페이지 URL 생성
                window.location.href = url; // 상세 페이지로 이동
            });
        });
    } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다.');
    }
}
