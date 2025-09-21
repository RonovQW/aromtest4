// Добавим в начало файла переменные для touch-жестов
let touchStartX = 0;
let touchEndX = 0;

const perfumes = [
    {
        name: "Louis Vuitton Ombre Nomade",
        brand: "Louis Vuitton",
        price: "2 000 ₽",
        stock: 5,
        notes: "Герань, янтарь, шафран",
        description: "Восточно-древесный унисекс-аромат, композиция из герани, янтаря и шафрана.",
        image: "https://placehold.co/300x400/333333/FFFFFF?text=Ombre+Nomade",
        volume: "30ml"
    },
    {
        name: "Louis Vuitton L’Immensité",
        brand: "Louis Vuitton",
        price: "2 000 ₽",
        stock: 1,
        notes: "Грейпфрут, имбирь, бергамот",
        description: "Восточно-пряный мужской аромат, верхние нотки: грейпфрут, имбирь, бергамот.",
        image: "https://placehold.co/300x400/333333/FFFFFF?text=L%27Immensit%C3%A9",
        volume: "30ml"
    },
    {
        name: "Sospiro Accento",
        brand: "Sospiro",
        price: "1 700 ₽",
        stock: 0,
        notes: "Древесные, цветочные, фруктовые",
        description: "Древесный ориентальный, с вкраплениями свежих, цветочно-фруктовых оттенков.",
        image: "https://placehold.co/300x400/333333/FFFFFF?text=Accento",
        volume: "30ml"
    },
    {
        name: "Nasomatto Black Afgano",
        brand: "Nasomatto",
        price: "1 700 ₽",
        stock: 1,
        notes: "Удовая древесина, кожа, кофе",
        description: "Композиция: удовая древесина, кожа, крепкий кофе.",
        image: "https://placehold.co/300x400/333333/FFFFFF?text=Black+Afgano",
        volume: "30ml"
    },
    {
        name: "Hermes Terre d'Hermes",
        brand: "Hermes",
        price: "2 300 ₽",
        stock: 1,
        notes: "Грейпфрут, минералы, апельсин, роза, атласский кедр, перец, герань",
        description: "Раскрывается ароматами грейпфрута, минералов и апельсина. Роза, атласский кедр, перец и герань в «сердце» аромата.",
        image: "https://placehold.co/300x400/333333/FFFFFF?text=Terre+d%27Hermes",
        volume: "30ml"
    },
    {
        name: "Ajmal Amber Wood",
        brand: "Ajmal",
        price: "1 700 ₽",
        stock: 3,
        notes: "Яблоко, перечная мята, кардамон, лаванда, кедр, ирис",
        description: "Древесные оттенки, яблочные ноты, перец, кардамон, лаванда, кедр, корень ириса.",
        image: "https://placehold.co/300x400/333333/FFFFFF?text=Amber+Wood",
        volume: "30ml"
    }
];

// Функция для инициализации touch-жестов
function initTouchGestures() {
    const cards = document.querySelectorAll('.perfume-card');
    
    cards.forEach(card => {
        // Touch события для свайпа
        card.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        card.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(card);
        }, { passive: true });
        
        // Двойной тап для быстрого просмотра
        let lastTap = 0;
        card.addEventListener('touchend', e => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                // Двойной тап - открываем модальное окно
                const perfumeId = parseInt(card.dataset.id);
                if (!isNaN(perfumeId) && perfumeId >= 0 && perfumeId < perfumes.length) {
                    showModal(perfumes[perfumeId]);
                }
            }
            lastTap = currentTime;
        });
    });
}

// Обработка свайпа
function handleSwipe(card) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Свайп влево - следующая карточка
            showNextCard(card);
        } else {
            // Свайп вправо - предыдущая карточка
            showPrevCard(card);
        }
    }
}

// Показ следующей карточки (заглушка для будущей реализации)
function showNextCard(currentCard) {
    // Можно добавить логику перелистывания карточек
    console.log('Swipe left on card:', currentCard.dataset.id);
}

