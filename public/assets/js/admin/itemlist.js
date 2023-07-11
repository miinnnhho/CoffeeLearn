const productList = document.querySelector('#productList');

//리스트 불러오기
insertProductElement();

async function insertProductElement() {
    const res = await fetch('http://localhost:3000/admin/product');
    const products = await res.json();

    console.log(res);
    console.log(products);

    products.forEach((product) => {
        const itemNumber = product._id;
        const categogyName = product.Category;
        const itemName = product.name;
        const itemPrice = product.price;

        productList.insertAdjacentHTML(
            'beforeend',
            `
            <tbody>
            <tr>
                <td>${itemNumber}</td>
                <td>${categogyName}</td>
                <td><a href="#">${itemName}</a></td>
                <td>${itemPrice}</td>
                <td><button id="${itemNumber}" class="delete-button">상품삭제</button></td>
            </tr>
        </tbody>
    `
        );
    });
}

//상품삭제하기

const deleteBtns = document.querySelectorAll('.delete-button');

deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', async (e) => {
        const eventTarget = e.target;
        if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
            eventTarget.parentNode.remove();
            const apiUrl = '';
            const res = await fetch(apiUrl, {
                method: 'Delete',
                body: { id: e.target.id },
            });
        }
    });
});


// 상품수정하기



