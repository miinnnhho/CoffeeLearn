const orderList = document.querySelector('#orderList');

//리스트 불러오기
insertOrderElement();

async function insertOrderElement() {
    try {
        const res = await fetch('http://kdt-sw-5-team07.elicecoding.com:3000/admin/orders', {
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error('에러가 발생했습니다.');
        }
        const orders = await res.json();

        console.log(res);
        console.log(orders);

        orders.forEach((order) => {
            const orderNumber = order.id;
            const orderDate = order.reg_dt;
            const itemName = order.products;
            // const option = order.option;
            //const itemCount = order.count;
            //const price = order.price;
            const orderStatus = order.status;
            const user = order.User;

            orderList.insertAdjacentHTML(
                'beforeend',
                `
                <tbody>
                <tr>
                    <td class="order-number" rowspan="1">${orderNumber}</td>
                    <td class="order-date">${orderDate}</td>
                    <td class="user">${user}</td>
                    <td class="order-item">
                        <p class="item-name">${itemName}</p>
                        <p class="option">에스프레소머신용 분쇄</p>
                    </td>
                    <td class="item-count">1개</td>
                    <td class="price">5300원</td>
                    <td class="order-status">
                        <select>
                            <option value="1" selected>${orderStatus}</option>
                            <option value="2">상품준비중</option>
                            <option value="3">배송준비중</option>
                            <option value="4">배송완료</option>
                        </select>
                    </td>
                    <td class="cancel-button"><button id = "${orderNumber}">주문 취소</button></td>
                </tr>
            </tbody>
        `
            );
        });
        // 주문취소하기
        const cancelBtns = document.querySelectorAll('.cancel-button');
        console.log(cancelBtns);

        cancelBtns.forEach((cancelBtn) => {
            cancelBtn.addEventListener('click', async (e) => {
                const eventTarget = e.target;
                if (window.confirm('해당 주문을 취소하시겠습니까?')) {
                    eventTarget.parentNode.parentNode.remove();
                    const apiUrl = `http://kdt-sw-5-team07.elicecoding.com:3000/admin/orders${e.target._id}`;
                    const res = await fetch(apiUrl, {
                        method: 'DELETE',
                    });
                    if (!res.ok) {
                        throw new Error('주문 취소중 에러가 발생했습니다.');
                    }
                }
            });
        });
    } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다.');
    }
}
