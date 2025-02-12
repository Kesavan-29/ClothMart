let likedProducts = [];
let cart = [];

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    alert(productName + " has been added to your cart at $" + productPrice);
}

function likeProduct(productName) {
    if (!likedProducts.includes(productName)) {
        likedProducts.push(productName);
        alert(productName + " has been added to your liked products.");
    } else {
        alert(productName + " is already in your liked products.");
    }
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
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
        likedList.appendChild(productItem);
    });
}

function displayCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerText = `${product.name} - $${product.price}`;
        cartList.appendChild(productItem);
    });
}

if (document.getElementById('likedList')) {
    displayLikedProducts();
}

if (document.getElementById('cartList')) {
    displayCart();
}