// Показ предыдущей карточки (заглушка для будущей реализации)
function showPrevCard(currentCard) {
    // Можно добавить логику перелистывания карточек
    console.log('Swipe right on card:', currentCard.dataset.id);
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Предотвращаем скролл
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем скролл
        });
    }
    
    // Закрытие меню при клике вне его
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню при выборе пункта
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Оптимизация изображений
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Можно добавить логику для загрузки разных размеров изображений
                    // в зависимости от размера экрана
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Модальное окно
function showModal(perfume) {
    document.getElementById('modal-title').textContent = perfume.name;
    document.getElementById('modal-brand').textContent = perfume.brand;
    document.getElementById('modal-notes').textContent = "Ноты: " + perfume.notes;
    document.getElementById('modal-description').textContent = perfume.description;
    document.getElementById('modal-price').textContent = "Цена: " + perfume.price + " / " + perfume.volume;
    document.getElementById('modal-stock').textContent = perfume.stock > 0 ? "В наличии: " + perfume.stock + " шт" : "Нет в наличии";
    document.getElementById('modal').style.display = 'block';
    
    // Предотвращаем скролл при открытом модальном окне
    document.body.style.overflow = 'hidden';
}

// Система корзины
let cart = [];

// Анимация при добавлении в корзину
function createCartAnimation(event) {
    if (!event) return;
    
    const button = event.target;
    const rect = button.getBoundingClientRect();
    
    // Создаем летящий элемент
    const flyingItem = document.createElement('div');
    flyingItem.className = 'cart-animation-item';
    flyingItem.textContent = '+1';
    flyingItem.style.left = rect.left + 'px';
    flyingItem.style.top = rect.top + 'px';
    
    document.body.appendChild(flyingItem);
    
    // Удаляем элемент после анимации
    setTimeout(() => {
        if (flyingItem.parentNode) {
            flyingItem.parentNode.removeChild(flyingItem);
        }
    }, 1000);
}

// Добавить в корзину
function addToCart(perfumeId, event) {
    const perfume = perfumes[perfumeId];
    if (perfume.stock <= 0) return;
    
    // Создаем анимацию
    createCartAnimation(event);
    
    const existingItem = cart.find(item => item.id === perfumeId);
    
    if (existingItem) {
        if (existingItem.quantity < perfume.stock) {
            existingItem.quantity++;
        }
    } else {
        cart.push({
            id: perfumeId,
            name: perfume.name,
            price: parseInt(perfume.price.replace(/\s/g, '').replace('₽', '')),
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCounter();
    showNotification('Товар добавлен в корзину!');
}

// Обновление счетчика корзины
function updateCartCounter() {
    const cartLink = document.querySelector('nav.main-nav a[data-section="cart"]');
    const mobileCartLink = document.querySelector('.mobile-nav a[data-section="cart"]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartLink) {
        cartLink.setAttribute('data-count', totalItems);
    }
    
    if (mobileCartLink) {
        mobileCartLink.setAttribute('data-count', totalItems);
    }
}

// Удалить из корзины
function removeFromCart(perfumeId) {
    cart = cart.filter(item => item.id !== perfumeId);
    updateCartDisplay();
    updateCartCounter();
}

// Обновить количество
function updateQuantity(perfumeId, change) {
    const item = cart.find(item => item.id === perfumeId);
    const perfume = perfumes[perfumeId];
    
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0 && newQuantity <= perfume.stock) {
            item.quantity = newQuantity;
        } else if (newQuantity > perfume.stock) {
            showNotification('Недостаточно товара в наличии!');
            return;
        }
        updateCartDisplay();
        updateCartCounter();
    }
}

// Обновить отображение корзины
function updateCartDisplay() {
    const cartSection = document.getElementById('cart');
    const cartList = cartSection.querySelector('.cart-items');
    const cartTotal = cartSection.querySelector('.cart-total');
    
    if (!cartList || !cartTotal) return;
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        cartTotal.innerHTML = '<h3>ИТОГО: 0 ₽</h3>';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const perfume = perfumes[item.id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${perfume.name}</h4>
                    <p>${perfume.brand}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-price">
                    <span>${itemTotal.toLocaleString()} ₽</span>
                    <button onclick="removeFromCart(${item.id})" class="remove-btn">×</button>
                </div>
            </div>
        `;
    });
    
    cartList.innerHTML = html;
    cartTotal.innerHTML = `<h3>ИТОГО: ${total.toLocaleString()} ₽</h3>`;
}

// Показать уведомление
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Стили для уведомления
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#000',
        color: '#fff',
        border: '1px solid #fff',
        padding: '15px 20px',
        zIndex: '1000',
        borderRadius: '0',
        fontSize: '0.9rem',
        letterSpacing: '1px'
    });
    
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(sec => {
        sec.style.display = 'none';
    });
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
    
    // При показе корзины обновляем её содержимое
    if (sectionId === 'cart') {
        updateCartDisplay();
    }
    
    // Обновляем счетчик корзины
    updateCartCounter();
    
    // Обновляем активные ссылки в навигации
    document.querySelectorAll('nav.main-nav a, .mobile-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Закрываем мобильное меню если оно открыто
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Показать форму заказа
function showCheckoutForm() {
    document.querySelector('.cart-items').style.display = 'none';
    document.querySelector('.cart-total').style.display = 'none';
    document.getElementById('checkout-form').style.display = 'block';
    document.getElementById('cart-checkout-btn').style.display = 'none'; // Скрыть кнопку
    loadCustomerData();
}

// Вернуться в корзину
function backToCart() {
    document.querySelector('.cart-items').style.display = 'block';
    document.querySelector('.cart-total').style.display = 'block';
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('cart-checkout-btn').style.display = 'block'; // Показать кнопку
}

// Сохранить данные клиента
function saveCustomerData(data) {
    localStorage.setItem('aromtest_customer_data', JSON.stringify(data));
}

// Загрузить данные клиента
function loadCustomerData() {
    const savedData = localStorage.getItem('aromtest_customer_data');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('customer-name').value = data.name || '';
        document.getElementById('customer-phone').value = data.phone || '';
        document.getElementById('customer-address').value = data.address || '';
        document.getElementById('customer-comment').value = data.comment || '';
    }
}

// Форматировать заказ для отправки
function formatOrderMessage() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const comment = document.getElementById('customer-comment').value;
    
    let message = `🛒 НОВЫЙ ЗАКАЗ\n\n`;
    message += `👤 Имя: ${name}\n`;
    message += `📱 Телефон: ${phone}\n`;
    message += `📍 Адрес: ${address}\n`;
    if (comment) {
        message += `💬 Комментарий: ${comment}\n`;
    }
    message += `\n🛍️ Товары:\n`;
    
    let total = 0;
    cart.forEach(item => {
        const perfume = perfumes[item.id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${perfume.name} (${perfume.volume}) x${item.quantity} = ${itemTotal.toLocaleString()}₽\n`;
    });
    
    message += `\n💰 ИТОГО: ${total.toLocaleString()}₽`;
    
    return encodeURIComponent(message);
}

