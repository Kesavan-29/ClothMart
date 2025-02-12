let likedProducts = [];
let cart = [];

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
    displayCart();
}

function likeProduct(productName) {
    if (!likedProducts.includes(productName)) {
        likedProducts.push(productName);
        alert(productName + " has been added to your liked products.");
    } else {
        alert(productName + " is already in your liked products.");
    }
    displayLikedProducts();
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
    }
}

// Initialize liked products and cart display if elements exist
if (document.getElementById('likedList')) {
    displayLikedProducts();
}

if (document.getElementById('cartList')) {
    displayCart();
}