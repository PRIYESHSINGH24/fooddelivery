document.addEventListener('DOMContentLoaded', function() {
    const pickupBtn = document.getElementById('pickup');
    const deliveryBtn = document.getElementById('delivery');
    const pickupInfo = document.querySelector('.pickup-info');
    const menuButtons = document.querySelectorAll('.menu-nav button');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuItems = document.querySelectorAll('.menu-item');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    let cart = [];

    // Delivery toggle functionality
    pickupBtn.addEventListener('click', function() {
        pickupBtn.classList.add('active');
        deliveryBtn.classList.remove('active');
        pickupInfo.style.display = 'block';
    });

    deliveryBtn.addEventListener('click', function() {
        deliveryBtn.classList.add('active');
        pickupBtn.classList.remove('active');
        pickupInfo.style.display = 'none';
    });

    // Menu navigation functionality with smooth scroll
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const section = document.getElementById(targetSection);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add to cart functionality
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-name');
            const price = parseFloat(item.getAttribute('data-price'));
            addToCart(name, price);
            updateCart();
        });
    });

    function addToCart(name, price) {
        cart.push({ name, price });
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        menuSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        menuButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-section') === current) {
                button.classList.add('active');
            }
        });
    });
});