// Валидация телефона (простая)
function validatePhone(phone) {
    if (!phone) return false;
    // Убираем все нецифровые символы
    const cleanPhone = phone.replace(/\D/g, '');
    // Проверяем длину (минимум 10 цифр)
    return cleanPhone.length >= 10;
}

// Показать ошибку
function showError(element, message) {
    const formGroup = element.closest('.form-group');
    formGroup.classList.add('error');
    
    // Создать или обновить сообщение об ошибке
    let errorElement = formGroup.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Скрыть ошибку
function hideError(element) {
    const formGroup = element.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Очистить все ошибки
function clearAllErrors() {
    document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

// Валидация формы
function validateForm() {
    let isValid = true;
    
    // Валидация имени
    const name = document.getElementById('customer-name');
    if (!name.value.trim()) {
        showError(name, 'Пожалуйста, введите ваше имя');
        isValid = false;
    } else {
        hideError(name);
    }
    
    // Валидация телефона
    const phone = document.getElementById('customer-phone');
    if (!validatePhone(phone.value)) {
        showError(phone, 'Пожалуйста, введите корректный номер телефона');
        isValid = false;
    } else {
        hideError(phone);
    }
    
    // Валидация адреса
    const address = document.getElementById('customer-address');
    if (!address.value.trim()) {
        showError(address, 'Пожалуйста, введите адрес доставки');
        isValid = false;
    } else {
        hideError(address);
    }
    
    return isValid;
}

// Отправить заказ
function sendOrder() {
    // Очистить предыдущие ошибки
    clearAllErrors();
    
    // Показать индикатор загрузки
    const submitButton = document.querySelector('#order-form .checkout-btn');
    const originalText = submitButton ? submitButton.textContent : 'Отправить';
    
    if (submitButton) {
        submitButton.innerHTML = '<div class="loading-spinner"></div>';
        submitButton.disabled = true;
    }
    
    // Валидация
    if (!validateForm()) {
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
        return false;
    }
    
    // Небольшая задержка для UX
    setTimeout(() => {
        // Сохранить данные
        const customerData = {
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            address: document.getElementById('customer-address').value,
            comment: document.getElementById('customer-comment').value
        };
        saveCustomerData(customerData);
        
        // Подготовить сообщение
        const message = formatOrderMessage();
        const contactMethod = document.querySelector('input[name="contact-method"]:checked').value;
        
        // Отправить
        if (contactMethod === 'direct') {
            // ЗАМЕНИ 'your_username' НА СВОЙ TELEGRAM USERNAME
            window.open(`https://t.me/JRoninQw?text=${message}`, '_blank');
        } else {
            // ЗАМЕНИ 'your_bot_username' НА USERNAME ТВОЕГО БОТА
            window.open(`https://t.me/your_bot_username?start=order_${message}`, '_blank');
        }
        
        showNotification('Заказ оформлен! Открываем чат для отправки...', 'success');
        
        // Восстановить кнопку
        if (submitButton) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
        
        // Очистить корзину после успешного заказа
        setTimeout(() => {
            if (confirm('Очистить корзину после оформления заказа?')) {
                cart = [];
                updateCartDisplay();
                updateCartCounter();
                backToCart();
            }
        }, 2000);
        
    }, 500);
    
    return true;
}

// Система тем
function initTheme() {
    // Проверить сохраненную тему
    const savedTheme = localStorage.getItem('aromtest_theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Применить тему
    setTheme(currentTheme);
    
    // Добавить обработчик переключателя
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
    
    // Сохранить выбор
    localStorage.setItem('aromtest_theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Основной обработчик DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация touch-жестов
    initTouchGestures();
    
    // Оптимизация изображений
    optimizeImages();
    
    // Обработчики для навигации
    document.querySelectorAll('nav.main-nav a, .mobile-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Навешиваем обработчики на кнопки "Подробнее"
    document.querySelectorAll('.perfume-card').forEach((card, idx) => {
        const btn = card.querySelector('.details-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (card.classList.contains('out-of-stock')) return;
                showModal(perfumes[idx]);
            });
        }
        
        // Для товаров НЕТ в наличии - клик на всю карточку работает
        if (card.classList.contains('out-of-stock')) {
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains('details-btn')) return;
                showModal(perfumes[idx]);
            });
        }
    });
    
    // Обработчики для кнопок "Купить"
    document.querySelectorAll('.buy-btn').forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Находим родительскую карточку
            const card = this.closest('.perfume-card');
            if (card && card.dataset.id) {
                const perfumeId = parseInt(card.dataset.id);
                addToCart(perfumeId, e);
            }
        });
    });
    
    // Закрытие модального окна
    document.getElementById('close-modal').onclick = function() {
        document.getElementById('modal').style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем скролл
    };

    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Восстанавливаем скролл
        }
    };
    
    // Поиск в шапке со стрелочкой
    const headerSearch = document.getElementById('header-search');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = headerSearch.value.toLowerCase();
        const cards = document.querySelectorAll('.perfume-card');
        
        cards.forEach((card, index) => {
            const perfume = perfumes[index];
            const text = (perfume.name + ' ' + perfume.brand + ' ' + perfume.notes).toLowerCase();
            
            if (text.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (headerSearch) {
        headerSearch.addEventListener('input', performSearch);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Поиск по Enter
    if (headerSearch) {
        headerSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Добавить кнопку "Оформить заказ" в корзину
    const cartSection = document.getElementById('cart');
    if (cartSection) {
        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'ОФОРМИТЬ ЗАКАЗ';
        checkoutButton.className = 'checkout-btn';
        checkoutButton.id = 'cart-checkout-btn';
        checkoutButton.style.marginTop = '20px';
        checkoutButton.style.display = 'block';
        
        checkoutButton.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Корзина пуста!', 'error');
                return;
            }
            showCheckoutForm();
            loadCustomerData(); // Загрузить сохраненные данные
        });
        
        cartSection.querySelector('.cart-total').after(checkoutButton);
    }
    
    // Обработчик формы заказа
const orderForm = document.getElementById('order-form');
const submitOrderButton = document.getElementById('submit-order-btn');

// Обработчик для кнопки "Отправить заказ"
if (submitOrderButton) {
    submitOrderButton.addEventListener('click', function(e) {
        e.preventDefault();
        sendOrder();
    });
}

// Также оставим обработчик на submit формы на всякий случай
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        sendOrder();
    });
}
    
    // Кнопка "Назад в корзину"
    const backButtons = document.querySelectorAll('.back-to-cart-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', backToCart);
    });
    
    // Добавить обработчики очистки ошибок
    document.getElementById('customer-name')?.addEventListener('input', function() {
        if (this.value.trim()) hideError(this);
    });
    
    document.getElementById('customer-phone')?.addEventListener('input', function() {
        if (validatePhone(this.value)) hideError(this);
    });
    
    document.getElementById('customer-address')?.addEventListener('input', function() {
        if (this.value.trim()) hideError(this);
    });
    
    // Инициализация темы
    initTheme();
    
    // При загрузке показываем каталог
    showSection('catalog');
});