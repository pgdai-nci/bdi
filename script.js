const products = [
    { id: 1, name: "Red Rose Bouquet", category: "roses", price: 45.00, emoji: "\uD83C\uDF39", description: "Classic dozen red roses" },
    { id: 2, name: "Pink Rose Bundle", category: "roses", price: 39.00, emoji: "\uD83C\uDF38", description: "Soft pink roses arrangement" },
    { id: 3, name: "White Lily Collection", category: "lilies", price: 52.00, emoji: "\uD83C\uDF3C", description: "Elegant white lilies" },
    { id: 4, name: "Stargazer Lilies", category: "lilies", price: 48.00, emoji: "\u2B50", description: "Fragrant stargazer lilies" },
    { id: 5, name: "Tulip Garden Mix", category: "tulips", price: 35.00, emoji: "\uD83C\uDF3A", description: "Colorful tulip bouquet" },
    { id: 6, name: "Purple Tulips", category: "tulips", price: 38.00, emoji: "\uD83C\uDF3F", description: "Rich purple tulips" },
    { id: 7, name: "Spring Mixed Bouquet", category: "mixed", price: 42.00, emoji: "\uD83C\uDF3B", description: "Seasonal flower mix" },
    { id: 8, name: "Rainbow Arrangement", category: "mixed", price: 55.00, emoji: "\uD83C\uDF08", description: "Vibrant mixed flowers" },
    { id: 9, name: "Sunflower Bunch", category: "mixed", price: 32.00, emoji: "\uD83C\uDF3B", description: "Bright sunflowers" }
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const checkoutBtn = document.getElementById('checkoutBtn');

function renderProducts(filter = 'all') {
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    cartItems.innerHTML = cart.length === 0 
        ? '<p style="text-align:center;color:#999;">Your cart is empty</p>'
        : cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.emoji} ${item.name}</h4>
                    <p>Qty: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Your flowers will be delivered soon.');
    cart = [];
    updateCart();
    cartModal.classList.remove('active');
});

renderProducts();
