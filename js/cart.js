
// Items in cart 
function displayCart () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p> Your cart is empty</p>";
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;

    cart.forEach ((product, index) => {
        const itemTotal = product.price;
        totalPrice += itemTotal; 

        cartHTML += `
            <div class="cart-item">
                <img src="${product.image.url}" alt="${product.image.alt}">
                <h3>${product.title}</h3>
                <p>Size: ${product.size}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
    });
    
    cartHTML +=`
        <div class="cart-summary">
            <p><strong>Total Price: $${totalPrice.toFixed(2)}</strong></p>
            <a href="checkout.html" class="cta-small">Proceed to Checkout </a>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;

    document.querySelectorAll (".remove-item").forEach(button => {
        button.addEventListener("click", removeItemFromCart);
    });
}

//Remove from cart button
function removeItemFromCart(event) {
    const index = event.target.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart"))||[];

    cart.splice(index, 1);

    localStorage.setItem ("cart", JSON.stringify(cart));
    displayCart ();
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});


