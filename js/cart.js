
function displayCart () {
    try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartContainer = document.getElementById("cart-container");

        if (!cartContainer) {
            console.error("Cart container not found");
            return;
        }
        
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p> Your cart is empty</p>";
            return;
        }

        let cartHTML = "";
        let totalPrice = 0;

        cart.forEach ((product, index) => {
            if (!product.title || !product.price) {
                console.error("Product missing title or price", product);
                return;
            }

            const quantity = product.quantity || 1;
            const itemTotal = product.price * quantity;
            totalPrice += itemTotal; 

            cartHTML += `
                <div class="cart-item">
                    <img src="${product.image?.url || ''}" alt="${product.image?.alt || product.title}">
                    <h3>${product.title}</h3>
                    <p>Size: ${product.size || 'N/A'}</p>
                    <div class="quantity-controls">
                        <button class="quantity-button decrease" data-index="${index}">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-button increase" data-index="${index}">+</button>
                    </div>
                    <p>$${product.price.toFixed(2)} each</p>
                    <p><strong>Subtotal: $${itemTotal.toFixed(2)}</strong></p>
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

        document.querySelectorAll (".quantity-button").forEach(button => {
            button.addEventListener("click", updateQuantity);
        });

    } catch (error) {
        console.error("Error displaying cart:", error);
        const cartContainer = document.getElementById("cart-container");
        if (cartContainer) {
            cartContainer.innerHTML = "<p>Error loading cart. Please try again later.</p>";
        }
    }
}

function updateQuantity(event) {
    try {
        const index = parseInt(event.target.dataset.index);
        const isIncrease = event.target.classList.contains('increase');

        if (index === undefined || index === null || isNaN (index)) {
            console.error("No index found for quantity button");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (index < 0 || index >= cart.length) {
            console.error("Invalid index");
            return;
        }

        if (isIncrease) {
            cart[index].quantity = (cart[index].quantity || 1) + 1;
        }   else {  
            const currentQuantity = cart[index].quantity || 1;
            if (currentQuantity > 1) {
                cart[index].quantity = currentQuantity - 1;
            } else {
                cart.splice(index, 1); 
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateCartCount();
    } catch (error) {
        console.error("Error updating quantity:", error);
        alert("An error occurred while updating the cart. Please try again.");
    }
}

function removeItemFromCart(event) {
    try {
        const index = event.target.dataset.index;

        if (index === undefined || index === null) {
            console.error("No index found for remove button");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (index < 0 || index >= cart.length) {
            console.error("Index out of bounds for cart array");
            return;
        }

        cart.splice(index, 1);
        localStorage.setItem ("cart", JSON.stringify(cart));

        displayCart ();
        updateCartCount();
    } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("An error occurred while removing the item from the cart. Please try again.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});