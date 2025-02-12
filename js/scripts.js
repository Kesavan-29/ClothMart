let likedProducts = [];
let cart = [];

function updateWishlistCount() {
    document.getElementById('wishlist-count').textContent = likedProducts.length;
}

function updateBasketCount() {
    let totalItems = 0;
    let totalPrice = 0;
    cart.forEach(product => {
        totalItems += product.quantity;
        totalPrice += product.price * product.quantity;
    });
    document.getElementById('basket-count').textContent = totalItems;
    document.getElementById('basket-total').textContent = `$${totalPrice.toFixed(2)}`;
}

// Toggle Wishlist Modal
function toggleWishlist() {
    const modal = document.getElementById('wishlist-modal');
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        displayWishlistItems();
        modal.style.display = "block";
    }
}

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        displayCartItems();
        modal.style.display = "block";
    }
}

function displayWishlistItems() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = '';
    if (likedProducts.length === 0) {
        wishlistItems.innerHTML = '<p>No items in wishlist.</p>';
    } else {
        likedProducts.forEach(product => {
            const item = document.createElement('div');
            item.textContent = product;
            wishlistItems.appendChild(item);
        });
    }
}

function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>No items in cart.</p>';
        cartTotal.textContent = '';
    } else {
        let totalPrice = 0;
        cart.forEach(product => {
            const item = document.createElement('div');
            item.innerHTML = `${product.name} - $${product.price} x ${product.quantity}`;
            cartItems.appendChild(item);
            totalPrice += product.price * product.quantity;
        });
        cartTotal.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

// Banner slider
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("banner-slide");
    let dots = document.getElementsByClassName("nav-dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(product => product.name === productName);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    alert(productName + " has been added to your cart at $" + productPrice);
    updateBasketCount();
}

function likeProduct(productName) {
    if (!likedProducts.includes(productName)) {
        likedProducts.push(productName);
        alert(productName + " has been added to your liked products.");
    } else {
        alert(productName + " is already in your liked products.");
    }
    updateWishlistCount();
}

document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Thank you for contacting us, " + document.getElementById('name').value + "!");
});

function displayLikedProducts() {
    const likedList = document.getElementById('likedList');
    likedList.innerHTML = '';
    likedProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerText = product;
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => {
            likedProducts = likedProducts.filter(item => item !== product);
            displayLikedProducts();
        };
        productItem.appendChild(removeButton);
        likedList.appendChild(productItem);
    });
}

function displayCart() {
    const cartList = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    cartList.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `${product.name} - $${product.price} x <input type="number" value="${product.quantity}" min="1" onchange="updateQuantity('${product.name}', this.value)">`;
        cartList.appendChild(productItem);
        totalPrice += product.price * product.quantity;
    });
    totalPriceElement.innerText = `Total Price: $${totalPrice}`;
}

function updateQuantity(productName, quantity) {
    const productIndex = cart.findIndex(product => product.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity = parseInt(quantity);
        displayCart();
        updateBasketCount();
    }
}

// Initialize liked products and cart display if elements exist
if (document.getElementById('likedList')) {
    displayLikedProducts();
}

if (document.getElementById('cartList')) {
    displayCart();
}