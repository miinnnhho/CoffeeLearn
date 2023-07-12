const productList = document.querySelector('#productList');

//리스트 불러오기
insertProductElement();

async function insertProductElement() {
    try {
        const res = await fetch('/assets/data/products.json');
        if (!res.ok) {
            throw new Error('에러가 발생했습니다.');
        }
        const products = await res.json();

        console.log(res);
        console.log(products);

        products.forEach((product) => {
            const itemNumber = product.id;
            const categoryName = product.category;
            const itemName = product.name;
            const itemPrice = product.price;

            productList.insertAdjacentHTML(
                'beforeend',
                `
        <tbody>
            <tr>
                <td>${itemNumber}</td>
                <td>${categoryName}</td>
                <td><a href="#" class="update-product">${itemName}</a></td>
                <td>${itemPrice}</td>
                <td><button id="${itemNumber}" class="delete-button">상품삭제</button></td>
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
    } catch (error) {
        console.error(error);
        alert('에러가 발생했습니다.');
    }
}

//상품수정하기

//상품정보 모달 불러오기
const modal = `
<div id="modalBox">
            <form id="addItemForm" method="get">
                <ul>
                    <li>
                        <label>카테고리 선택</label>
                        <select class="select-categogy">
                            <option value="">카테고리 선택</option>
                            <option value="커피">커피</option>
                            <option value="선물세트">선물세트</option>
                        </select>
                    </li>
                    <li>
                        <label>맛선택</label>
                        <select class="select-taste" disabled>
                            <option value="">선택하세요</option>
                            <option value="달콤/쌉싸름">달콤/쌉싸름</option>
                            <option value="고소함/구수함">고소함/구수함</option>
                            <option value="묵직하고 달콤한 여운">묵직하고 달콤한 여운</option>
                            <option value="은은하고 편안함">은은하고 편안함</option>
                            <option value="상큼한 산미와 향">상큼한 산미와 향</option>
                        </select>
                    </li>
                    <li>
                        <label>원산지선택</label>
                        <select class="select-origin" disabled>
                            <option value="">선택하세요</option>
                            <option value="아시아/태평양">아시아/태평양</option>
                            <option value="중남미">중남미</option>
                            <option value="아프리카">아프리카</option>
                            <option value="블렌드">블렌드</option>
                        </select>
                    </li>

                    <li>
                        <label>상품명</label>
                        <input type="text" class="input-name" />
                    </li>
                    <li>
                        <label>가격</label>
                        <input type="number" class="input-price" />
                    </li>
                    <li>
                        <label>수량</label>
                        <input type="number" class="input-amount" />
                    </li>
                    <li>
                        <label>이미지</label>
                        <input type="file" class="input-main-img" />
                    </li>
                    <li>
                        <label>설명(이미지)</label>
                        <input type="file" class="input-sub-img" />
                    </li>
                    <li>
                        <label>설명</label>
                        <input type="text" class="input-description" />
                    </li>
                    <li>
                        <label>상품노출</label>
                        <select class="select-show">
                            <option value="예">예</option>
                            <option value="아니오">아니오</option>
                        </select>
                    </li>
                </ul>
                <div class="submit-button">
                    <button><a href="/admin/product">목록으로</a></button>
                    <button type="submit" class="save-button">저장하기</button>
                </div>
            </form>
        </div>
`;

const updateBtn = document.querySelector('.update-product');
