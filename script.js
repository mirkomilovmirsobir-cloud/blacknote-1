// Инициализируем корзину из localStorage или создаем пустой массив
let cart = JSON.parse(localStorage.getItem('my_shopping_cart')) || [];

// Функция для сохранения корзины в память браузера
function saveCart() {
    localStorage.setItem('my_shopping_cart', JSON.stringify(cart));
}

// Функция для отображения содержимого корзины на экране
function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (x${item.count})</span>
            <span>${item.price * item.count} руб.</span>
        `;
        cartItemsElement.appendChild(li);
        total += item.price * item.count;
    });

    totalPriceElement.innerText = total.toLocaleString('ru-RU');
}

// Слушатель кликов на кнопки "В корзину"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const id = productCard.dataset.id;
        const name = productCard.dataset.name;
        const price = parseInt(productCard.dataset.price);

        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.count++;
        } else {
            cart.push({ id, name, price, count: 1 });
        }

        saveCart();
        renderCart();
    });
});

// Слушатель кнопки "Очистить корзину"
document.getElementById('clear-cart-btn').addEventListener('click', () => {
    cart = [];
    saveCart();
    renderCart();
});

// Первичный вывод корзины при загрузке страницы
renderCart();
